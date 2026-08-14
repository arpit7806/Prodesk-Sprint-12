const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;
export const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMG_URL;

async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.status_message || `TMDB request failed (${res.status})`);
  }

  return res.json();
}

export function getPopularMovies(page = 1) {
  return tmdbFetch("/movie/popular", { page });
}

export function searchMovies(query, page = 1) {
  return tmdbFetch("/search/movie", { query, page });
}
