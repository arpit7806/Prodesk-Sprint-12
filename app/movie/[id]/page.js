// TODO: build this out — Sprint 8 didn't include a movie detail component in the
// code you shared with me. This is a placeholder dynamic route so /movie/[id]
// resolves; wire up a real TMDB "movie details" fetch here when ready.

import { notFound } from "next/navigation";

export default async function MovieDetailPage({ params }) {
  const { id } = await params;

  if (!id) return notFound();

  return (
    <main className="app-shell">
      <h1 className="page-title">Movie #{id}</h1>
      <p>Movie detail page — build this out next.</p>
    </main>
  );
}
