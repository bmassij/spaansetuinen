#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cleanup script for spaansetuinen production cleanup task.
Performs mechanical, site-wide replacements in website/public/*.html
- Normalise aanspreekvorm (je -> u, jouw -> uw, etc.)
- Standardise phone visible text and tel: links
- Fix jubileum hrefs that begin with opdrachten/ -> href="10-jaar.html"
- Update bezorgkosten in bezorgen.html to "€ 30,00"
- Replace "9 weken voeding" / "minimaal 9 weken voeding" -> "6–9 weken voeding"
- Add trust elements (Trustpilot, WhatsApp, cookie/privacy snippet) from index.html to pages that miss them
Creates backups of modified files as filename.html.bak and prints a JSON report to stdout.

Run from repository root (project expects current working directory to be repository root).
"""

import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
# legacy HTML was removed; guard references to website/public
PUBLIC = ROOT / 'website' / 'public'
INDEX = PUBLIC / 'index.html'

# Helpers

def preserve_case(orig: str, repl: str) -> str:
    if not orig:
        return repl
    # if all upper
    if orig.isupper():
        return repl.upper()
    # if titlecase first letter
    if orig[0].isupper():
        return repl[0].upper() + repl[1:]
    return repl


def replace_in_text_segment(text: str):
    # Apply text-only replacements in a safe order
    changed = False
    s = text
    # phrase replacement first
    s_new, n = re.subn(r'\bwe denken graag met je mee\b', lambda m: preserve_case(m.group(0), 'We denken graag met u mee'), s, flags=re.I)
    if n:
        s = s_new
        changed = True
    # specific phrases
    s2 = re.sub(r'\bje\s+mediterrane\b', lambda m: preserve_case(m.group(0), 'uw mediterrane'), s, flags=re.I)
    if s2 != s:
        s = s2
        changed = True
    s2 = re.sub(r'\bje\s+tuin\b', lambda m: preserve_case(m.group(0), 'uw tuin'), s, flags=re.I)
    if s2 != s:
        s = s2
        changed = True
    # word-level replacements
    repls = [
        (r'\bjouw\b', 'uw'),
        (r'\bjij\b', 'u'),
        (r'\bjullie\b', 'u'),
        (r'\bje\b', 'u'),
    ]
    for patt, repl in repls:
        s_new, n = re.subn(patt, lambda m, r=repl: preserve_case(m.group(0), r), s, flags=re.I)
        if n:
            s = s_new
            changed = True
    # phone visible variants -> +31 6 119 29 392
    phone_vis = re.compile(r'\+31\s?6\s?119\s?29\s?392|\+31\s?6\s?11929392|\+31\s?611929392|06[-\s]?11929392|0611929392')
    s_new, n = phone_vis.subn('+31 6 119 29 392', s)
    if n:
        s = s_new
        changed = True
    # nutrition replacements
    s_new, n = re.subn(r'\bminimaal\s+9\s+weken\s+voeding\b', '6–9 weken voeding', s, flags=re.I)
    if n:
        s = s_new
        changed = True
    s_new, n = re.subn(r'\b9\s+weken\s+voeding\b', '6–9 weken voeding', s, flags=re.I)
    if n:
        s = s_new
        changed = True
    return s, changed


def extract_snippet_around_keyword(html: str, keyword: str, tag_candidates=None):
    """Find a reasonable enclosing snippet around first occurrence of keyword.
    Try to return the full enclosing <section>...</section> or <div>...</div> or the nearest tag line."""
    low = html.lower()
    ki = low.find(keyword.lower())
    if ki == -1:
        return ''
    # try section
    sec_start = html.rfind('<section', 0, ki)
    if sec_start != -1:
        sec_end = html.find('</section>', ki)
        if sec_end != -1:
            return html[sec_start:sec_end+10]
    # try div
    div_start = html.rfind('<div', 0, ki)
    if div_start != -1:
        div_end = html.find('</div>', ki)
        if div_end != -1:
            return html[div_start:div_end+6]
    # fallback: return the whole line
    line_start = html.rfind('\n', 0, ki)
    if line_start == -1:
        line_start = 0
    line_end = html.find('\n', ki)
    if line_end == -1:
        line_end = len(html)
    return html[line_start:line_end]


# prepare report counters
report = {
    'files_scanned': 0,
    'files_modified': 0,
    'aanspreekvorm_files_changed': 0,
    'phone_visible_replacements': 0,
    'phone_link_replacements': 0,
    'phone_total_replacements': 0,
    'jubilee_pages_fixed': 0,
    'jubilee_pages_list': [],
    'bezorg_confirmed': False,
    'bezorg_old_found': 0,
    'nutrition_replacements': 0,
    'trust_elements_added': [],
}

# load index.html snippets
index_html = ''
if INDEX.exists():
    index_html = INDEX.read_text(encoding='utf-8')
trust_snip = extract_snippet_around_keyword(index_html, 'trustpilot') if index_html else ''
wa_snip = extract_snippet_around_keyword(index_html, 'whatsapp') if index_html else ''
cookie_snip = extract_snippet_around_keyword(index_html, 'cookie') if index_html else ''

# regex for jubilee hrefs
jubilee_href = re.compile(r'href\s*=\s*"opdrachten/[^"]*(?:10[^\"]*jaar|spaanse[^\"]*tuin|10 jaar)[^"]*"', flags=re.I)
# regex for tel links variants inside tags or standalone tel:+ formats
tel_variants_in_attr = re.compile(r'tel\s*:\s*\+?31\s*6\s*119\s*29\s*392|tel\s*:\s*06[-\s]*11929392|tel\s*:\s*0611929392|tel\s*:\s*\+31611929392', flags=re.I)
# also replace bare numeric href tel variants
tel_attr_number = re.compile(r'href\s*=\s*"tel\s*:\s*(?:06[-\s]*11929392|0611929392|\+31\s*6\s*11929392|\+31611929392)"', flags=re.I)

# iterate files
for f in sorted(PUBLIC.glob('*.html')):
    report['files_scanned'] += 1
    txt_orig = f.read_text(encoding='utf-8')
    txt = txt_orig
    modified = False
    # split by tags to avoid changing attributes when doing text-only replacements
    parts = re.split(r'(<[^>]+>)', txt)
    new_parts = []
    for part in parts:
        if part.startswith('<') and part.endswith('>'):
            # operate on tag content: fix tel attribute variants and jubilee hrefs
            part_new = part
            # fix jubilee hrefs in tags
            part_new, nj = jubilee_href.subn('href="10-jaar.html"', part_new)
            if nj:
                report['jubilee_pages_fixed'] += nj
                if f.name not in report['jubilee_pages_list']:
                    report['jubilee_pages_list'].append(f.name)
                modified = True
            # fix tel attributes to canonical tel:+31611929392
            part_new, nt = tel_attr_number.subn('href="tel:+31611929392"', part_new)
            # also patterns like href="tel:06-11929392"
            if nt:
                report['phone_link_replacements'] += nt
                modified = True
            # also occurrences of tel:+31611929392 but different formatting
            part_new, nt2 = tel_variants_in_attr.subn('tel:+31611929392', part_new)
            if nt2:
                report['phone_link_replacements'] += nt2
                modified = True
            new_parts.append(part_new)
        else:
            # text segment: apply text replacements
            seg_new, ch = replace_in_text_segment(part)
            if ch:
                modified = True
                # count occurrences of nutrition change (simple heuristic)
                report['nutrition_replacements'] += len(re.findall('6–9 weken voeding', seg_new)) - len(re.findall('6–9 weken voeding', part))
                # count phone visible changes by checking occurrences of canonical after change
                report['phone_visible_replacements'] += len(re.findall(r'\+31 6 119 29 392', seg_new)) - len(re.findall(r'\+31 6 119 29 392', part))
            new_parts.append(seg_new)
    newtxt = ''.join(new_parts)

    # additional jubilee replacement on whole text (catch other forms)
    newtxt, nj_all = jubilee_href.subn('href="10-jaar.html"', newtxt)
    if nj_all:
        if f.name not in report['jubilee_pages_list']:
            report['jubilee_pages_list'].append(f.name)
        report['jubilee_pages_fixed'] += nj_all
        modified = True

    # bezorgen specific price replacements
    if f.name == 'bezorgen.html':
        oldcount = len(re.findall(r'€\s?20,00|€20,00|20\s?euro', newtxt, flags=re.I))
        if oldcount > 0:
            newtxt = re.sub(r'€\s?20,00|€20,00|20\s?euro', '€ 30,00', newtxt, flags=re.I)
            report['bezorg_old_found'] = oldcount
            modified = True
        report['bezorg_confirmed'] = ('€ 30,00' in newtxt)

    # ensure tel: links canonical in whole doc
    # replace various tel forms in attributes and plain text that are likely links
    # Normalize href="tel:..."
    newtxt, nlinknorm = re.subn(r'href\s*=\s*"tel\s*:\s*(?:\+31\s*6\s*119\s*29\s*392|\+31611929392|06[-\s]*11929392|0611929392|\+31\s*611929392)"', 'href="tel:+31611929392"', newtxt, flags=re.I)
    if nlinknorm:
        report['phone_link_replacements'] += nlinknorm
        modified = True
    # Also replace plain tel: occurrences
    newtxt, nt2 = re.subn(r'tel\s*:\s*(?:\+31\s*6\s*119\s*29\s*392|\+31611929392|06[-\s]*11929392|0611929392|\+31\s*611929392)', 'tel:+31611929392', newtxt, flags=re.I)
    if nt2:
        report['phone_link_replacements'] += nt2
        modified = True

    # Add trust elements if missing (skip index.html)
    if f.name != 'index.html':
        low = newtxt.lower()
        has_trust = 'trustpilot' in low
        has_wa = 'wa.me' in low or 'whatsapp' in low
        has_cookie = 'cookie' in low or 'privacy' in low
        to_add = ''
        if not (has_trust and has_wa and has_cookie):
            if not has_trust and trust_snip:
                to_add += '\n' + trust_snip
            if not has_wa and wa_snip:
                to_add += '\n' + wa_snip
            if not has_cookie and cookie_snip:
                to_add += '\n' + cookie_snip
            if to_add:
                if '</body>' in newtxt:
                    newtxt = newtxt.replace('</body>', to_add + '\n</body>')
                else:
                    newtxt = newtxt + to_add
                report['trust_elements_added'].append(f.name)
                modified = True

    if modified and newtxt != txt_orig:
        # backup
        bak = f.with_suffix(f.suffix + '.bak')
        bak.write_text(txt_orig, encoding='utf-8')
        f.write_text(newtxt, encoding='utf-8')
        report['files_modified'] += 1

# finalize counts
report['phone_total_replacements'] = report['phone_visible_replacements'] + report['phone_link_replacements']
# de-duplicate jubilee list
report['jubilee_pages_list'] = sorted(set(report['jubilee_pages_list']))

print(json.dumps(report, ensure_ascii=False, indent=2))
