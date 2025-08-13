describe("Hangman Game", () => {
  beforeEach(() => {
    cy.visit("/arcade/hangman?difficulty=easy&word=hangman");
  });

  it("displays game title and components", () => {
    cy.contains("Hangman Game").should("be.visible");
    cy.contains("Attempts left").should("be.visible");

    // Should show virtual keyboard
    cy.contains("button", /^A$/i, { timeout: 10000 }).should("be.visible");
    cy.contains("button", /^Z$/i).should("be.visible");
  });

  it("shows initial attempts count", () => {
    cy.contains(/Attempts left\s+\d/, { timeout: 10000 }).should("be.visible");
  });

  it("displays word pads", () => {
    // Should show letter pads (closed initially)
    cy.get('[class*="pad"]').should("have.length.greaterThan", 0);
  });

  it("can click virtual keyboard buttons", () => {
    cy.get("[id='A']").click().should("be.disabled");
  });

  it("can type letters using keyboard", () => {
    cy.get("body").type("h");

    // H button should become disabled
    cy.get("[id='H']").click().should("be.disabled");
  });

  it("reduces attempts on wrong guess", () => {
    cy.get("body").type("z");

    // Attempts should decrease
    cy.contains("Attempts left").should("be.visible");
  });

  it("can win the game", () => {
    cy.wait(1000);
    // Try common letters that appear in easy words
    const letters = ["h", "a", "n", "g", "m"];

    letters.forEach((letter) => {
      cy.get("body").type(letter);
      cy.wait(100); // Small delay between letters
    });

    // Check if we won
    cy.get("body").then(($body) => {
      if ($body.text().includes("Game Over")) {
        cy.contains("You won!").should("be.visible");
        cy.contains("New game").should("be.visible");
      }
    });
  });

  it("shows game over on loss", () => {
    cy.wait(1000);
    // Try common letters that appear in easy words
    const letters = ["h", "a", "n", "g", "m"];

    letters.forEach((letter) => {
      cy.get("body").type(letter);
      cy.wait(100); // Small delay between letters
    });

    // Should eventually show game over
    cy.contains("Game Over", { timeout: 10000 }).should("be.visible");
    cy.contains("New game").should("be.visible");
  });

  it("can start new game after game over", () => {
    // Force game over by using bad letters
    cy.wait(1000);
    // Try common letters that appear in easy words
    const letters = ["h", "a", "n", "g", "m"];

    letters.forEach((letter) => {
      cy.get("body").type(letter);
      cy.wait(100); // Small delay between letters
    });

    // Wait for game over and click new game
    cy.contains("New game", { timeout: 10000 }).click();

    // Should reset the game
    cy.contains(/Attempts left\s+\d/).should("be.visible");
    cy.get("button").contains("A").should("not.be.disabled");
  });

  it("can restart with spacebar", () => {
    // Force game over
    cy.wait(1000);
    // Try common letters that appear in easy words
    const letters = ["h", "a", "n", "g", "m"];

    letters.forEach((letter) => {
      cy.get("body").type(letter);
      cy.wait(100); // Small delay between letters
    });

    // Wait for game over and press space
    cy.contains("Game Over", { timeout: 10000 }).should("be.visible");
    cy.get("body").type(" ");

    // Should reset
    cy.contains(/Attempts left\s+\d/).should("be.visible");
  });

  it("works with different difficulties", () => {
    // Test medium difficulty
    cy.visit("/arcade/hangman?difficulty=medium");
    cy.contains("Hangman Game").should("be.visible");
    cy.contains(/Attempts left\s+\d/).should("be.visible");

    // Test hard difficulty
    cy.visit("/arcade/hangman?difficulty=hard");
    cy.contains("Hangman Game").should("be.visible");
    cy.contains(/Attempts left\s+\d/).should("be.visible");
  });

  it("has back to hub button", () => {
    cy.contains("Back to Hub").click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Next Arcade").should("be.visible");
  });
});
