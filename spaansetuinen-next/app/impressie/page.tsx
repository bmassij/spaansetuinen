import ImageSlider from '@/components/ImageSlider';
import content from '@/content/impressie.json';

export const metadata = {
  title: 'Impressie',
};

export default function ImpressiePage() {
  const { hero, intro, sliders, cta } = content;

  return (
    <>
      {/* HERO SECTION - fullscreen met background image */}
      <header className="relative bg-gray-900 text-white">
        <div 
          className="absolute inset-0 opacity-40" 
          style={{ 
            backgroundImage: `url('${hero.image}')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />

        <div className="relative z-10 min-h-screen flex items-center pt-16">
          <div className="container max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                {hero.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-100 leading-relaxed">
                {hero.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <a 
            href="#intro" 
            className="text-white/70 hover:text-white transition text-2xl" 
            aria-label="Scroll naar beneden"
          >
            ↓
          </a>
        </div>
      </header>

      {/* INTRO SECTION - whitespace buffer */}
      <section id="intro" className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            {intro}
          </p>
        </div>
      </section>

      {/* SLIDER 1: TUINEN - breed formaat */}
      <section className="bg-white py-12">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <ImageSlider 
            images={sliders[0].images} 
            height="h-[500px] md:h-[600px]"
            title={sliders[0].title}
          />
        </div>
      </section>

      {/* SLIDER 2 & 3: BOMEN + DETAILS - 2-col grid */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageSlider 
              images={sliders[1].images} 
              height="h-[400px]"
              title={sliders[1].title}
            />
            <ImageSlider 
              images={sliders[2].images} 
              height="h-[400px]"
              title={sliders[2].title}
            />
          </div>
        </div>
      </section>

      {/* SLIDER 4: VERHUUR - medium-breed */}
      <section className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <ImageSlider 
            images={sliders[3].images} 
            height="h-[450px]"
            title={sliders[3].title}
          />
        </div>
      </section>

      {/* CTA SECTION - zachte uitnodiging */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="container max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {cta.heading}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {cta.text}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {cta.buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg shadow-lg transition transform hover:scale-105 ${
                    index === 0
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600'
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
