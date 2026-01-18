import fs from 'fs/promises'
import path from 'path'

export default async function Page() {
  const indexPath = path.join(process.cwd(), 'website', 'public', 'index.html')
  let contactHtml = ''
  try {
    const raw = await fs.readFile(indexPath, 'utf8')
    const m = raw.match(/<h3[^>]*>\s*Deel uw ervaring\s*<\/h3>[\s\S]*?<a[^>]*href=["']#footer["'][^>]*>/i)
    if (m) contactHtml = m[0]
    if (!contactHtml) {
      const f = raw.match(/<footer[\s\S]*?<\/footer>/i)
      if (f) contactHtml = f[0]
    }
  } catch (e) {
    contactHtml = ''
  }

  if (!contactHtml) {
    try {
      const samplePath = path.join(process.cwd(), 'spaansetuinen-next', 'content', 'trachycarpus-fortunei.json')
      const rawSample = await fs.readFile(samplePath, 'utf8')
      const sample = JSON.parse(rawSample)
      if (sample.cta) contactHtml = `<div><p>${sample.cta}</p></div>`
    } catch (e) {
      // ignore
    }
  }

  return (
    <main className="min-h-screen p-8">
      <article className="max-w-5xl mx-auto">
        {contactHtml ? (
          <div dangerouslySetInnerHTML={{ __html: contactHtml }} />
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Contact</h1>
            <p className="text-base text-gray-700">Contactinformatie niet gevonden.</p>
          </div>
        )}
      </article>
    </main>
  )
}
