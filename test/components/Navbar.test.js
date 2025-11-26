import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

jest.mock("@/context/ThemeContext", () => ({
  useTheme: () => ({ theme: "light", toggleTheme: jest.fn() })
}));

test("renders navbar", () => {
  render(<Navbar searchValue="" onSearchChange={() => {}} />);
  expect(screen.getByText("Top Headlines")).toBeInTheDocument();
});
