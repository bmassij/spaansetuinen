import ProductTemplate from './products/ProductTemplate';

export default function ProductLayout({ page, isTreePage: isTreePageProp }: { page: any; isTreePage?: boolean }) {
  const isTreePage = isTreePageProp ?? (!!page && String(page?.type || '').toLowerCase() === 'tree');

  // STRICT MODE for tree pages: disable fallback chains
  if (isTreePage) {
    const mappedProps = {
      title: page?.title ?? '',
      short_description: page?.intro ?? '',
      long_description: page?.description ?? '',
      heroImage: page?.image?.url ?? '',
      gallery: [],
      kenmerken: Array.isArray(page?.kenmerken?.list) ? page.kenmerken.list : [],
      verzorging: page?.verzorging ?? null,
      plaatsing: page?.plaatsing ?? null,
      price: null,
      cta: page?.cta ?? null,
      isTreePage,
      // Pass raw JSON structure for strict rendering
      rawData: page,
    };
    return <ProductTemplate {...mappedProps} />;
  }

  // Original behavior for non-tree pages
  const mappedProps = {
    title: page?.title ?? page?.name ?? '',
    short_description: page?.short_description ?? page?.intro ?? page?.core?.html,
    long_description: page?.long_description ?? page?.longDescription,
    heroImage: page?.heroImage ?? page?.image ?? page?.hero?.image,
    gallery: Array.isArray(page?.gallery) ? page.gallery : [],
    kenmerken: Array.isArray(page?.kenmerken) ? page.kenmerken : (Array.isArray(page?.details) ? page.details : []),
    verzorging: page?.verzorging ?? null,
    plaatsing: page?.plaatsing ?? null,
    price: page?.price ?? null,
    cta: page?.cta ?? null,
    isTreePage,
  };

  return <ProductTemplate {...mappedProps} />;
}
