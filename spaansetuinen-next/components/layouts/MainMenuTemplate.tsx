import FourBlocks from '../home/FourBlocks'

type Props = {
  home: any
  heroTitle: string
  heroSubtitle: string
  intro: string
  blocks: any[]
  usp: any[]
  aboutTeaser: string
}

export default function MainMenuTemplate({ home, heroTitle, heroSubtitle, intro, blocks, usp, aboutTeaser }: Props) {
  return (
    <>

      {/* HERO SECTION - fullscreen with background images and overlays */}
      <header id="welkom" className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('/assets/impressie/other1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/hero-section.jpg')" }} />
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
                <a href="#highlights" className="inline-flex items-center px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-lg shadow-lg transition transform hover:scale-105">Bekijk ons assortiment</a>
                <a href="#footer" className="inline-flex items-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border-2 border-white/30 transition transform hover:scale-105">Neem contact op</a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <a href="#highlights" className="text-white/70 hover:text-white transition text-2xl" aria-label="Scroll naar beneden">↓</a>
        </div>
      </header>

      {/* HIGHLIGHT SECTION - 4 blocks */}
      <section id="highlights" className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Alles wat wij voor u regelen</h2>
            <p className="text-lg text-gray-600">{intro}</p>
          </div>

          <FourBlocks blocks={home.blocks} />
        </div>
      </section>

      {/* TOPSERVICE SECTION */}
      <section id="topservice" className="bg-white py-20 border-t border-gray-100">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">🌟 Topservice</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Bij ons draait alles om kwaliteit, eerlijkheid en complete ontzorging. Als kleinschalig familiebedrijf hebben we een grote liefde voor mediterrane bomen én voor onze klanten. Daarom leveren wij méér dan alleen een boom:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">✔</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Topservice</h3>
                <p className="text-gray-600">Uw Mediterrane bomen in de beste handen. Van bestelling tot levering, altijd zorgvuldig verzorgd.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">💰</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Eerlijke prijzen</h3>
                <p className="text-gray-600">Topkwaliteit Mediterrane bomen tegen scherpe prijzen.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">🛠️</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-700 mb-3">Ons selectieproces</h3>
                <p className="text-gray-700 leading-relaxed">Op onze tropische binnenplaats van maar liefst <strong>400 m²</strong> vind je een ruim assortiment mediterrane bomen. We importeren rechtstreeks uit de Costa Blanca en selecteren elke boom persoonlijk en met detail.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">🌿</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hoogwaardige Mediterrane bomen</h3>
                <p className="text-gray-600">Topkwaliteit Mediterrane bomen, met zorg geselecteerd en geschikt voor het Nederlandse klimaat.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">💬</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-700 mb-3">Ons selectieproces</h3>
                <p className="text-gray-700 leading-relaxed">Meerdere keren per jaar reizen we zelf naar Spanje om de mooiste exemplaren uit te zoeken. Elke boom wordt persoonlijk bekeken, gekeurd en gelabeld, zodat hij bij aankomst in Nederland precies aan onze hoge standaarden voldoet.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">📋</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nazorg</h3>
                <p className="text-gray-600">Professionele nazorg gegarandeerd. Wij blijven betrokken bij uw Mediterrane bomen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVER ONS SECTION */}
      <section id="over-ons" className="bg-gray-50 py-20">
        <div className="container max-w-5xl mx-auto px-6 lg:px-8">
          <div className="max-w-none">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Passie voor mediterrane schoonheid</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">{aboutTeaser}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-emerald-700 mb-3">Hoe het begon</h3>
                <p className="text-gray-700 leading-relaxed">Even kort voorstellen: wij zijn Lisette en Hans Janssen, trotse eigenaren van Spaanse Tuin & Zo.</p>
                <p className="text-gray-700 leading-relaxed">Enkele jaren geleden begon ons avontuur. Hans – toen nog eigen rijder met ritten naar Spanje – nam een palmboom mee voor onze eigen tuin. Het uitzoeken van de perfecte boom duurde uren, maar het klikte meteen tussen Hans en de Spaanse kweker. Al snel werd de palmboom een echte blikvanger. Iedereen die hem zag, was razend enthousiast en vroeg of Hans er ook één voor hen kon meenemen.</p>
                <p className="text-gray-700 leading-relaxed">Niet veel later groeide de vraag naar palmen en ontstond er ook interesse in andere mediterrane bomen, zoals olijf- en vijgenbomen. Bij elke rit naar Zuid-Spanje vulde Hans zijn trailer met een paar extra bomen voor vrienden en bekenden. Toen de belangstelling bleef groeien, besloten we in 2016 de stap te zetten: Spaanse Tuin & Zo werd geboren. Sindsdien zetten Hans en Lisette zich met veel passie en liefde in voor Spaanse Tuin & Zo.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-emerald-700 mb-3">Ons selectieproces</h3>
                <p className="text-gray-700 leading-relaxed">Op onze tropische binnenplaats van maar liefst <strong>400 m²</strong> vind je een ruim assortiment mediterrane bomen. We importeren rechtstreeks uit de Costa Blanca en selecteren elke boom persoonlijk en met detail.</p>
                <p className="text-gray-700 leading-relaxed">Door de jaren heen hebben we hechte vriendschappen opgebouwd met onze kwekers. Zij weten precies wat we zoeken: <strong>bomen van topkwaliteit tegen eerlijke prijzen</strong>. Zo blijft het mediterrane gevoel voor iedereen bereikbaar.</p>
                <p className="text-gray-700 leading-relaxed">Meerdere keren per jaar reizen we zelf naar Spanje om de mooiste exemplaren uit te zoeken. Elke boom wordt persoonlijk bekeken, gekeurd en gelabeld, zodat hij bij aankomst in Nederland precies aan onze hoge standaarden voldoet.</p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Daarom kiezen klanten voor ons</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                {usp.map((u: string, i: number) => (
                  <li key={i} className="flex items-start"><span className="text-emerald-600 mr-2">✓</span><span>{u}</span></li>
                ))}
              </ul>
              <p className="text-gray-800 font-semibold mt-6 text-lg">Spaanse Tuin & Zo — Waar Mediterrane sfeer en kwaliteit samenkomen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RECENSIES SECTION */}
      <section id="recensies" className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Wat onze klanten zeggen</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Lees de ervaringen van onze tevreden klanten en deel uw eigen verhaal.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">{"Fantastische service! De olijfboom die we kochten is prachtig en de bezorging was perfect georganiseerd. Lisette en Hans zijn echte professionals."}</p>
              <div className="text-sm text-gray-600"><strong>Maria van der Berg</strong><br />Klant sinds 2023</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">{"Eindelijk een bedrijf dat doet wat het belooft! De palmbomen zijn van topkwaliteit en het advies was eerlijk en deskundig."}</p>
              <div className="text-sm text-gray-600"><strong>Jan Peters</strong><br />Klant sinds 2022</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">{"De verhuur van bloembakken voor ons feest was een groot succes. Mooie kwaliteit en uitstekende service. Bedankt!"}</p>
              <div className="text-sm text-gray-600"><strong>Sarah de Vries</strong><br />Klant sinds 2024</div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Deel uw ervaring</h3>
            <p className="text-gray-600 mb-6">Heeft u ook een mooie ervaring met Spaanse Tuin & Zo? Deel deze met ons!</p>
            <a href="#footer" className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105">Neem contact op</a>
          </div>
        </div>
      </section>

      {/* FOOTER - use existing component */}
    
    </>
  )
}
