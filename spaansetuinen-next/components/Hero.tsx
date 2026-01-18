export default function Hero({ title, text }: { title: string; text: string }) {
  return (
    <section className="bg-blue-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl">{text}</p>
      </div>
    </section>
  );
}