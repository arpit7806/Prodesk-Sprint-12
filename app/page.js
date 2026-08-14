import { getPopularMovies } from "@/lib/tmdb";
import HomeClient from "@/components/HomeClient";

export default async function HomePage() {
  const data = await getPopularMovies(1);

  return (
    <main className="app-shell">
      <HomeClient
        initialMovies={data.results || []}
        initialTotalPages={data.total_pages || 1}
        mode="popular"
        query=""
      />
    </main>
  );
}
