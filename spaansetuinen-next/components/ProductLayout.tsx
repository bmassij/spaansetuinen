import ProductTemplate from './products/ProductTemplate';

export default function ProductLayout({ page }: { page: any }) {
  const mappedProps = {
    title: page?.title ?? page?.name ?? '',
    short_description: page?.short_description ?? page?.intro,
    long_description: page?.long_description ?? page?.longDescription,
    heroImage: page?.heroImage ?? page?.image,
    gallery: Array.isArray(page?.gallery) ? page.gallery : [],
    kenmerken: Array.isArray(page?.kenmerken) ? page.kenmerken : [],
    verzorging: page?.verzorging ?? null,
    plaatsing: page?.plaatsing ?? null,
    price: page?.price ?? null,
    cta: page?.cta ?? null,
  };

  return <ProductTemplate {...mappedProps} />;
}
