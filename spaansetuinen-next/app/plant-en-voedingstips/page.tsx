import ProductLayout from '../../components/ProductLayout';
import fs from 'fs/promises';
import path from 'path';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const filePath = path.join(process.cwd(), 'content', 'plant-en-voedingstips.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const content = JSON.parse(raw);

  return <ProductLayout page={content} />;
}
