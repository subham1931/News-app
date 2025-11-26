import { render, screen, fireEvent } from "@testing-library/react";
import NewsList from "@/components/NewsList";

jest.mock("@/context/ThemeContext", () => ({
  useTheme: () => ({ theme: "light" })
}));

const mockArticles = [
  { title: "Test Article", url: "http://example.com", urlToImage: "" },
];

test("shows loader", () => {
  render(<NewsList articles={[]} loading={true} />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("renders articles", () => {
  render(<NewsList articles={mockArticles} loading={false} />);
  expect(screen.getByText("Test Article")).toBeInTheDocument();
});

test("pagination works", () => {
  const mock = jest.fn();

  render(
    <NewsList
      articles={mockArticles}
      page={2}
      pageSize={10}
      total={30}
      loading={false}
      onPageChange={mock}
    />
  );

  fireEvent.click(screen.getByText("Prev"));
  expect(mock).toHaveBeenCalledWith(1);
});
