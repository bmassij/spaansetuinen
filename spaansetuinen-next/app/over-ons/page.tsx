import fs from 'fs/promises'
import path from 'path'

export default async function Page() {
  const indexPath = path.join(process.cwd(), 'website', 'public', 'index.html')
  let sectionHtml = ''
  try {
    const raw = await fs.readFile(indexPath, 'utf8')
    const m = raw.match(/<section[^>]*id=["']over-ons["'][^>]*>[\s\S]*?<\/section>/i)
    if (m) sectionHtml = m[0]
  } catch (e) {
    sectionHtml = ''
  }

  if (!sectionHtml) {
    try {
      const homePath = path.join(process.cwd(), 'spaansetuinen-next', 'content', 'home.json')
      const rawHome = await fs.readFile(homePath, 'utf8')
      const home = JSON.parse(rawHome)
      const about = home.aboutTeaser || home.intro || ''
      if (about) sectionHtml = `<section class=\"bg-gray-50 py-20\"><div class=\"container max-w-5xl mx-auto px-6 lg:px-8\"><div class=\"max-w-none\"><h1 class=\"text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center\">Over ons</h1><p class=\"text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto\">${about}</p></div></div></section>`
    } catch (e) {
      // ignore
    }
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
