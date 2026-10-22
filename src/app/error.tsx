"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center pb-20 pt-32">
      <h1 className="display h1 max-w-3xl text-balance">This page failed to load.</h1>
      <p className="lede mt-5">Something went wrong on our side. Try again, or head back to the homepage.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Go to the homepage
        </Link>
      </div>
    </section>
  );
}
