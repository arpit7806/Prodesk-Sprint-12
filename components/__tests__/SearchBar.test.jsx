import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar";
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  mockPush.mockClear();
});

describe("SearchBar", () => {
  it("mounts without crashing", () => {
    render(<SearchBar />);
  });

  it("renders an empty input with the search placeholder by default", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("search movies...");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("updates the input's displayed value as the user types", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("search movies...");
    await user.type(input, "dune");

    expect(input).toHaveValue("dune");
  });

  it("shows a clear button once text is entered, and clicking it empties the input", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("search movies...");
    expect(screen.queryByRole("button", { name: "✕" })).not.toBeInTheDocument();

    await user.type(input, "dune");
    const clearButton = screen.getByRole("button", { name: "✕" });
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);

    expect(input).toHaveValue("");
    expect(screen.queryByRole("button", { name: "✕" })).not.toBeInTheDocument();
  });
});