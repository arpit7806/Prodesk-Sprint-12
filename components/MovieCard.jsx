"use client";

import { IMG_BASE } from "@/lib/tmdb";
import "./MovieCard.css";

function getYear(releaseDate) {
  if (!releaseDate) return "—";
  return releaseDate.slice(0, 4);
}

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const posterUrl = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  function handleHeartClick(e) {
    e.stopPropagation();
    onToggleFavorite(movie);
  }

  return (
    <div className="movie-card glass-panel">
      <div className="poster-wrap">
        {posterUrl ? (
          <img src={posterUrl} alt={`${movie.title} poster`} loading="lazy" className="poster-img" />
        ) : (
          <div className="poster-fallback">no image</div>
        )}

        <span className="rating-badge">★ {rating}</span>

        <button
          className={`heart-btn ${isFavorite ? "is-favorite" : ""}`}
          onClick={handleHeartClick}
          aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="card-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{getYear(movie.release_date)}</p>
      </div>
    </div>
  );
}

export default MovieCard;
