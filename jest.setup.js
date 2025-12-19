// Enable act() warnings support for React 19 tests.
global.IS_REACT_ACT_ENVIRONMENT = true;

// Provide matchMedia for components that read prefers-color-scheme.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
