"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((v) => !v);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b shadow-sm fixed top-0 left-0 right-0 z-40" role="navigation" aria-label="Hoofdnavigatie">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-24 sm:w-32 mr-8 flex items-center">
              <a href="/">
                <img src="/assets/logo.svg" alt="Spaanse Tuin & Zo Logo" className="h-8 w-auto" />
              </a>
            </div>

            {/* Desktop menu */}
            <ul className="hidden lg:flex space-x-1 items-center" role="menubar" aria-label="Hoofdmenu">

              {/* Welkom */}
              <li className="relative group" role="none">
                <a href="/" role="menuitem" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50">
                  Welkom
                </a>
                <ul className="absolute left-0 mt-2 w-56 bg-white dropdown-shadow rounded-md py-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 z-50" role="menu" aria-label="Welkom submenu">
                  <li><a href="/#over-ons" className="block px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Over ons</a></li>
                </ul>
              </li>

              {/* Assortiment bomen */}
              <li className="relative group" role="none">
                <button aria-haspopup="true" aria-expanded="false" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  Assortiment bomen
                </button>

                <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white dropdown-shadow rounded-lg p-6 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 z-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Kolom 1: Palmbomen */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Palmbomen</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="/trachycarpus-fortunei" className="block text-gray-700 hover:text-emerald-600 transition-colors">Trachycarpus Fortunei</a></li>
                        <li><a href="/yucca-rostrata" className="block text-gray-700 hover:text-emerald-600 transition-colors">Yucca Rostrata</a></li>
                      </ul>
                    </div>

                    {/* Kolom 2: Vijgenbomen */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Vijgenbomen</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="/ficus-carica" className="block text-gray-700 hover:text-emerald-600 transition-colors">Ficus Carica</a></li>
                      </ul>
                    </div>

                    {/* Kolom 3: Olijfbomen */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Olijfbomen</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Bonsai / Bonsai doble</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Copa</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Hoija Blanca</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Piel Joven</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Piel Vieja</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Bonsai Ramif</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Pata Bola</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Tubo</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Plato</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Lechin</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Multi Bola / Multi Plato</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Tarrina</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Andalusia</a></li>
                        <li><a href="/olea-europea" className="block text-gray-700 hover:text-emerald-600 transition-colors">Olea Europea Pon Pon</a></li>
                      </ul>
                    </div>

                    {/* Kolom 4: Druivenranken */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Druivenranken</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="/druivenranken" className="block text-gray-700 hover:text-emerald-600 transition-colors">Vitis Vinifera</a></li>
                      </ul>
                    </div>

                  </div>
                </div>
              </li>

              {/* Bloembakken */}
              <li className="relative group" role="none">
                <a href="/bloembakken" role="menuitem" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50">
                  Bloembakken
                </a>
                <ul className="absolute left-0 mt-2 w-56 bg-white dropdown-shadow rounded-md py-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 z-50" role="menu">
                  <li><a href="/bloembakken" className="block px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Bloembakken</a></li>
                  <li><a href="/bloembakken-op-maat" className="block px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Bloembakken op maat gemaakt</a></li>
                </ul>
              </li>

              {/* Potgrond en Voeding */}
              <li className="relative group" role="none">
                <a href="/mediterrane-potgrond" role="menuitem" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50">
                  Potgrond en Voeding
                </a>
                <ul className="absolute left-0 mt-2 w-56 bg-white dropdown-shadow rounded-md py-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 z-50" role="menu">
                  <li><a href="/mediterrane-potgrond" className="block px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Mediterrane potgrond</a></li>
                  <li><a href="/mediterrane-voeding" className="block px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Mediterrane voeding</a></li>
                  <li><a href="/hydrokorrels" className="block px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Hydrokorrels</a></li>
                  <li><a href="/boomschors" className="block px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Boomschors</a></li>
                </ul>
              </li>

              {/* Plant- en voedingstips */}
              <li><a href="/plant-en-voedingstips" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50">Plant- en voedingstips</a></li>

              {/* Onze service */}
              <li><a href="/bezorgen" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50">Onze service</a></li>

              <li><a href="/verhuur" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50">Verhuur</a></li>
              <li><a href="/impressie" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-md hover:bg-gray-50">Impressie</a></li>
            </ul>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center">
            <button id="mobile-toggle" type="button" aria-controls="mobile-menu" aria-expanded={mobileOpen ? 'true' : 'false'} className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" onClick={toggleMobile}>
              <svg id="hamburger" className={mobileOpen ? 'h-6 w-6 hidden' : 'h-6 w-6 block'} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg id="close-icon" className={mobileOpen ? 'h-6 w-6 block' : 'h-6 w-6 hidden'} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div id="mobile-menu" className={`lg:hidden ${mobileOpen ? 'block' : 'hidden'} border-t bg-white`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          
          {/* Welkom */}
          <div>
            <a href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md">Welkom</a>
            <div className="pl-6 pt-1">
              <a href="/#over-ons" className="block px-3 py-1 text-sm text-gray-600 hover:text-emerald-600">Over ons</a>
            </div>
          </div>

          <div className="border-t pt-2"></div>

          {/* Accordion item: Assortiment bomen */}
          <details className="pl-4 pt-2">
            <summary className="w-full flex items-center justify-between px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <span>Assortiment bomen</span>
              <span className="chev text-lg">+</span>
            </summary>

            {/* Palmbomen */}
            <details className="mb-2">
              <summary className="cursor-pointer px-3 py-1 text-sm font-medium text-gray-700 hover:text-emerald-600">Palmbomen</summary>
              <ul className="pl-6 mt-1 space-y-1">
                <li><a href="/trachycarpus-fortunei" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Trachycarpus Fortunei</a></li>
                <li><a href="/yucca-rostrata" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Yucca Rostrata</a></li>
              </ul>
            </details>

            {/* Vijgenbomen */}
            <details className="mb-2">
              <summary className="cursor-pointer px-3 py-1 text-sm font-medium text-gray-700 hover:text-emerald-600">Vijgenbomen</summary>
              <ul className="pl-6 mt-1 space-y-1">
                <li><a href="/ficus-carica" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Ficus Carica</a></li>
              </ul>
            </details>

            {/* Olijfbomen */}
            <details className="mb-2">
              <summary className="cursor-pointer px-3 py-1 text-sm font-medium text-gray-700 hover:text-emerald-600">Olijfbomen</summary>
              <ul className="pl-6 mt-1 space-y-1">
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Bonsai / Bonsai doble</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Copa</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Hoija Blanca</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Piel Joven</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Piel Vieja</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Bonsai Ramif</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Pata Bola</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Tubo</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Plato</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Lechin</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Multi Bola / Multi Plato</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Tarrina</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Andalusia</a></li>
                <li><a href="/olea-europea" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Olea Europea Pon Pon</a></li>
              </ul>
            </details>

            {/* Druivenranken */}
            <details className="mb-2">
              <summary className="cursor-pointer px-3 py-1 text-sm font-medium text-gray-700 hover:text-emerald-600">Druivenranken</summary>
              <ul className="pl-6 mt-1 space-y-1">
                <li><a href="/druivenranken" className="block py-1 text-sm text-gray-600 hover:text-emerald-600">Vitis Vinifera</a></li>
              </ul>
            </details>

          </details>

          <div className="border-t pt-2"></div>

          {/* Bloembakken */}
          <div>
            <a href="/bloembakken" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md">Bloembakken</a>
            <div className="pl-6 pt-1">
              <a href="/bloembakken-op-maat" className="block px-3 py-1 text-sm text-gray-600 hover:text-emerald-600">Bloembakken op maat gemaakt</a>
            </div>
          </div>

          <div className="border-t pt-2"></div>

          {/* Potgrond en Voeding */}
          <div>
            <a href="/mediterrane-potgrond" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md">Potgrond en Voeding</a>
            <div className="pl-6 pt-1">
              <a href="/mediterrane-potgrond" className="block px-3 py-1 text-sm text-gray-600 hover:text-emerald-600">Mediterrane potgrond</a>
              <a href="/mediterrane-voeding" className="block px-3 py-1 text-sm text-gray-600 hover:text-emerald-600">Mediterrane voeding</a>
              <a href="/hydrokorrels" className="block px-3 py-1 text-sm text-gray-600 hover:text-emerald-600">Hydrokorrels</a>
              <a href="/boomschors" className="block px-3 py-1 text-sm text-gray-600 hover:text-emerald-600">Boomschors</a>
            </div>
          </div>

          <div className="border-t pt-2"></div>

          {/* Plant- en voedingstips */}
          <a href="/plant-en-voedingstips" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md">Plant- en voedingstips</a>

          <div className="border-t pt-2"></div>

          {/* Onze service */}
          <a href="/bezorgen" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md">Onze service</a>

          <a href="/verhuur" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md">Verhuur</a>
          <a href="/impressie" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md">Impressie</a>
        </div>
      </div>
    </nav>
  );
}