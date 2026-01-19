import fs from 'fs/promises';
import path from 'path';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const filePath = path.join(process.cwd(), 'content', 'verhuur.json');
  let content: any = {};
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    content = JSON.parse(raw);
  } catch (err) {
    content = {};
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        {content.hero?.title && (
          <h1 className="text-3xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: content.hero.title }} />
        )}
        {content.hero?.subtitle && (
          <p className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: content.hero.subtitle }} />
        )}
      </header>

      {content.core?.html ? (
        <article className="prose mb-8" dangerouslySetInnerHTML={{ __html: content.core.html }} />
      ) : content.core?.content ? (
        <article className="prose mb-8" dangerouslySetInnerHTML={{ __html: content.core.content }} />
      ) : content.core?.text ? (
        <article className="prose mb-8">{content.core.text}</article>
      ) : null}

      {Array.isArray(content.sections) &&
        content.sections.map((section: any, idx: number) => (
          <section key={idx} className="mb-8">
            {section.title && (
              <h2 className="text-2xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: section.title }} />
            )}

            {section.html ? (
              <div className="prose" dangerouslySetInnerHTML={{ __html: section.html }} />
            ) : section.content ? (
              <div className="prose" dangerouslySetInnerHTML={{ __html: section.content }} />
            ) : section.text ? (
              <div className="prose">{section.text}</div>
            ) : null}
          </section>
        ))}

      {content.benefits ? (
        <aside className="mt-12">
          {content.benefits.html ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: content.benefits.html }} />
          ) : Array.isArray(content.benefits) ? (
            <ul className="list-disc ml-6">
              {content.benefits.map((b: any, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </ul>
          ) : (
            <div className="prose">{content.benefits}</div>
          )}
        </aside>
      ) : null}
    </main>
  );
}
