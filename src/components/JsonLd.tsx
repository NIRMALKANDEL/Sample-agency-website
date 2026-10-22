type Json = Record<string, unknown>;

/** Renders schema.org structured data. `<` is escaped so content can't break out of the tag. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
