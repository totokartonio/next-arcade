/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Select a game and difficulty
       */
      selectGame(game: string, difficulty: string): Chainable<Element>;
      /**
       * Wait for game to load
       */
      waitForGameLoad(): Chainable<Element>;
      /**
       * Type a letter in Hangman
       */
      typeHangmanLetter(letter: string): Chainable<Element>;
      /**
       * Move snake using keyboard
       */
      moveSnake(
        direction: "up" | "down" | "left" | "right"
      ): Chainable<Element>;
      /**
       * Click card in Matching Pairs
       */
      clickCard(cardIndex: number): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("selectGame", (game: string, difficulty: string) => {
  // Click on game selector
  cy.get(`[data-id="${game}"]`).should("be.visible").click();

  // Select difficulty
  cy.contains(difficulty).click();

  // Wait for navigation
  cy.url().should("include", `/arcade/${game}`);
  cy.url().should("include", `difficulty=${difficulty}`);
});

Cypress.Commands.add("waitForGameLoad", () => {
  // Wait for game content to be visible
  cy.get('[data-testid="game-content"]').should("be.visible");
});

Cypress.Commands.add("typeHangmanLetter", (letter: string) => {
  cy.get("body").type(letter);
});

Cypress.Commands.add(
  "moveSnake",
  (direction: "up" | "down" | "left" | "right") => {
    const keyMap = {
      up: "{upArrow}",
      down: "{downArrow}",
      left: "{leftArrow}",
      right: "{rightArrow}",
    };

    cy.get("body").type(keyMap[direction]);
  }
);

Cypress.Commands.add("clickCard", (cardIndex: number) => {
  cy.get('[data-testid="memory-card"]').eq(cardIndex).click();
});

// Disable sound for all tests
Cypress.on("window:before:load", (win) => {
  // Mock use-sound to prevent audio issues
  win.HTMLMediaElement.prototype.play = () => Promise.resolve();
  win.HTMLMediaElement.prototype.pause = () => {};
});

export {};
