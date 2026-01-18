import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Home',
}

export default function Page() {
  return (
    <>
      <Navbar />

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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">Voorbeeldtitel</h1>
              <p className="text-lg sm:text-xl text-gray-100 leading-relaxed mb-4">Voorbeeldtekst</p>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">Voorbeeldtekst</p>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8">Voorbeeldtekst</p>

              <div className="flex flex-wrap gap-4">
                <a href="#highlights" className="inline-flex items-center px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-lg shadow-lg transition transform hover:scale-105">CTA voorbeeld</a>
                <a href="#footer" className="inline-flex items-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border-2 border-white/30 transition transform hover:scale-105">CTA voorbeeld</a>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Voorbeeldtitel</h2>
            <p className="text-lg text-gray-600">Voorbeeldtekst</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <a href="#onze-bomen" className="group block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8">
              <img src="/assets/palm.svg" alt="icon" className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Voorbeeldtitel</h3>
              <p className="text-gray-600 leading-relaxed">Voorbeeldtekst</p>
            </a>

            <a href="#bloembakken" className="group block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8">
              <img src="/assets/bloembak.svg" alt="icon" className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Voorbeeldtitel</h3>
              <p className="text-gray-600 leading-relaxed">Voorbeeldtekst</p>
            </a>

            <a href="#verhuur" className="group block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8">
              <img src="/assets/verhuur/other1.jpg" alt="icon" className="w-16 h-16 object-cover rounded-xl mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Voorbeeldtitel</h3>
              <p className="text-gray-600 leading-relaxed">Voorbeeldtekst</p>
            </a>

            <a href="#bezorgen" className="group block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8">
              <img src="/assets/bezorgen/other1.jpg" alt="icon" className="w-16 h-16 object-cover rounded-xl mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Voorbeeldtitel</h3>
              <p className="text-gray-600 leading-relaxed">Voorbeeldtekst</p>
            </a>
          </div>
        </div>
      </section>

      {/* TOPSERVICE SECTION */}
      <section id="topservice" className="bg-white py-20 border-t border-gray-100">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Voorbeeldtitel</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Voorbeeldtekst</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">✔</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Voorbeeldtitel</h3>
                <p className="text-gray-600">Voorbeeldtekst</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">✔</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Voorbeeldtitel</h3>
                <p className="text-gray-600">Voorbeeldtekst</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">✔</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-700 mb-3">Voorbeeldtitel</h3>
                <p className="text-gray-700 leading-relaxed">Voorbeeldtekst</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">✔</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Voorbeeldtitel</h3>
                <p className="text-gray-600">Voorbeeldtekst</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">✔</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-700 mb-3">Voorbeeldtitel</h3>
                <p className="text-gray-700 leading-relaxed">Voorbeeldtekst</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">✔</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Voorbeeldtitel</h3>
                <p className="text-gray-600">Voorbeeldtekst</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVER ONS SECTION */}
      <section id="over-ons" className="bg-gray-50 py-20">
        <div className="container max-w-5xl mx-auto px-6 lg:px-8">
          <div className="max-w-none">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Voorbeeldtitel</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">Voorbeeldtekst</p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-emerald-700 mb-3">Voorbeeldtitel</h3>
                <p className="text-gray-700 leading-relaxed">Voorbeeldtekst</p>
                <p className="text-gray-700 leading-relaxed">Voorbeeldtekst</p>
                <p className="text-gray-700 leading-relaxed">Voorbeeldtekst</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-emerald-700 mb-3">Voorbeeldtitel</h3>
                <p className="text-gray-700 leading-relaxed">Voorbeeldtekst</p>
                <p className="text-gray-700 leading-relaxed">Voorbeeldtekst</p>
                <p className="text-gray-700 leading-relaxed">Voorbeeldtekst</p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Voorbeeldtitel</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span><span>Voorbeeldtekst</span></li>
                <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span><span>Voorbeeldtekst</span></li>
                <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span><span>Voorbeeldtekst</span></li>
                <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span><span>Voorbeeldtekst</span></li>
                <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span><span>Voorbeeldtekst</span></li>
              </ul>
              <p className="text-gray-800 font-semibold mt-6 text-lg">Voorbeeldtekst</p>
            </div>
          </div>
        </div>
      </section>

      {/* RECENSIES SECTION */}
      <section id="recensies" className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Voorbeeldtitel</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Voorbeeldtekst</p>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Voorbeeldtitel</h3>
            <p className="text-gray-600 mb-6">Voorbeeldtekst</p>
            <a href="#footer" className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105">CTA voorbeeld</a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">Voorbeeldtekst</p>
              <div className="text-sm text-gray-600"><strong>Voorbeeldtitel</strong><br />Voorbeeldtekst</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">Voorbeeldtekst</p>
              <div className="text-sm text-gray-600"><strong>Voorbeeldtitel</strong><br />Voorbeeldtekst</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">Voorbeeldtekst</p>
              <div className="text-sm text-gray-600"><strong>Voorbeeldtitel</strong><br />Voorbeeldtekst</div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Voorbeeldtitel</h3>
            <p className="text-gray-600 mb-6">Voorbeeldtekst</p>
            <a href="#footer" className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105">CTA voorbeeld</a>
          </div>
        </div>
      </section>

      {/* FOOTER - use existing component */}
      <Footer />
    </>
  )
}
