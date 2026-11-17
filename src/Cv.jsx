import { useEffect, useState } from "react";

// Renders public/resume.json (JSON Resume schema, https://jsonresume.org/schema)

const fmt = (d) => (d ? d.slice(0, 7) : "present");

// turn each "(https://...)" in a highlight into a link named after the url's last segment
function linkify(text) {
  return text.split(/\s*\((https?:\/\/[^)]+)\)/).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} className="text-blue-400 hover:underline">
        {" "}({part.replace(/\/+$/, "").split("/").pop()})
      </a>
    ) : (
      part
    )
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold border-b border-gray-800 pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tags({ items }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((k) => (
        <span
          key={k}
          className="text-xs rounded-full bg-gray-800 px-2 py-1 text-gray-300"
        >
          {k}
        </span>
      ))}
    </div>
  );
}

export default function Cv() {
  const [cv, setCv] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}resume.json`)
      .then((res) => res.json())
      .then(setCv);
  }, []);

  if (!cv)
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );

  const { basics, work = [], projects = [], education = [], publications = [], skills = [], languages = [] } = cv;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-10">
      <main className="max-w-3xl mx-auto">
        <a href="#/" className="text-blue-400 hover:underline text-sm print:hidden">
          ← home
        </a>
        <header className="mt-6">
          <h1 className="text-3xl font-bold">{basics.name}</h1>
          <p className="text-gray-400">{basics.label}</p>
          <p className="text-gray-500 text-sm">
            {basics.location?.city}, {basics.location?.countryCode}
          </p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            {basics.profiles?.map((p) => (
              <a key={p.url} href={p.url} className="text-blue-400 hover:underline">
                {p.network}
              </a>
            ))}
            <a href={`${import.meta.env.BASE_URL}resume.json`} className="text-blue-400 hover:underline">
              resume.json
            </a>
          </div>
          <p className="mt-4 text-gray-300">{basics.summary}</p>
        </header>

        <Section title="Experience">
          {work.map((w) => (
            <article key={w.name + w.startDate} className="mb-6">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="font-semibold">
                  {w.position} · {w.url ? <a href={w.url} className="text-blue-400 hover:underline">{w.name}</a> : w.name}
                </h3>
                <span className="text-gray-500 text-sm">
                  {fmt(w.startDate)} – {fmt(w.endDate)}
                </span>
              </div>
              {w.summary && <p className="text-gray-300 mt-1">{w.summary}</p>}
              {w.highlights?.length > 0 && (
                <ul className="list-disc ml-5 mt-2 text-gray-400 text-sm space-y-1">
                  {w.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </Section>

        <Section title="Projects">
          {projects.map((p) => (
            <article key={p.name} className="mb-5">
              <h3 className="font-semibold">
                {p.url ? <a href={p.url} className="text-blue-400 hover:underline">{p.name}</a> : p.name}
                {p.entity && <span className="text-gray-500 text-sm font-normal"> · {p.entity}</span>}
              </h3>
              {p.description && <p className="text-gray-300 mt-1">{p.description}</p>}
              {p.highlights?.length > 0 && (
                <ul className="list-disc ml-5 mt-2 text-gray-400 text-sm space-y-1">
                  {p.highlights.map((h) => (
                    <li key={h}>{linkify(h)}</li>
                  ))}
                </ul>
              )}
              {p.keywords && <Tags items={p.keywords} />}
            </article>
          ))}
        </Section>

        <Section title="Education">
          {education.map((e) => (
            <div key={e.institution} className="flex flex-wrap justify-between gap-2 mb-2">
              <span>
                {e.studyType} in {e.area}, {e.institution}
              </span>
              <span className="text-gray-500 text-sm">
                {e.startDate} – {e.endDate}
              </span>
            </div>
          ))}
        </Section>

        <Section title="Writing and talks">
          <ul className="space-y-2">
            {publications.map((p) => (
              <li key={p.name}>
                {p.url ? <a href={p.url} className="text-blue-400 hover:underline">{p.name}</a> : p.name}
                <span className="text-gray-500 text-sm">
                  {" "}· {p.publisher}
                  {p.releaseDate && ` · ${p.releaseDate.slice(0, 7)}`}
                </span>
                {p.summary && <p className="text-gray-400 text-sm">{p.summary}</p>}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          {skills.map((s) => (
            <div key={s.name} className="mb-3">
              <h3 className="font-semibold text-sm">{s.name}</h3>
              <Tags items={s.keywords} />
            </div>
          ))}
        </Section>

        <Section title="Languages">
          <p className="text-gray-300">
            {languages.map((l) => `${l.language} (${l.fluency})`).join(", ")}
          </p>
        </Section>
      </main>
    </div>
  );
}
