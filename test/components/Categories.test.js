import { render, screen, fireEvent } from "@testing-library/react";
import Categories from "@/components/Categories";

jest.mock("@/context/ThemeContext", () => ({
  useTheme: () => ({ theme: "light" })
}));

test("renders categories", () => {
  render(<Categories selected="general" onSelect={() => {}} />);
  expect(screen.getByText("business")).toBeInTheDocument();
});

test("calls onSelect when clicked", () => {
  const mock = jest.fn();
  render(<Categories selected="general" onSelect={mock} />);
  fireEvent.click(screen.getByText("sports"));
  expect(mock).toHaveBeenCalledWith("sports");
});
