import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import MovieCard from "@/components/MovieCard";

const baseMovie = {
  id: 1,
  title: "Dune: Part Two",
  release_date: "2024-03-01",
  vote_average: 8.5,
  poster_path: "/poster123.jpg",
};

describe("MovieCard", () => {
  it("mounts without crashing", () => {
    render(<MovieCard movie={baseMovie} isFavorite={false} onToggleFavorite={() => {}} />);
  });

  it("renders the movie's title, year, and rating from props", () => {
    render(<MovieCard movie={baseMovie} isFavorite={false} onToggleFavorite={() => {}} />);

    expect(screen.getByRole("heading", { name: "Dune: Part Two" })).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText(/8\.5/)).toBeInTheDocument();
  });

  it("shows the poster image when poster_path exists", () => {
    render(<MovieCard movie={baseMovie} isFavorite={false} onToggleFavorite={() => {}} />);
    expect(screen.getByRole("img", { name: "Dune: Part Two poster" })).toBeInTheDocument();
  });

  it("falls back to placeholder content when poster, rating, and date are missing", () => {
    const bareMovie = { id: 2, title: "Untitled Project" };
    render(<MovieCard movie={bareMovie} isFavorite={false} onToggleFavorite={() => {}} />);

    expect(screen.getByText("no image")).toBeInTheDocument();
    expect(screen.getByText(/N\/A/)).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("calls onToggleFavorite with the movie when the heart is clicked", async () => {
    const user = userEvent.setup();
    const onToggleFavorite = jest.fn();
    render(<MovieCard movie={baseMovie} isFavorite={false} onToggleFavorite={onToggleFavorite} />);

    await user.click(screen.getByRole("button", { name: "add to favorites" }));

    expect(onToggleFavorite).toHaveBeenCalledWith(baseMovie);
    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it("flips the heart icon and label when a click actually mutates isFavorite (controlled component pattern)", async () => {
    const user = userEvent.setup();

    // MovieCard doesn't own favorite state itself — the parent does, and passes
    // isFavorite back down as a prop. This tiny wrapper mimics that real relationship
    // so we can prove the DOM actually updates after a click, not just that a
    // callback fired in isolation.
    function FavoriteWrapper() {
      const [isFavorite, setIsFavorite] = useState(false);
      return (
        <MovieCard
          movie={baseMovie}
          isFavorite={isFavorite}
          onToggleFavorite={() => setIsFavorite((prev) => !prev)}
        />
      );
    }

    render(<FavoriteWrapper />);

    const heartButton = screen.getByRole("button", { name: "add to favorites" });
    expect(heartButton).toHaveTextContent("♡");

    await user.click(heartButton);

    expect(screen.getByRole("button", { name: "remove from favorites" })).toHaveTextContent("♥");
  });
});