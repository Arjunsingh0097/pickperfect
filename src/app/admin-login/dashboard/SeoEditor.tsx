"use client";

import { useState, useEffect } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

type SeoConfig = {
  title: string;
  metaDescription: string;
  slug: string;
  jsonLdSchema: string;
};

export function SeoEditor() {
  const [config, setConfig] = useState<SeoConfig>({
    title: "",
    metaDescription: "",
    slug: "",
    jsonLdSchema: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch(`${BASE}/api/admin/seo`)
      .then((r) => r.json())
      .then((data) => {
        let schemaStr = data.jsonLdSchema ?? "";
        if (typeof schemaStr === "string" && schemaStr.trim()) {
          try {
            schemaStr = JSON.stringify(JSON.parse(schemaStr), null, 2);
          } catch {
            // keep as-is if not valid JSON
          }
        } else {
          schemaStr = JSON.stringify(data.jsonLdSchema ?? {}, null, 2);
        }
        setConfig({
          title: data.title ?? "",
          metaDescription: data.metaDescription ?? "",
          slug: data.slug ?? "",
          jsonLdSchema: schemaStr,
        });
      })
      .catch(() => setMessage({ type: "error", text: "Failed to load SEO config" }))
      .finally(() => setLoading(false));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    let jsonStr = config.jsonLdSchema.trim();
    if (jsonStr) {
      try {
        JSON.parse(jsonStr);
      } catch {
        setMessage({ type: "error", text: "JSON-LD schema is invalid JSON" });
        setSaving(false);
        return;
      }
    }
    fetch(`${BASE}/api/admin/seo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: config.title,
        metaDescription: config.metaDescription,
        slug: config.slug,
        jsonLdSchema: config.jsonLdSchema,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setMessage({ type: "error", text: data.error });
          return;
        }
        setMessage({ type: "success", text: "SEO settings saved." });
      })
      .catch(() => setMessage({ type: "error", text: "Failed to save" }))
      .finally(() => setSaving(false));
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-mint bg-white p-6">
        <p className="text-gray-500">Loading SEO settings…</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-mint bg-white p-6 shadow">
      <h2 className="text-xl font-medium text-deep mb-1">Landing page SEO</h2>
      <p className="text-sm text-gray-600 mb-6">
        Edit meta title, description, slug, and JSON-LD schema. Changes apply to the main landing page.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="seo-title" className="block text-sm font-medium text-deep mb-1">
            Meta title
          </label>
          <input
            id="seo-title"
            type="text"
            value={config.title}
            onChange={(e) => setConfig((c) => ({ ...c, title: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-deep focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            placeholder="e.g. Compare Removalist Quotes | Pick Perfect"
          />
        </div>

        <div>
          <label htmlFor="seo-description" className="block text-sm font-medium text-deep mb-1">
            Meta description
          </label>
          <textarea
            id="seo-description"
            rows={3}
            value={config.metaDescription}
            onChange={(e) => setConfig((c) => ({ ...c, metaDescription: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-deep focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            placeholder="Short description for search results and social sharing."
          />
        </div>

        <div>
          <label htmlFor="seo-slug" className="block text-sm font-medium text-deep mb-1">
            Slug
          </label>
          <input
            id="seo-slug"
            type="text"
            value={config.slug}
            onChange={(e) => setConfig((c) => ({ ...c, slug: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-deep focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            placeholder="e.g. compare-quotes"
          />
          <p className="mt-1 text-xs text-gray-500">
            Used for canonical URL: https://www.pickperfect.com/[slug]
          </p>
        </div>

        <div>
          <label htmlFor="seo-json" className="block text-sm font-medium text-deep mb-1">
            JSON-LD schema
          </label>
          <textarea
            id="seo-json"
            rows={14}
            value={config.jsonLdSchema}
            onChange={(e) => setConfig((c) => ({ ...c, jsonLdSchema: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm text-deep focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            placeholder='Paste valid JSON-LD, e.g. {"@context":"https://schema.org", ...}'
            spellCheck={false}
          />
          <p className="mt-1 text-xs text-gray-500">
            Paste your schema in JSON format. Invalid JSON will be rejected on save.
          </p>
        </div>

        {message && (
          <p
            className={
              message.type === "success"
                ? "text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2"
                : "text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2"
            }
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-teal px-4 py-2.5 font-medium text-white hover:bg-teal-dark focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save SEO settings"}
        </button>
      </form>
    </div>
  );
}
