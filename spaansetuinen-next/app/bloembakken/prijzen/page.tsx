import BloembakkenLayout from "@/components/layouts/BloembakkenLayout";
import ServiceCard from "@/components/cards/ServiceCard";
import fs from 'fs/promises';
import path from 'path';

export default async function Page() {
  const filePath = path.join(process.cwd(), 'content', 'bloembakken-prijzen.json');
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const content = JSON.parse(raw);

    return (
      <>
        <BloembakkenLayout content={content} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Introductietekst (literal) */}
          <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <p>
              Bovenstaande bloembakken zijn beschikbaar in verschillende afmetingen.
              <br />
              Alle prijzen zijn weergegeven exclusief en inclusief 21% BTW.
            </p>
          </section>

          {/* Group 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{content.group1.title}</h2>
            <p className="mb-4 text-gray-700" style={{ whiteSpace: 'pre-line' }}>{content.group1.context}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.isArray(content.group1.cards) && content.group1.cards.map((c: any) => (
                <ServiceCard
                  key={c.title}
                  icon={<span aria-hidden>🌿</span>}
                  title={c.title}
                  description={c.description}
                />
              ))}
            </div>
          </section>

          {/* Group 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{content.group2.title}</h2>
            <p className="mb-4 text-gray-700">{content.group2.context}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.isArray(content.group2.cards) && content.group2.cards.map((c: any) => (
                <ServiceCard
                  key={c.title}
                  icon={<span aria-hidden>🌿</span>}
                  title={c.title}
                  description={c.description}
                />
              ))}
            </div>
          </section>

          {/* Scheidingsbakken (normal text section) */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Scheidingsbakken</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Afmeting: {content.scheidingsbakken.afmeting}</li>
              <li>Prijs excl. BTW: {content.scheidingsbakken.prijs_excl}</li>
              <li>Prijs incl. BTW: {content.scheidingsbakken.prijs_incl}</li>
            </ul>
          </section>
        </main>
      </>
    );
  } catch (err) {
    return null;
  }
}
