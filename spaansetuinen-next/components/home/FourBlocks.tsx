import Link from 'next/link';
import type { HomeFourBlock } from '../../content/home/four-blocks';

type Props = {
  blocks: HomeFourBlock[];
};

export default function FourBlocks({ blocks }: Props) {
  const items = blocks.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((block) => (
        <Link
          key={block.id}
          href={block.href || '#'}
          className="block p-6 border rounded hover:shadow-md focus:outline-none focus:ring"
        >
          <div className="h-full">
            <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
            <p className="text-sm text-gray-600">{block.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
