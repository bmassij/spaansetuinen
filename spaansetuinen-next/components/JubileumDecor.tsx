'use client';

/**
 * JubileumDecor - Decorative elements for jubilee features
 * Uses the site PNG asset: /logo ballon.png for all balloons and badges.
 * Absolutely positioned, decorative only (aria-hidden), pointer-events none.
 */

interface JubileumDecorProps {
  variant?: 'full' | 'compact';
}

export default function JubileumDecor({ variant = 'full' }: JubileumDecorProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Garland / slinger */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-start justify-center gap-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full opacity-20"
            style={{
              backgroundColor: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#059669' : '#34d399',
              transform: `translateY(${Math.sin(i * 0.5) * 8}px)`,
            }}
          />
        ))}
      </div>

      {/* String path behind garland */}
      <svg
        className="absolute top-0 left-0 right-0 h-12"
        preserveAspectRatio="none"
        viewBox="0 0 1000 50"
      >
        <path
          d="M 0,25 Q 50,10 100,25 T 200,25 T 300,25 T 400,25 T 500,25 T 600,25 T 700,25 T 800,25 T 900,25 T 1000,25"
          stroke="#10b981"
          strokeWidth="2"
          fill="none"
          opacity="0.15"
        />
      </svg>

      {/* Balloons (PNG only) */}
      {variant === 'full' && (
        <>
          <div
            className="absolute w-20 h-24 float-balloon"
            style={{ left: '8%', top: '18%', transform: 'translateZ(0)' }}
          >
            <img src="/logo ballon.png" alt="" className="w-full h-full object-contain" />
          </div>

          <div
            className="absolute w-24 h-28 float-balloon"
            style={{ right: '8%', top: '14%', transform: 'translateZ(0)' }}
          >
            <img src="/logo ballon.png" alt="" className="w-full h-full object-contain" />
          </div>

          <div
            className="hidden md:block absolute w-16 h-20 float-balloon"
            style={{ left: '50%', top: '10%', transform: 'translateX(-50%) translateZ(0)' }}
          >
            <img src="/logo ballon.png" alt="" className="w-full h-full object-contain" />
          </div>
        </>
      )}

      {variant === 'compact' && (
        <div
          className="absolute w-16 h-20 float-balloon"
          style={{ right: '6%', top: '10%', transform: 'translateZ(0)' }}
        >
          <img src="/logo ballon.png" alt="" className="w-full h-full object-contain" />
        </div>
      )}

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-12px) translateX(6px); }
          50% { transform: translateY(-8px) translateX(-4px); }
          75% { transform: translateY(-16px) translateX(3px); }
        }
        .float-balloon {
          animation: float-slow 12s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .float-balloon { animation: none; }
        }
      `}</style>
    </div>
  );
}
