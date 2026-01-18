"use client";

import React, { useState } from 'react';
import type { NavNode, LinkItem, DropdownItem, MegaItem } from '../../navigation/nav-data';

// Presentational MobileMenu
// - Accepts navData as prop
// - Renders an accordion/nested structure
// - Contains only render logic and local UI state for accordion behaviour
// - Minimal layout-related inline styles added to position the panel under the navbar

export interface MobileMenuProps {
  navData: NavNode[];
}

export default function MobileMenu({ navData }: MobileMenuProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((s) => ({ ...s, [id]: !s[id] }));
  };

  const renderLink = (item: LinkItem) => (
    <li key={item.id}>
      <a href={item.href}>{item.label}</a>
    </li>
  );

  const renderDropdownPanel = (item: DropdownItem) => (
    <ul>
      {item.children.map((c) => (
        <li key={c.id}>
          <a href={c.href}>{c.label}</a>
        </li>
      ))}
    </ul>
  );

  const renderMegaPanel = (item: MegaItem) => (
    <div>
      {item.columns.map((col) => (
        <section key={col.title}>
          <h4>{col.title}</h4>
          <ul>
            {col.items.map((it) => (
              <li key={it.id}>
                <a href={it.href}>{it.label}</a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );

  // exact navbar height used for top offset
  const navbarHeight = 'clamp(52px, 6svh, 64px)';

  return (
    <nav aria-label="Mobile navigation" style={{ position: 'fixed', left: 0, right: 0, top: navbarHeight, height: `calc(100vh - ${navbarHeight})`, zIndex: 60, overflowY: 'auto', background: 'white' }}>
      <div>
        {navData.map((node) => {
          const id = (node as any).id;
          const isOpen = !!openIds[id];

          if ((node as any).type === 'link') {
            return (
              <div key={id}>
                <a href={(node as LinkItem).href}>{(node as LinkItem).label}</a>
              </div>
            );
          }

          if ((node as any).type === 'dropdown') {
            const cast = node as DropdownItem;
            return (
              <div key={id}>
                <button onClick={() => toggle(id)} aria-expanded={isOpen}>{cast.label}</button>
                {isOpen && renderDropdownPanel(cast)}
              </div>
            );
          }

          if ((node as any).type === 'mega') {
            const cast = node as MegaItem;
            return (
              <div key={id}>
                <button onClick={() => toggle(id)} aria-expanded={isOpen}>{cast.label}</button>
                {isOpen && renderMegaPanel(cast)}
              </div>
            );
          }

          return null;
        })}
      </div>
    </nav>
  );
}
