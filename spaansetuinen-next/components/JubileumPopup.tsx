'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import JubileumDecor from './JubileumDecor';

const STORAGE_KEY = 'jubileum-popup-dismissed';

export default function JubileumPopup({ disablePersistence = false }: { disablePersistence?: boolean }) {
  // Safe defaults for server render
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (disablePersistence) {
      // In test mode do not touch storage at all
      setVisible(true);
      return;
    }
  }, [disablePersistence]);

  const handleDismiss = () => {
    setVisible(false);
    if (!disablePersistence) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch (e) {
        // ignore
      }
    }
  };

  // Don't attempt to render until mounted to avoid SSR/client mismatch
  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="jubileum-title"
    >
      {/* Backdrop - clickable to dismiss */}
      <div
        className="absolute inset-0"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Popup Card */}
      <div className="relative max-w-2xl w-full bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-2xl overflow-hidden">
        {/* Jubilee Decorations */}
        <JubileumDecor variant="compact" />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-white/50 transition-colors"
          aria-label="Sluiten"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative p-8 md:p-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>10 jaar Spaanse Tuin & Zo</span>
          </div>

          {/* Title */}
          <h2 id="jubileum-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Wij vieren 10 jaar mediterrane passie
          </h2>

          {/* Story text */}
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Al tien jaar lang brengen wij de warmte en sfeer van de Middellandse Zee naar Nederland.
            Wat begon als een droom is uitgegroeid tot een plek waar kwaliteit, vakmanschap en passie
            samenkomen. Dat hebben we aan u te danken.
          </p>

          {/* Highlights */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-700">
                <strong className="font-semibold">10 jaar vakmanschap:</strong> Elke plant persoonlijk geselecteerd en verzorgd
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-700">
                <strong className="font-semibold">Jubileumperiode:</strong> Extra aandacht en verrassingen op onze locatie
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-700">
                <strong className="font-semibold">Dank aan onze klanten:</strong> Samen maken we van elke tuin een mediterraan paradijs
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/jubileum"
              onClick={handleDismiss}
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Ontdek het jubileum
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <button
              onClick={handleDismiss}
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border-2 border-gray-200 transition-colors"
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
