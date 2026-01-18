import ProductLayout from '../../components/ProductLayout';

const dummyPage = {
  title: "Voorbeeld product",
  heroText: "Voorbeeld hero tekst",
  intro: "Voorbeeld intro",
  kenmerken: "Voorbeeld kenmerken",
  verzorging: "Voorbeeld verzorging",
  plaatsing: "Voorbeeld plaatsing",
  cta: "Voorbeeld call to action"
};

export default function Page() {
  return <ProductLayout page={dummyPage} />;
}