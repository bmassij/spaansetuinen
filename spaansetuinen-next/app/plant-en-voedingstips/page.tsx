import MainMenuTemplate from '../../components/layouts/MainMenuTemplate';
import content from '../../content/plant-en-voedingstips.json';
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <MainMenuTemplate content={content}>
      <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content.description }} />
    </MainMenuTemplate>
  );
}
