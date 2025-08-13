import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock use-sound hook
vi.mock("use-sound", () => {
  return {
    __esModule: true,
    default: () => [vi.fn(), { sound: null }],
  };
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: "/",
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue("easy"),
  }),
  usePathname: () => "/",
}));

// Mock window.crypto for tests
Object.defineProperty(window, "crypto", {
  value: {
    randomUUID: () => Math.random().toString(36),
  },
});

// Mock canvas context
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  fillStyle: "",
});

// Suppress console warnings in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
};
