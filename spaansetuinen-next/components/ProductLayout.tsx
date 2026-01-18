import Navbar from './Navbar';
import Footer from './Footer';

export default function ProductLayout({ page }: { page: { html?: string } }) {
  return (
    <>
      <Navbar />
      <main>
        <div dangerouslySetInnerHTML={{ __html: page?.html ?? '' }} />
      </main>
      <Footer />
    </>
  );
}
