import * as ReactTestUtils from "react-dom/test-utils";
import { render } from "./helpers/render";
import { SearchInput } from "@/components/ui/SearchInput";

describe("SearchInput", () => {
  it("renders placeholder and value", () => {
    const { container } = render(
      <SearchInput value="hello" onChange={() => {}} placeholder="Filter users" />,
    );

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe("Filter users");
    expect(input.value).toBe("hello");
  });
});
