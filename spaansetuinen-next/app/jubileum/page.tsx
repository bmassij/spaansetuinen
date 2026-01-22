import { isAnniversaryActive } from '@/config/anniversary';
import JubileumDecor from '@/components/JubileumDecor';

export default function JubileumPage() {
  // If anniversary is not active, render nothing
  if (!isAnniversaryActive()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        {/* Jubilee Decorations */}
        <JubileumDecor variant="full" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>10 jaar</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Tien jaar mediterrane<br />passie en vakmanschap
          </h1>

          {/* Intro */}
          <p className="text-xl md:text-2xl text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            Een feestelijk moment om stil te staan bij waar we voor staan en wat we samen hebben bereikt
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            10 jaar Spaanse Tuin & Zo
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-xl">
              In 2016 begon ons verhaal met een simpele passie: de warmte, de geuren en de rust van de 
              Middellandse Zee naar Nederland brengen. Niet door een vakantiegevoel na te bootsen, maar 
              door authentieke mediterrane planten met zorg en expertise aan te bieden.
            </p>

            <p>
              Wat als kleine kwekerij begon, is uitgegroeid tot een gespecialiseerde partij waar 
              kwaliteit, vakmanschap en persoonlijk advies centraal staan. Elke olijfboom, palmboom 
              en vijgenboom die we aanbieden, is met aandacht geselecteerd. We kennen hun verhaal, 
              hun behoeften, en delen dat graag met u.
            </p>

            <p>
              In deze tien jaar hebben we honderden tuinen mogen transformeren tot mediterrane oases. 
              We hebben klanten begeleid van eerste kennismaking tot jarenlange nazorg. We hebben gezien 
              hoe een jonge olijfboom uitgroeit tot imposant tuinornament, en hoe een kleine palmboom 
              een terras karakter geeft.
            </p>

            <p className="text-xl font-medium text-gray-900">
              Dat alles hebben we aan u te danken. Uw vertrouwen, uw enthousiasme en uw terugkerende 
              bezoeken maken ons werk mogelijk en waardevol.
            </p>
          </div>
        </div>
      </section>

      {/* Jubilee Actions Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Wat betekent dit jubileum voor u?
          </h2>

          <div className="space-y-8">
            {/* Extra attention */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Extra aandacht en zorg
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Tijdens het jubileumjaar besteden we nog meer aandacht aan persoonlijk advies, 
                    verzorging en nazorg. Elke bezoeker krijgt de tijd en expertise die een mediterrane 
                    tuin verdient.
                  </p>
                </div>
              </div>
            </div>

            {/* Surprises on location */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Verrassingen op onze locatie
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Kom langs op onze tropische binnenplaats en ontdek bijzondere jubileumverrassingen. 
                    Kleine attenties, exclusieve adviesmomenten, en de warmte die past bij dit feestelijke jaar.
                  </p>
                </div>
              </div>
            </div>

            {/* Limited time */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Een bijzonder moment
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Dit jubileumjaar is tijdelijk. Een moment om samen stil te staan bij tien jaar 
                    mediterrane expertise en om vooruit te kijken naar alles wat nog komt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Voorwaarden jubileumperiode
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="font-semibold text-gray-900">Geldig tot:</strong> 31 december 2026
            </p>
            <p>
              <strong className="font-semibold text-gray-900">Actievoorwaarden:</strong> Jubileumverrassingen 
              en extra aandacht zijn beschikbaar zolang de voorraad strekt. Niet geldig in combinatie met 
              andere lopende acties, tenzij anders aangegeven.
            </p>
            <p className="text-sm text-gray-600 mt-6">
              Spaanse Tuin & Zo behoudt zich het recht voor om voorwaarden aan te passen of de 
              jubileumperiode vervroegd te beëindigen indien omstandigheden daar aanleiding toe geven.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Invitation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        {/* Jubilee Decorations */}
        <JubileumDecor variant="compact" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Kom langs en vier mee
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ontdek onze tropische binnenplaats, laat u inspireren door mediterrane schoonheid, 
            en ervaar de passie die al tien jaar onze drijfveer is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Bezoek ons
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg border-2 border-white/20 transition-colors"
            >
              Terug naar home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
