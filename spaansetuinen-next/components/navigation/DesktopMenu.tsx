"use client";

import React from 'react';
import type { NavNode, LinkItem, DropdownItem, MegaItem } from '../../navigation/nav-data';

// Presentational DesktopMenu
// - Accepts navData as prop
// - Contains only render logic (no styling, no layout decisions)
// - Produces semantic markup that can later be wired into the existing mega-menu UI

export interface DesktopMenuProps {
  navData: NavNode[];
}

export default function DesktopMenu({ navData }: DesktopMenuProps) {
  const renderLink = (item: LinkItem) => (
    <li data-nav-type="link" key={item.id}>
      <a href={item.href}>{item.label}</a>
    </li>
  );

  const renderDropdown = (item: DropdownItem) => (
    <li data-nav-type="dropdown" key={item.id}>
      <button aria-haspopup="true" aria-expanded="false">{item.label}</button>
      <ul>
        {item.children.map((c) => (
          <li data-nav-type="child-link" key={c.id}>
            <a href={c.href}>{c.label}</a>
          </li>
        ))}
      </ul>
    </li>
  );

  const renderMega = (item: MegaItem) => (
    <li data-nav-type="mega" key={item.id}>
      <button aria-haspopup="true" aria-expanded="false">{item.label}</button>
      <div data-mega-panel>
        {item.columns.map((col) => (
          <section key={col.title} data-mega-column>
            <h4>{col.title}</h4>
            <ul>
              {col.items.map((it) => (
                <li data-nav-type="mega-link" key={it.id}>
                  <a href={it.href}>{it.label}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </li>
  );

  return (
    <nav aria-label="Desktop navigation">
      <ul>
        {navData.map((node) => {
          if ((node as any).type === 'link') return renderLink(node as LinkItem);
          if ((node as any).type === 'dropdown') return renderDropdown(node as DropdownItem);
          if ((node as any).type === 'mega') return renderMega(node as MegaItem);
          return null;
        })}
      </ul>
    </nav>
  );
}
