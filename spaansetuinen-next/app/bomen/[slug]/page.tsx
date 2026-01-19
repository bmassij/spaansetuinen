export const dynamic = 'force-dynamic';
import ProductLayout from '@/components/ProductLayout';
import fs from 'fs/promises';
import path from 'path';

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'bomen');
  try {
    const files = await fs.readdir(contentDir);
    const slugs = files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));

    return slugs.map((slug) => ({ slug }));
  } catch (err) {
    return [];
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const primaryPath = path.join(process.cwd(), 'content', 'bomen', `${slug}.json`);
  const fallbackPath = path.join(process.cwd(), 'content', `${slug}.json`);

  let pageData: any = null;

  // Try primary path first, then fallback
  try {
    const raw = await fs.readFile(primaryPath, 'utf8');
    pageData = JSON.parse(raw);
  } catch (e1) {
    try {
      const raw2 = await fs.readFile(fallbackPath, 'utf8');
      pageData = JSON.parse(raw2);
    } catch (e2) {
      pageData = null;
    }
  }

  if (!pageData) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Content nog niet beschikbaar</h1>
        <p>{slug}</p>
      </div>
    );
  }

  return <ProductLayout page={pageData} />;
}
