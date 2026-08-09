/**
 * Renders one or more schema.org nodes as a JSON-LD script tag.
 *
 * Server component — the markup has to be in the initial HTML for a crawler to
 * see it, so never call this from inside a client component or a Suspense
 * boundary that renders a fallback first.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
