import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/pages/index";
import { ThemeProvider } from "@/context/ThemeContext";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        articles: [],
        totalResults: 0,
      }),
  })
);

const renderHome = () =>
  render(
    <ThemeProvider>
      <Home initialArticles={[]} initialTotal={0} />
    </ThemeProvider>
  );

describe("Home Page", () => {
  test("renders SSR layout", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Top Headlines")).toBeInTheDocument();
    }); 
  });

  test("loads and shows 'No articles found'", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("No articles found.")).toBeInTheDocument();
    });
  });
});
