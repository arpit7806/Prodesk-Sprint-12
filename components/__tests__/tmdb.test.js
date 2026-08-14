describe("tmdb lib", () => {
  const originalEnv = process.env;
  let getPopularMovies, searchMovies;

  beforeEach(() => {
    // BASE_URL/API_KEY are read at module load time (top-level const), so the env
    // vars have to be set *before* the module is required — resetModules() forces
    // a fresh evaluation instead of reusing whatever was cached from an earlier import.
    jest.resetModules();
    process.env = {
      ...originalEnv,
      TMDB_BASE_URL: "https://api.themoviedb.org/3",
      TMDB_API_KEY: "test-api-key",
    };
    ({ getPopularMovies, searchMovies } = require("@/lib/tmdb"));
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("calls the popular-movies endpoint with the api key and page params — no real network involved", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [{ id: 1, title: "Dune: Part Two" }] }),
    });

    const data = await getPopularMovies(2);

    const calledUrl = new URL(global.fetch.mock.calls[0][0]);
    expect(calledUrl.pathname).toBe("/3/movie/popular");
    expect(calledUrl.searchParams.get("api_key")).toBe("test-api-key");
    expect(calledUrl.searchParams.get("page")).toBe("2");
    expect(data.results[0].title).toBe("Dune: Part Two");
  });

  it("calls the search endpoint with the query param set", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    await searchMovies("dune", 1);

    const calledUrl = new URL(global.fetch.mock.calls[0][0]);
    expect(calledUrl.pathname).toBe("/3/search/movie");
    expect(calledUrl.searchParams.get("query")).toBe("dune");
  });

  it("throws the API's status_message when the response isn't ok", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ status_message: "Invalid API key" }),
    });

    await expect(getPopularMovies()).rejects.toThrow("Invalid API key");
  });

  it("falls back to a generic error when the failed response has no JSON body", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error("not json");
      },
    });

    await expect(getPopularMovies()).rejects.toThrow("TMDB request failed (500)");
  });
});