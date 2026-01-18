import ProductLayout from '@/components/ProductLayout';
import pageData from '../../../../content/trachycarpus-fortunei.json';

export default function Page() {
  return <ProductLayout page={pageData} />;
}