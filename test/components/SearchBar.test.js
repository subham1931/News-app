import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";

jest.mock("@/context/ThemeContext", () => ({
  useTheme: () => ({ theme: "light" })
}));

describe("SearchBar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders input + search button", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search news...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("shows history when focused", () => {
    localStorage.setItem("search_history", JSON.stringify(["apple"]));

    render(<SearchBar value="" onChange={() => {}} />);

    fireEvent.focus(screen.getByPlaceholderText("Search news..."));
    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
    expect(screen.getByText("apple")).toBeInTheDocument();
  });

  test("clicking search triggers onChange", () => {
    const mockFn = jest.fn();

    render(<SearchBar value="" onChange={mockFn} />);

    fireEvent.change(screen.getByPlaceholderText("Search news..."), {
      target: { value: "tesla" },
    });

    fireEvent.click(screen.getByText("Search"));

    expect(mockFn).toHaveBeenCalledWith("tesla");
  });
});