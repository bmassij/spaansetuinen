"""
Sections detection and normalization for website pages.
"""
from bs4 import BeautifulSoup
from pathlib import Path
from typing import List, Dict


def detect_sections(html_text: str) -> List[Dict]:
    """Return list of sections with type and text snippet.
    Heuristics:
    - hero: first <header> or large img near top
    - menu: <nav> or elements with class 'menu' or 'nav'
    - footer: <footer>
    - content sections: <section>, <article> or <div> with heading
    """
    soup = BeautifulSoup(html_text, "html.parser")
    sections = []

    # hero
    header = soup.find(["header"]) or soup.find("img")
    if header:
        text = header.get_text(" ", strip=True)
        sections.append({"type": "hero", "text": text[:1000]})

    # nav
    nav = soup.find(["nav"]) or soup.find(class_=lambda x: x and "menu" in x)
    if nav:
        sections.append({"type": "menu", "text": nav.get_text(" ", strip=True)[:1000]})

    # content sections
    for sec in soup.find_all(["section", "article"]):
        t = sec.get_text(" ", strip=True)
        sections.append({"type": "content", "text": t[:2000]})

    # fallback: divs with h2/h3
    for div in soup.find_all("div"):
        if div.find(["h2", "h3"]):
            t = div.get_text(" ", strip=True)
            sections.append({"type": "content", "text": t[:2000]})

    # footer
    foot = soup.find("footer")
    if foot:
        sections.append({"type": "footer", "text": foot.get_text(" ", strip=True)[:1000]})

    return sections
