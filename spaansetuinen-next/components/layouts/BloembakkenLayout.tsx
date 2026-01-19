import React from "react";
import MainMenuTemplate from "./MainMenuTemplate";

type Props = {
  content: {
    hero?: {
      title?: string;
      subtitle?: string;
      image?: string;
    };
    core?: {
      html?: string;
    };
    details?: string[];
    sections?: any; // ensure sections are ignored
  };
};

export default function BloembakkenLayout({ content }: Props) {
  // Ensure sections are ignored by explicitly omitting them from shellContent and not rendering them
  const { sections, ...rest } = content ?? {};
  const shellContent = { ...rest, core: undefined };

  return (
    <>
      {/* MainMenuTemplate used only as shell (nav + footer); it will render the hero using content.hero and the homepage FourBlocks */}
      <MainMenuTemplate content={shellContent} />

      {/* Main content area: core.html EXACT één keer and details; sections are intentionally ignored */}
      {content?.core?.html && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.core.html }} />
          </section>
        </main>
      )}

      {Array.isArray(content?.details) && content.details.length > 0 && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-2xl font-semibold mb-3">Details</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {content.details.map((d, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: String(d) }} />
              ))}
            </ul>
          </section>
        </main>
      )}
    </>
  );
}
