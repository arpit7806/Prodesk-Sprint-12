"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export function useMovies({ initialMovies, initialTotalPages, mode, query }) {
  const [movies, setMovies] = useState(initialMovies);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const modeRef = useRef(mode);
  const queryRef = useRef(query);

  useEffect(() => {
    modeRef.current = mode;
    queryRef.current = query;
    setMovies(initialMovies);
    setPage(1);
    setTotalPages(initialTotalPages);
  }, [initialMovies, initialTotalPages, mode, query]);

  const loadMore = useCallback(async () => {
    if (loadingMore || page >= totalPages) return;
    const nextPage = page + 1;
    const currentMode = modeRef.current;
    const currentQuery = queryRef.current;

    try {
      setLoadingMore(true);
      const res = await fetch(
        `/api/movies?mode=${currentMode}&page=${nextPage}&query=${encodeURIComponent(currentQuery || "")}`
      );
      const data = await res.json();
      setMovies((prev) => [...prev, ...(data.results || [])]);
      setPage(nextPage);
    } catch (err) {
      console.error("failed to load next page:", err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, page, totalPages]);

  const hasMore = page < totalPages;

  return { movies, loadingMore, hasMore, loadMore };
}