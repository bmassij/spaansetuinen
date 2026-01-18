import fs from 'fs/promises'
import path from 'path'

export default async function Page() {
  const filePath = path.join(process.cwd(), 'spaansetuinen-next', 'content', 'olea-europea.json')
  let data: any = {}
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    data = JSON.parse(raw)
  } catch (e) {
    data = {}
  }

  const html = data.html || data.body || data.intro || ''

  return (
    <main className="min-h-screen p-8">
      <article className="max-w-5xl mx-auto">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Assortiment</h1>
            <p className="text-base text-gray-700">Informatie ontbreekt.</p>
          </div>
        )}
      </article>
    </main>
  )
}
