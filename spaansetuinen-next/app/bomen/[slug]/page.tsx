import ProductLayout from '@/components/ProductLayout';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

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
