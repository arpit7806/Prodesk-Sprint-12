import { NextResponse } from "next/server";
import { getPopularMovies, searchMovies } from "@/lib/tmdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "popular";
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  try {
    const data =
      mode === "search" ? await searchMovies(query, page) : await getPopularMovies(page);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
