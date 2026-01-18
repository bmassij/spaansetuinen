import fs from 'fs/promises'
import path from 'path'

export default async function Page() {
  let sectionHtml = ''
  try {
    const filePath = path.join(process.cwd(), 'spaansetuinen-next', 'content', 'over-ons.json')
    const raw = await fs.readFile(filePath, 'utf8')
    const obj = JSON.parse(raw)
    sectionHtml = obj.sectionHtml || ''
  } catch (e) {
    sectionHtml = ''
  }

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
