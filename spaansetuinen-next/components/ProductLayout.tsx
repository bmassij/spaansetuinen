import Navbar from './Navbar';
import Footer from './Footer';

interface PageData {
  title: string;
  heroText?: string;
  intro?: string;
  description?: string;
  kenmerken?: {
    heading?: string;
    content?: string;
    list?: string[];
  };
  image?: {
    url?: string;
    alt?: string;
    placeholder?: string;
  };
  verzorging?: {
    heading?: string;
    sections?: { title?: string; content?: string; list?: string[] }[];
  };
  plaatsing?: {
    heading?: string;
    sections?: { title?: string; content?: string }[];
  };
  cta?: {
    heading?: string;
    intro?: string;
    body?: string;
    phone?: { href?: string; text?: string };
    email?: { href?: string; text?: string };
  };
  breadcrumbs?: {
    home?: string;
    trees?: string;
    category?: string;
  };
}

export default function ProductLayout({ page }: { page: PageData }) {
  return (
    <div>
      <Navbar />
      <header className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white pt-24 pb-16">
        <div className="absolute inset-0 opacity-40" style={{backgroundImage: "url('assets/index/other27.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className="absolute inset-0 opacity-40" style={{backgroundImage: "url('assets/index/other27.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-emerald-700/30 to-emerald-900/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">{page.title}</h1>

              <p className="text-lg sm:text-xl text-emerald-50 leading-relaxed">{page.heroText}</p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="w-full max-w-md h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20">
                <div className="text-center p-8">
                  {page.image?.url ? (
                    <img src={page.image.url} alt={page.image.alt} className="mx-auto mb-4 max-h-40 object-cover rounded-lg" />
                  ) : (
                    <>
                      <div className="text-6xl mb-4">🌴</div>
                      <p className="text-white/80 text-sm">Afbeelding volgt</p>
                    </>
                  )}
                  {page.image?.url && <p className="text-white/80 text-sm">{page.image?.alt}</p>}
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>
      <main className="bg-white py-16">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-600" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
            <li><a href="#" className="hover:text-emerald-600 transition">{page.breadcrumbs?.home}</a></li>
            <li><span className="text-gray-400">/</span></li>
            <li><a href="#" className="hover:text-emerald-600 transition">{page.breadcrumbs?.trees}</a></li>
            <li><span className="text-gray-400">/</span></li>
            <li><a href="#" className="hover:text-emerald-600 transition">{page.breadcrumbs?.category}</a></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium">{page.title}</li>
          </ol>
          </nav>
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">{page.intro}</p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">{page.description}</p>
          </section>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-emerald-600 pl-4">{page.kenmerken?.heading}</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{page.kenmerken?.content}</p>
                {page.kenmerken?.list && page.kenmerken.list.length > 0 && (
                  <div className="bg-emerald-50 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-emerald-800 mb-3">{/* heading comes from page if needed */}</h4>
                    <ul className="space-y-2">
                      {page.kenmerken.list.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-600 mr-2 mt-1">✓</span>
                          <span><strong>{item}</strong></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <div className="w-full h-96 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg shadow-lg flex items-center justify-center border-2 border-emerald-200">
                  <div className="text-center p-8">
                    {page.image?.url ? (
                        <img src={page.image.url} alt={page.image.alt} className="mx-auto mb-4 max-h-56 object-cover rounded-lg" />
                      ) : (
                        <div className="text-8xl mb-4">{page.image?.placeholder}</div>
                      )}
                      <p className="text-emerald-700 font-medium">{page.title}</p>
                      <p className="text-emerald-600 text-sm mt-2">{page.image?.placeholder}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          <section className="mb-16 bg-emerald-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-emerald-600 pl-4">{page.verzorging?.heading}</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{page.verzorging?.sections?.[0]?.title}</h3>
              <p>{page.verzorging?.sections?.[0]?.content}</p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{page.verzorging?.sections?.[1]?.title}</h3>
              <p>{page.verzorging?.sections?.[1]?.content}</p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{page.verzorging?.sections?.[2]?.title}</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">{page.verzorging?.sections?.[3]?.title}</h4>
                  {page.verzorging?.sections?.[3]?.list && page.verzorging.sections[3].list.length > 0 ? (
                    <ul className="text-sm space-y-1">
                      {page.verzorging.sections[3].list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">{page.verzorging?.sections?.[4]?.title}</h4>
                  <p className="text-sm">{page.verzorging?.sections?.[4]?.content}</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{page.verzorging?.sections?.[5]?.title}</h3>
              <p>{page.verzorging?.sections?.[5]?.content}</p>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-emerald-600 pl-4">{page.plaatsing?.heading}</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{page.plaatsing?.sections?.[0]?.title}</h3>
              <p>{page.plaatsing?.sections?.[0]?.content}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{page.plaatsing?.sections?.[1]?.title}</h3>
              <p>{page.plaatsing?.sections?.[1]?.content}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{page.plaatsing?.sections?.[2]?.title}</h3>
              <p>{page.plaatsing?.sections?.[2]?.content}</p>
            </div>
          </section>
          <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">{page.cta?.heading}</h2>
            <p className="text-lg text-emerald-50 mb-4 max-w-2xl mx-auto">{page.cta?.intro}</p>
            <p className="text-lg text-emerald-50 mb-6 max-w-2xl mx-auto">{page.cta?.body}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={page.cta?.phone?.href} className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition transform hover:scale-105">{page.cta?.phone?.text}</a>
              <a href={page.cta?.email?.href} className="inline-flex items-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition transform hover:scale-105">{page.cta?.email?.text}</a>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
