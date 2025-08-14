import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MagicButton from "@/components/ui/MagicButton";

// Mock next/link
vi.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({
      children,
      href,
      ...props
    }: {
      children: React.ReactNode;
      href: string;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

describe("MagicButton Component", () => {
  describe("Button variant", () => {
    it("renders button with correct content", () => {
      const mockOnClick = vi.fn();
      render(
        <MagicButton as="button" variant="primary" onClick={mockOnClick}>
          Click me
        </MagicButton>
      );

      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("calls onClick when button is clicked", () => {
      const mockOnClick = vi.fn();
      render(
        <MagicButton as="button" variant="primary" onClick={mockOnClick}>
          Click me
        </MagicButton>
      );

      const button = screen.getByText("Click me");
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("applies correct variant class", () => {
      const mockOnClick = vi.fn();
      render(
        <MagicButton as="button" variant="secondary" onClick={mockOnClick}>
          Click me
        </MagicButton>
      );

      const btn = screen.getByText("Click me").closest("button")!;
      expect(btn.className).toContain("secondary");
    });

    it("can be disabled", () => {
      const mockOnClick = vi.fn();
      render(
        <MagicButton
          as="button"
          variant="primary"
          onClick={mockOnClick}
          disabled
        >
          Click me
        </MagicButton>
      );

      const button = screen.getByText("Click me").closest("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Link variant", () => {
    it("renders link with correct href", () => {
      render(
        <MagicButton as="link" variant="primary" href="/test">
          Go to test
        </MagicButton>
      );

      const link = screen.getByText("Go to test").closest("a");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("applies correct variant class to link", () => {
      render(
        <MagicButton as="link" variant="secondary" href="/test">
          Go to test
        </MagicButton>
      );

      const link = screen.getByText("Go to test").closest("a")!;
      expect(link.className).toContain("secondary");
    });
  });

  describe("Sound integration", () => {
    it("handles mouse events without errors", () => {
      const mockOnClick = vi.fn();
      render(
        <MagicButton as="button" variant="primary" onClick={mockOnClick}>
          Hover me
        </MagicButton>
      );

      const button = screen.getByText("Hover me").closest("button");

      // These should not throw errors
      fireEvent.mouseEnter(button!);
      fireEvent.keyDown(button!);
      fireEvent.mouseDown(button!);

      expect(mockOnClick).not.toHaveBeenCalled(); // Only click should trigger onClick
    });

    it("can disable sound with enableOnClickSound=false", () => {
      const mockOnClick = vi.fn();
      render(
        <MagicButton
          as="button"
          variant="primary"
          onClick={mockOnClick}
          enableOnClickSound={false}
        >
          Silent button
        </MagicButton>
      );

      const button = screen.getByText("Silent button").closest("button");
      fireEvent.mouseDown(button!);

      // Should not throw error
      expect(button).toBeInTheDocument();
    });
  });
});
