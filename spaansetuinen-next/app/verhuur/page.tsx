import RichContentLayout from '../../components/layouts/RichContentLayout';
import content from '../../content/verhuur.json';
export const dynamic = 'force-dynamic';

export default function Page() {
  return <RichContentLayout content={content} />;
}
