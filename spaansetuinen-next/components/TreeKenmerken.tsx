/**
 * TREE KENMERKEN COMPONENT
 * ------------------------------------------------
 * Centraal herbruikbaar component voor het renderen van boom-kenmerken.
 * Gebruikt in ProductTemplate voor zowel tree als non-tree pagina's.
 * 
 * Props:
 * - items: string[] - lijst van kenmerken
 * - heading?: string - optionele heading (default: "BELANGRIJKE EIGENSCHAPPEN")
 * - content?: string - optionele beschrijving tekst (Format B)
 * - variant?: 'white' | 'blue' - kleurvariant (default: 'white')
 */

import React from 'react';

export type TreeKenmerkenProps = {
  items: string[];
  heading?: string;
  content?: string;
  variant?: 'white' | 'blue';
};

export default function TreeKenmerken({ 
  items, 
  heading = 'BELANGRIJKE EIGENSCHAPPEN',
  content,
  variant = 'white' 
}: TreeKenmerkenProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const variantClasses = {
    white: 'bg-emerald-50',
    blue: 'bg-blue-50'
  };

  const bgClass = variantClasses[variant] || variantClasses.white;

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-3">{heading}</h3>
      {content && (
        <p className="text-gray-700 mb-3">{content}</p>
      )}
      <ul className={`space-y-2 ${bgClass} rounded-lg p-6 list-disc pl-5 text-gray-700`}>
        {items.map((k, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-2 mt-1 text-emerald-600">✓</span>
            <span>{k}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
