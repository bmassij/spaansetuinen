import fs from 'fs/promises'
import path from 'path'
import FourBlocks from '../components/home/FourBlocks'

export const metadata = {
  title: 'Home',
}

export default async function Page() {
  const filePath = path.join(process.cwd(), 'content', 'home.json')
  let data: any = {}
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    data = JSON.parse(raw)
  } catch (e) {
    data = {}
  }

  const heroTitle = data.heroTitle || ''
  const heroSubtitle = data.heroSubtitle || ''
  const intro = data.intro || ''
  const ctaAnchor = data.ctaAnchor || ''
  const introAfterHero = data.introAfterHero || ''
  const blocks = Array.isArray(data.blocks) ? data.blocks : []
  const usp = Array.isArray(data.usp) ? data.usp : []
  const aboutTitle = data.aboutTitle || ''
  const aboutTeaser = data.aboutTeaser || ''
  const aboutStory = data.aboutStory || ''
  const processTitle = data.processTitle || ''
  const processText = data.processText || ''
  const whyUsTitle = data.whyUsTitle || ''
  const whyUs = Array.isArray(data.whyUs) ? data.whyUs : []
  const whyUsOutro = data.whyUsOutro || ''
  const footerTagline = data.footerTagline || ''
  return (
    <>

      {/* HERO SECTION - fullscreen with background images and overlays */}
      <header id="welkom" className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('/assets/impressie/other1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/images/misc/20210606_101635.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />

        <div className="bunting-container">
          <div className="bunting">
            <div className="bunting-flag" />
            <div className="bunting-flag" />
            <div className="bunting-flag" />
            <div className="bunting-flag" />
            <div className="bunting-flag" />
            <div className="bunting-flag" />
            <div className="bunting-flag" />
            <div className="bunting-flag" />
            <div className="bunting-flag" />
            <div className="bunting-flag" />
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center pt-16">
          <div className="container max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">{heroTitle}</h1>
              <p className="text-lg sm:text-xl text-gray-100 leading-relaxed mb-4">{heroSubtitle}</p>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">{intro}</p>

              <div className="flex flex-wrap gap-4">
                <a href="#highlights" className="inline-flex items-center px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-lg shadow-lg transition transform hover:scale-105">{ctaAnchor}</a>
                <a href="#footer" className="inline-flex items-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border-2 border-white/30 transition transform hover:scale-105">{footerTagline}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <a href="#highlights" className="text-white/70 hover:text-white transition text-2xl" aria-label="Scroll naar beneden">{ctaAnchor}</a>
        </div>
      </header>

      {/* HIGHLIGHT SECTION - 4 blocks */}
      <section id="highlights" className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{ctaAnchor}</h2>
            <p className="text-lg text-gray-600">
              {introAfterHero}
            </p>
          </div>

          <FourBlocks blocks={blocks} />
        </div>
      </section>

      {/* USP SECTION */}
      <section id="usp" className="bg-white py-20 border-t border-gray-100">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {usp.map((item: string, index: number) => {
              const icons = ['✔', '💰', '🛠️', '🌿', '💬', '📋']
              const icon = icons[index] || '✔'
              
              const colonIndex = item.indexOf(':')
              const title = colonIndex > -1 ? item.substring(0, colonIndex).trim() : item
              const description = colonIndex > -1 ? item.substring(colonIndex + 1).trim() : ''
              
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">{icon}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="over-ons" className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">{aboutTitle}</h2>
            <p className="text-xl text-gray-600 mb-8 text-center italic">{aboutTeaser}</p>
            <div className="space-y-4">
              {aboutStory.split(/\n\s*\n/).filter(Boolean).map((para: string, idx: number) => (
                <p key={idx} className="text-lg text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCES SECTION */}
      <section id="proces" className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">{processTitle}</h2>
            <div className="space-y-4">
              {processText.split(/\n\s*\n/).filter(Boolean).map((para: string, idx: number) => (
                <p key={idx} className="text-lg text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id="whyus" className="bg-white py-20 border-t border-gray-100">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">{whyUsTitle}</h2>
          <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyUs.map((item: string, index: number) => (
              <li key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-lg font-bold">✓</div>
                </div>
                <p className="text-lg text-gray-700">{item}</p>
              </li>
            ))}
          </ul>
          <p>{whyUsOutro}</p>
        </div>
      </section>

      {/* FOOTER - use existing component */}
    </>
  )
}
