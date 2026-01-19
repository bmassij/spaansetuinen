import MainMenuTemplate from '../../components/layouts/MainMenuTemplate';
import content from '../../content/plant-en-voedingstips.json';
export const dynamic = 'force-dynamic';

export default function Page() {
  const c = content as any;
  return <MainMenuTemplate content={c} />;
}
