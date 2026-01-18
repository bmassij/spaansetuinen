import fs from 'fs/promises'
import path from 'path'

export default async function Page() {
  let contactHtml = ''
  try {
    const filePath = path.join(process.cwd(), 'spaansetuinen-next', 'content', 'contact.json')
    const raw = await fs.readFile(filePath, 'utf8')
    const obj = JSON.parse(raw)
    contactHtml = obj.contactHtml || ''
  } catch (e) {
    contactHtml = ''
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
