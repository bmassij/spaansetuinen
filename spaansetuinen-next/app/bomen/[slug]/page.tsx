import ProductLayout from '@/components/ProductLayout';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');
  try {
    const files = await fs.readdir(contentDir);
    const slugs = files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));

    // Ensure 'druivenranken' is explicitly included
    if (!slugs.includes('druivenranken')) slugs.push('druivenranken');

    return slugs.map((slug) => ({ slug }));
  } catch (err) {
    // Fallback to include the specific slug if reading fails
    return [{ slug: 'druivenranken' }];
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', `${slug}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const pageData = JSON.parse(raw);
    return <ProductLayout page={pageData} />;
  } catch (err) {
    return notFound();
  }
}
