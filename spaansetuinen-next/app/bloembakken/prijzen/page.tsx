import ProductLayout from '@/components/ProductLayout';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export default async function Page() {
  const filePath = path.join(process.cwd(), 'content', 'bloembakken-prijzen.json');
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const pageData = JSON.parse(raw);
    return <ProductLayout page={pageData} />;
  } catch (err) {
    return notFound();
  }
}
