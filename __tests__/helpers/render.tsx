import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

export const render = (ui: React.ReactElement) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });

  return {
    container,
    rerender: (nextUi: React.ReactElement) =>
      act(() => {
        root.render(nextUi);
      }),
    unmount: () =>
      act(() => {
        root.unmount();
        container.remove();
      }),
  };
};
