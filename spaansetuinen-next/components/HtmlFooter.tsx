export default function HtmlFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div>
            <img src="logo.png" alt="Spaanse Tuin & Zo - 10 jaar" className="h-16 w-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Spaanse Tuin & Zo</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Waar Mediterrane sfeer en kwaliteit samenkomen.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Contact</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="mr-2" aria-hidden="true">📍</span>
                <address className="not-italic">
                  Heinsbergerweg 20<br />6074 AD Melick
                </address>
              </li>
              <li className="flex items-center">
                <span className="mr-2" aria-hidden="true">📞</span>
                <a href="tel:+31611929392" className="hover:text-emerald-400 transition" aria-label="Bel ons op +31611929392">+31611929392</a>
              </li>
              <li className="flex items-center">
                <span className="mr-2" aria-hidden="true">✉️</span>
                <a href="mailto:lisette@spaansetuin-enzo.nl" className="hover:text-emerald-400 transition" aria-label="E-mail naar lisette@spaansetuin-enzo.nl">lisette@spaansetuin-enzo.nl</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Openingstijden</h4>
            <p className="text-gray-400 text-sm mb-3">Seizoen maart – september:</p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center">
                <span className="mr-2" aria-hidden="true">🕐</span>
                <span><strong>Zaterdag:</strong> 11.00 - 17.00 uur</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2" aria-hidden="true">🕐</span>
                <span><strong>Dinsdag:</strong> 13.00 - 17.00 uur</span>
              </li>
            </ul>
            <p className="text-gray-400 text-xs mt-3">
              Ook buiten openingstijden bent u welkom. Neem contact met ons op voor een afspraak.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Navigatie</h4>
            <nav aria-label="Footer navigatie">
              <ul className="space-y-2 text-gray-300 text-sm mb-6">
                <li><a href="index.html" className="hover:text-emerald-400 transition">Welkom</a></li>
                <li><a href="index.html#over-ons" className="hover:text-emerald-400 transition">Over ons</a></li>
                <li><a href="bloembakken.html" className="hover:text-emerald-400 transition">Bloembakken</a></li>
                <li><a href="bezorgen.html" className="hover:text-emerald-400 transition">Bezorgen</a></li>
                <li><a href="verhuur.html" className="hover:text-emerald-400 transition">Verhuur</a></li>
                <li><a href="plant-en-voedingstips.html" className="hover:text-emerald-400 transition">Plant- en voedingstips</a></li>
              </ul>
            </nav>

            <h5 className="text-sm font-semibold mb-3 text-emerald-400">Volg ons</h5>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Bezoek onze Facebook pagina" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-full flex items-center justify-center transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Bezoek onze Instagram pagina" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-full flex items-center justify-center transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            &copy; 2025 Spaanse Tuin & Zo — Mediterrane bomen
          </p>
          <p className="text-gray-500 text-xs">
            KvK: 65475860 | BTW: NL001888980B55
          </p>
        </div>
      </div>
    </footer>
  );
}
