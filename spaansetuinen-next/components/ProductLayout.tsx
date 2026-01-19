import ProductTemplate from './products/ProductTemplate';

export default function ProductLayout({ page }: { page: any }) {
  const mappedProps = {
    title: page?.title ?? page?.name ?? '',
    // core.html should appear as the main intro when available for bloembakken
    short_description: page?.short_description ?? page?.intro ?? page?.core?.html,
    // preserve explicit long_description when present
    long_description: page?.long_description ?? page?.longDescription,
    heroImage: page?.heroImage ?? page?.image ?? page?.hero?.image,
    gallery: Array.isArray(page?.gallery) ? page.gallery : [],
    // details array should render as kenmerken (checklist) when present
    kenmerken: Array.isArray(page?.kenmerken) ? page.kenmerken : (Array.isArray(page?.details) ? page.details : []),
    verzorging: page?.verzorging ?? null,
    plaatsing: page?.plaatsing ?? null,
    price: page?.price ?? null,
    cta: page?.cta ?? null,
  };

  return <ProductTemplate {...mappedProps} />;
}
