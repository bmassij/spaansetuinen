import MainMenuTemplate from '../../components/layouts/MainMenuTemplate';
import content from '../../content/onze-service.json';

export default function OnzeServicePage() {
  const c = content as any;
  return <MainMenuTemplate content={c} />;
}
