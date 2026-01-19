import MainMenuTemplate from '../../components/layouts/MainMenuTemplate';
import content from '../../content/verhuur.json';
export const dynamic = 'force-dynamic';

export default function Page() {
  return <MainMenuTemplate content={content} />;
}
