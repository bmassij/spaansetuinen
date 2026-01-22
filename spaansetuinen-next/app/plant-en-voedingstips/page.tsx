import BloembakkenLayout from '../../components/layouts/BloembakkenLayout';
import content from '../../content/plant-en-voedingstips.json';
export const dynamic = 'force-dynamic';

export default function Page() {
  return <BloembakkenLayout content={content} showServiceCards={true} />;
}
