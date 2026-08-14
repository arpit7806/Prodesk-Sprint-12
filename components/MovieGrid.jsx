"use client";

import { useCallback, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import "./MovieGrid.css";

function MovieGrid({
  movies,
  loading,
  loadingMore,
  error,
  mode,
  activeQuery,
  hasMore,
  onLoadMore,
  favorites,
  onToggleFavorite,
}) {
  const observerRef = useRef(null);
  const stateRef = useRef({ hasMore, loadingMore, onLoadMore });

  useEffect(() => {
    stateRef.current = { hasMore, loadingMore, onLoadMore };
  });

  const sentinelCallbackRef = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const { hasMore, loadingMore, onLoadMore } = stateRef.current;
        if (entry.isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      },
      { rootMargin: "300px" }
    );

    observerRef.current.observe(node);
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="grid-status">
        <div className="spinner" />
        <p>fetching movies…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid-status">
        <p className="error-text">something broke: {error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="grid-status">
        <p>{mode === "search" ? `no results for "${activeQuery}"` : "nothing to show right now"}</p>
      </div>
    );
  }

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelCallbackRef} className="scroll-sentinel">
          {loadingMore && <div className="spinner spinner-sm" />}
        </div>
      )}
    </>
  );
}

export default MovieGrid;
