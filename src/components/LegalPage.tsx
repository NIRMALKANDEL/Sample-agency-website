import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export const LEGAL_UPDATED = "22 October 2026";

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ name: title, path }]}>
        <p className="mt-6 text-muted">Last updated {LEGAL_UPDATED}</p>
      </PageHero>
      <article className="container-x">
        <div className="prose">{children}</div>
      </article>
    </>
  );
}
