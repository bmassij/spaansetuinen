"use client";

import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { NAV_DATA, type NavNode, type LinkItem, type DropdownItem, type MegaItem } from '../navigation/nav-data';
import MobileMenu from './navigation/MobileMenu';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((v) => !v);

  const renderLinkItem = (item: LinkItem) => (
    <li key={item.id}>
      <Link href={item.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50" role="menuitem">
        {item.label}
      </Link>
    </li>
  );

  const renderDropdown = (node: DropdownItem) => (
    <li key={node.id} className="relative group" role="none">
      {('href' in node && node.href) ? (
        <Link href={node.href} aria-haspopup="true" aria-expanded="false" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          {node.label}
        </Link>
      ) : (
        <button aria-haspopup="true" aria-expanded="false" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          {node.label}
        </button>
      )}
      <ul className="absolute left-0 mt-2 w-56 bg-white dropdown-shadow rounded-md py-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 z-50" role="menu" aria-label={`${node.label} submenu`}>
        {node.children.map((c) => (
          <li key={c.id}><Link href={c.href} className="block px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50">{c.label}</Link></li>
        ))}
      </ul>
    </li>
  );

  const renderMega = (node: MegaItem) => (
    <li key={node.id} className="relative group" role="none">
      <button aria-haspopup="true" aria-expanded="false" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500">
        {node.label}
      </button>

      <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white dropdown-shadow rounded-lg p-6 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 z-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {node.columns.map((col, ci) => (
            <div key={`${node.id}-col-${ci}`}>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.items.map((it) => (
                  <li key={it.id}><Link href={it.href} className="block text-gray-700 hover:text-emerald-600 transition-colors">{it.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );

  return (
    <>
      <nav
        className="relative bg-white/95 backdrop-blur-sm border-b shadow-sm z-40"
        role="navigation"
        aria-label="Hoofdnavigatie"
        style={{ height: 'clamp(52px, 6svh, 64px)' }}
      >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Flex header with three zones: logo | spacer | nav */}
        <div className="flex items-center">

          {/* Logo container (left) */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" aria-label="Home">
              <Image
                src="/logo.png"
                alt="Spaanse Tuin & Zo"
                width={800}
                height={300}
                priority
                style={{ width: 'clamp(80px, 10vw, 220px)', height: 'auto' }}
              />
            </Link>
          </div>

          {/* Flexible spacer */}
          <div className="flex-1" />

          {/* Navigation container (right) */}
          <div className="flex items-center flex-shrink-0 z-30">
            <ul className="hidden lg:flex space-x-1 items-center" role="menubar" aria-label="Hoofdmenu">
              {NAV_DATA.map((node: NavNode) => {
                if (node.type === 'link') {
                  return renderLinkItem(node);
                }

                if (node.type === 'dropdown') {
                  return renderDropdown(node);
                }

                if (node.type === 'mega') {
                  return renderMega(node);
                }

                return null;
              })}
            </ul>

            {/* Mobile hamburger button */}
            <div className="lg:hidden flex items-center ml-4">
              <button id="mobile-toggle" type="button" aria-controls="mobile-menu" aria-expanded={mobileOpen ? 'true' : 'false'} className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" onClick={toggleMobile}>
                <svg id="hamburger" className={mobileOpen ? 'h-6 w-6 hidden' : 'h-6 w-6 block'} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg id="close-icon" className={mobileOpen ? 'h-6 w-6 block' : 'h-6 w-6 hidden'} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {mobileOpen && (
              <div id="mobile-menu">
                <MobileMenu navData={NAV_DATA} />
              </div>
            )}
          </div>

        </div>
      </div>

    </nav>
    </>
  );
}
