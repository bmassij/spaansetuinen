import fs from 'fs/promises';
import path from 'path';
import BloembakkenLayout from '@/components/layouts/BloembakkenLayout';

export default async function Page() {
  const filePath = path.join(process.cwd(), 'content', 'bloembakken-prijzen.json');
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const content = JSON.parse(raw);

    return (
      <>
        <BloembakkenLayout content={content} />
      </>
    );
  } catch (err) {
    return null;
  }
}
