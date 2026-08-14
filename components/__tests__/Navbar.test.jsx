import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("mounts without crashing", () => {
    render(<Navbar />);
  });

  it("renders as a banner landmark with the cinegrid logo text", () => {
    const { container } = render(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(container.textContent).toContain("cinegrid");
  });
});