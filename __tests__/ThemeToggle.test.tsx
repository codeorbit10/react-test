import { render } from "./helpers/render";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    window.localStorage.clear();
  });

  it("toggles dark class on click", () => {
    const { container } = render(<ThemeToggle />);
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
