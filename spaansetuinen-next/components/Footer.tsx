import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" aria-label="Home">
              <img src="/assets/logo.svg" alt="Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-300 mt-3 text-sm">Voorbeeld footertekst</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Navigatie</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-emerald-400">Voorbeeldtitel</Link></li>
              <li><Link href="/over-ons" className="hover:text-emerald-400">Voorbeeldtitel</Link></li>
              <li><Link href="/assortiment" className="hover:text-emerald-400">Voorbeeldtitel</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400">Voorbeeldtitel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <p className="text-gray-300 text-sm">Voorbeeldtekst</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
