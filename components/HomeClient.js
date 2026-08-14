"use client";

import { Suspense } from "react";
import { useMovies } from "@/hooks/useMovies";
import { useFavorites } from "@/hooks/useFavorites";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";

function HomeClient({ initialMovies, initialTotalPages, mode, query }) {
  const { movies, loadingMore, hasMore, loadMore } = useMovies({
    initialMovies,
    initialTotalPages,
    mode,
    query,
  });

  const { favorites, toggleFavorite } = useFavorites();

  return (
    <>
      <div className="search-section">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
      </div>

      <MovieGrid
        movies={movies}
        loading={false}
        loadingMore={loadingMore}
        error={null}
        mode={mode}
        activeQuery={query}
        hasMore={hasMore}
        onLoadMore={loadMore}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}

export default HomeClient;
