'use client';

import { useState } from 'react';
import Image from 'next/image';

type ImageSliderProps = {
  images: string[];
  height?: string;
  title?: string | null;
  showDots?: boolean;
  showArrows?: boolean;
};

export default function ImageSlider({ 
  images, 
  height = 'h-[500px]',
  title = null,
  showDots = true,
  showArrows = true 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      )}
      
      <div className="relative group">
        {/* Image Container */}
        <div className={`relative ${height} w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100`}>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        {showArrows && images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-600 rounded-full p-3 shadow-lg transition opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Vorige foto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-600 rounded-full p-3 shadow-lg transition opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Volgende foto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {showDots && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex 
                    ? 'bg-emerald-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ga naar foto ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
