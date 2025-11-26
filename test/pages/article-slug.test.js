import { render, screen } from "@testing-library/react";
import ArticlePage from "@/pages/article/[slug]";

jest.mock("@/context/ThemeContext", () => ({
  useTheme: () => ({ theme: "light" })
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
  }),
}));


test("shows unavailable message when no article", () => {
  render(<ArticlePage article={null} />);
  expect(screen.getByText("Article unavailable")).toBeInTheDocument();
});

test("renders article details", () => {
  render(
    <ArticlePage
      article={{
        title: "Article Test",
        url: "#",
        source: { name: "CNN" },
      }}
    />
  );

  expect(screen.getByText("Article Test")).toBeInTheDocument();
  expect(screen.getByText("Source: CNN")).toBeInTheDocument();
});
