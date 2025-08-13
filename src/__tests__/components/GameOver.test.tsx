import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GameOver from "@/components/GameOver";

describe("GameOver Component", () => {
  it("renders game over title", () => {
    const mockOnClick = vi.fn();
    render(<GameOver isWon={false} onClick={mockOnClick} />);

    expect(screen.getByText("Game Over")).toBeInTheDocument();
  });

  it("shows win message when game is won", () => {
    const mockOnClick = vi.fn();
    render(<GameOver isWon={true} onClick={mockOnClick} />);

    expect(screen.getByText("You won!")).toBeInTheDocument();
  });

  it("shows custom message when provided", () => {
    const mockOnClick = vi.fn();
    const customMessage = "The word was HELLO";

    render(
      <GameOver isWon={false} message={customMessage} onClick={mockOnClick} />
    );

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("calls onClick when new game button is clicked", () => {
    const mockOnClick = vi.fn();
    render(<GameOver isWon={false} onClick={mockOnClick} />);

    const newGameButton = screen.getByText("New game");
    fireEvent.click(newGameButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("does not show win message when game is lost", () => {
    const mockOnClick = vi.fn();
    render(<GameOver isWon={false} onClick={mockOnClick} />);

    expect(screen.queryByText("You won!")).not.toBeInTheDocument();
  });
});
