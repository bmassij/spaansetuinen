'use client';

import { useEffect, useState } from 'react';

export default function AnniversaryPopup() {
  const storageKey = 'spaansetuinen.jubileum.dismissed';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const dismissed = sessionStorage.getItem(storageKey);
      if (!dismissed) setVisible(true);
    } catch (e) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(storageKey, '1');
    } catch (e) {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none">
      <div className="bg-black/50 absolute inset-0" aria-hidden="true"></div>
      <div role="dialog" aria-modal="true" className="relative pointer-events-auto max-w-lg w-full m-4 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">10 jaar Spaanse Tuin & Zo</h2>
            <p className="mt-1 text-sm text-gray-700">We vieren ons 10-jarig jubileum! Bekijk onze acties en voorwaarden op de jubileumpagina.</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button onClick={dismiss} aria-label="Sluit jubileummelding" className="text-sm text-gray-600 hover:text-gray-900">Sluiten</button>
          </div>
        </div>
        <div className="mt-3">
          <a href="/jubileum" className="text-sm text-blue-600 hover:underline">Naar de jubileumpagina</a>
        </div>
      </div>
    </div>
  );
}
