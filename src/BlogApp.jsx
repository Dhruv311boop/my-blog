import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function BlogApp() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(false);

  const posts = [
    {
      id: 1,
      title: "TurionAI: Academic Search Finally Simplified",
      date: "July 22, 2025",
      views: 378,
      excerpt:
        "TurionAI is a powerful multi-agent system designed to help students with all types of academic queries.",
      content: `## TurionAI\n\nTurionAI is a powerful multi-agent system designed to help students with all types of academic queries. It uses a combination of retrieval and reasoning to produce helpful responses.\n\n- Fast\n- Accurate\n- Student-friendly\n\n> Example usage: \`turion search 'linear algebra'\`\n\nRead more to explore how it works.`,
      tags: ["AI", "Education"],
    },
    {
      id: 2,
      title: "How I Accidentally Hacked CBSE Results: A Prank That Went Viral",
      date: "January 27, 2025",
      views: 1055,
      excerpt:
        "A personal story about a prank that unexpectedly reached thousands of people—lessons learned and apologies.",
      content: `## The Prank\n\nThis started as a silly script. I didn't expect it to go viral...\n\n**Lessons:**\n1. Responsibility\n2. Think before you push to production\n\n(Names omitted)`,
      tags: ["Stories", "Ethics"],
    },
    {
      id: 3,
      title: "Who Is Sujal? Why I Started This Blog?",
      date: "December 7, 2024",
      views: 1292,
      excerpt: "A short intro: who I am, why I write, and what readers can expect.",
      content: `## Who is Sujal?\n\nHello, world! I'm a student and a tinkerer. I started this blog to document experiments and share ideas.\n\nThanks for reading!`,
      tags: ["About"],
    },
  ];

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={dark ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-white text-gray-900"}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Sujal Unfolded</h1>
            <p className="text-sm opacity-70">Thoughts, stories and experiments.</p>
          </div>

          <div className="flex items-center gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, tags..."
              className="border rounded px-3 py-1 text-sm"
            />
            <button
              onClick={() => setDark((d) => !d)}
              className="border rounded px-3 py-1 text-sm"
            >
              Toggle theme
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <section className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Latest Blog Posts</h2>
            <div className="space-y-6">
              {filtered.map((p) => (
                <article key={p.id} className="p-4 border rounded">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold cursor-pointer" onClick={() => setSelected(p)}>{p.title}</h3>
                      <p className="text-sm opacity-70 mt-1">{p.date} • {p.views} views</p>
                    </div>
                    <div className="text-sm opacity-80">
                      {p.tags.map((t) => (
                        <span key={t} className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">{t}</span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 opacity-80">{p.excerpt}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="p-4 border rounded">
              <h4 className="font-semibold">About</h4>
              <p className="text-sm mt-2 opacity-80">Hi, I'm a student and tinkerer. I write about tech, life and experiments.</p>
            </div>

            <div className="p-4 border rounded">
              <h4 className="font-semibold">Tags</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {[...new Set(posts.flatMap((p) => p.tags))].map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded">
              <h4 className="font-semibold">Subscribe</h4>
              <p className="text-sm mt-2 opacity-80">Get new posts by email (stub)</p>
              <div className="mt-3 flex gap-2">
                <input placeholder="Email" className="flex-1 border rounded px-2 py-1 text-sm" />
                <button className="px-3 py-1 border rounded text-sm">Join</button>
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-12 text-center opacity-70 text-sm">© {new Date().getFullYear()} Sujal Unfolded. All rights reserved.</footer>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <div className="max-w-3xl w-full bg-white text-black p-6 rounded shadow-lg overflow-auto max-h-[90vh]">
            <button onClick={() => setSelected(null)} className="mb-4">Close</button>
            <h2 className="text-2xl font-bold">{selected.title}</h2>
            <p className="text-sm opacity-70">{selected.date} • {selected.views} views</p>
            <div className="prose mt-4">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} children={selected.content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}