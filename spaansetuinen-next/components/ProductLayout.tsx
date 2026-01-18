import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';

interface PageData {
  title: string;
  heroText: string;
  intro: string;
  kenmerken: string;
  verzorging: string;
  plaatsing: string;
  cta: string;
}

export default function ProductLayout({ page }: { page: PageData }) {
  return (
    <div>
      <Navbar />
      <Hero title={page.title} text={page.heroText} />
      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sectie titel</h2>
          <p>{page.intro}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sectie titel</h2>
          <p>{page.kenmerken}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sectie titel</h2>
          <p>{page.verzorging}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sectie titel</h2>
          <p>{page.plaatsing}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sectie titel</h2>
          <p>{page.cta}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}