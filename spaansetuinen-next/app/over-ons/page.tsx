import overOns from '@/content/over-ons.json';

export default async function Page() {
  const sectionHtml = overOns.sectionHtml || ''

  return (
    <main className="min-h-screen p-8">
      <article className="max-w-5xl mx-auto">
        {sectionHtml ? (
          <div dangerouslySetInnerHTML={{ __html: sectionHtml }} />
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Over ons</h1>
            <p className="text-base text-gray-700">Informatie niet gevonden.</p>
          </div>
        )}
      </article>
    </main>
  )
}
