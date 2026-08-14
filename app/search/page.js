import { searchMovies } from "@/lib/tmdb";
import HomeClient from "@/components/HomeClient";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q || "";

  const data = query ? await searchMovies(query, 1) : { results: [], total_pages: 1 };

  return (
    <main className="app-shell">
      <HomeClient
        initialMovies={data.results || []}
        initialTotalPages={data.total_pages || 1}
        mode="search"
        query={query}
      />
    </main>
  );
}
