import Navbar from './Navbar';
import Footer from './Footer';

export default function ProductLayout({ page }: { page: any }) {
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {page?.title && <h1 className="text-3xl font-bold mb-4">{page.title}</h1>}
          {page?.heroText && <p className="text-lg mb-4">{page.heroText}</p>}
          {page?.intro && <p className="mb-4">{page.intro}</p>}
          {page?.short_description && <p className="mb-4">{page.short_description}</p>}
          {page?.long_description && <div className="prose max-w-none">{page.long_description}</div>}
        </div>
      </main>
      <Footer />
    </>
  );
}
