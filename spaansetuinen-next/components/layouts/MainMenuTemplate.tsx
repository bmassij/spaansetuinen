import FourBlocks from '../home/FourBlocks'

type MainMenuTemplateProps = {
  heroTitle: string
  heroSubtitle?: string
  intro?: string
  blocks?: any[]
  children?: React.ReactNode
}

export default function MainMenuTemplate({ heroTitle, heroSubtitle, intro, blocks, children }: MainMenuTemplateProps) {
  return (
    <>
      {/* HERO - render only when heroTitle is provided */}
      {heroTitle ? (
        <header className="relative bg-gray-900 text-white">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('/assets/impressie/other1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />

          <div className="relative z-10 min-h-[60vh] flex items-center py-16">
            <div className="container max-w-7xl mx-auto px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">{heroTitle}</h1>
                {heroSubtitle ? <p className="text-lg sm:text-xl text-gray-100 leading-relaxed mb-3">{heroSubtitle}</p> : null}
                {intro ? <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">{intro}</p> : null}

                <div className="flex flex-wrap gap-4">
                  <a className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-lg shadow transition">Bekijk ons assortiment</a>
                  <a className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border-2 border-white/30 transition">Neem contact op</a>
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : null}

      {/* BLOCKS - render only when blocks provided */}
      {blocks && blocks.length > 0 ? (
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="container max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Highlights</h2>
              {intro ? <p className="text-lg text-gray-600">{intro}</p> : null}
            </div>

            <FourBlocks blocks={blocks} />
          </div>
        </section>
      ) : null}

      {/* GENERAL CONTENT SLOT - children always rendered */}
      <main className="py-12">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="prose max-w-none">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
