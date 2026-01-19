import React from 'react';

type MainMenuTemplateProps = {
  heroTitle?: string;
  heroSubtitle?: string;
  intro?: any;
  blocks?: any;
  children?: React.ReactNode;
  heroImage?: string;
};

export default function MainMenuTemplate({
  heroTitle,
  heroSubtitle,
  intro,
  blocks,
  children,
  heroImage,
}: MainMenuTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Header copied from ProductTemplate to ensure identical appearance */}
      <header className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white pt-24 pb-16">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: heroImage ? `url('${heroImage}')` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/30 to-emerald-900/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-8">
            <div>
              {heroTitle && (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">{heroTitle}</h1>
              )}
              {heroSubtitle && (
                <div className="text-lg sm:text-xl text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: String(heroSubtitle) }} />
              )}
              {intro && (
                <div className="mt-4 text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: String(intro) }} />
              )}
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="w-full max-w-md h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🌳</div>
                  <p className="text-white/80 text-sm">Afbeelding volgt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">{children}</div>
      </main>
    </div>
  );
}
