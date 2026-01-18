"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // desktop hover/focus
  const [mobileAccordion, setMobileAccordion] = useState<Record<string, boolean>>({});

  const toggleMobile = () => setMobileOpen((v) => !v);
  const toggleAccordion = (key: string) =>
    setMobileAccordion((prev) => ({ ...prev, [key]: !prev[key] }));

  const menu = [
    { key: "home", title: "Menu item", href: "/" },
    { key: "bomen", title: "Menu item", href: "/bomen" },
    { key: "contact", title: "Menu item", href: "/contact" },
  ];

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Voorbeeldlogo</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4" role="menubar" aria-label="Hoofdmenu">
          {menu.map((item) => (
            <li
              key={item.key}
              onMouseEnter={() => setOpenDropdown(item.key)}
              onMouseLeave={() => setOpenDropdown((k) => (k === item.key ? null : k))}
              className="relative"
              role="none"
            >
              <a
                href={item.href}
                className="inline-block px-2 py-1"
                role="menuitem"
                tabIndex={0}
                onFocus={() => setOpenDropdown(item.key)}
                onBlur={() => setOpenDropdown((k) => (k === item.key ? null : k))}
                aria-haspopup={false}
                aria-expanded={false}
              >
                {item.title}
              </a>

              {/* If dropdown children were present, they'd render here. Implementation ready for dropdowns. */}
              {false && (
                <div
                  className={`absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-20`}
                  role="menu"
                  aria-label={`${item.title} submenu`}
                >
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100" role="menuitem">
                    Submenu item
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Sluit menu" : "Open menu"}
            className="p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div id="mobile-menu" className={`${mobileOpen ? "block" : "hidden"} md:hidden`}>
        <ul className="flex flex-col px-4 pt-2 pb-4 space-y-1" role="menu" aria-label="Mobiel menu">
          {menu.map((item) => (
            <li key={item.key} className="border-b border-green-500" role="none">
              <div className="flex items-center justify-between">
                <a href={item.href} className="block py-2" role="menuitem">
                  {item.title}
                </a>

                {/* Accordion chevron if children exist - implementation ready */}
                {false && (
                  <button
                    onClick={() => toggleAccordion(item.key)}
                    aria-expanded={!!mobileAccordion[item.key]}
                    aria-controls={`submenu-${item.key}`}
                    className="p-2"
                  >
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile submenu container (accordion) */}
              {false && (
                <div id={`submenu-${item.key}`} className={`${mobileAccordion[item.key] ? "block" : "hidden"} pl-4`} role="menu">
                  <a href="#" className="block py-2">
                    Submenu item
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}