describe("Snake Game", () => {
  beforeEach(() => {
    cy.visit("/arcade/snake?difficulty=easy");
  });

  it("displays game title and canvas", () => {
    cy.contains("Snake Game").should("be.visible");
    cy.get("canvas", { timeout: 10000 }).should("be.visible");
    cy.contains("Press any button to start the game").should("be.visible");
  });

  it("starts game when pressing arrow key", () => {
    cy.get("canvas", { timeout: 10000 }).click();
  });

  it("snake moves with arrow keys", () => {
    // Start the game
    cy.get("body").type("{rightArrow}");
    cy.wait(200);

    // Change direction
    cy.get("body").type("{upArrow}");
    cy.wait(200);

    cy.get("body").type("{leftArrow}");
    cy.wait(200);

    cy.get("body").type("{downArrow}");

    // Game should still be running (no game over)
    cy.contains("Game Over").should("not.exist");
  });

  it("snake moves with WASD keys", () => {
    // Start the game
    cy.get("body").type("d"); // right
    cy.wait(200);

    cy.get("body").type("w"); // up
    cy.wait(200);

    cy.get("body").type("a"); // left
    cy.wait(200);

    cy.get("body").type("s"); // down

    // Game should still be running
    cy.contains("Game Over").should("not.exist");
  });

  // shows mobile controls on mobile viewport
  it("shows mobile controls on mobile viewport", () => {
    cy.viewport(375, 667);
    cy.visit("/arcade/snake?difficulty=easy", {
      onBeforeLoad(win) {
        // make "ontouchstart" appear on window
        (win as any).ontouchstart = () => {};
        // optionally also spoof a mobile UA
        Object.defineProperty(win.navigator, "userAgent", {
          value:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
          configurable: true,
        });
      },
    });

    cy.get('[data-testid="mobile-controls"], [class*="mobileControls"]', {
      timeout: 10000,
    }).should("be.visible");

    cy.contains("button", "↑").should("be.visible");
    cy.contains("button", "↓").should("be.visible");
    cy.contains("button", "←").should("be.visible");
    cy.contains("button", "→").should("be.visible");
  });

  // mobile controls work
  it("mobile controls work", () => {
    cy.viewport(375, 667);
    cy.visit("/arcade/snake?difficulty=easy", {
      onBeforeLoad(win) {
        (win as any).ontouchstart = () => {};
        Object.defineProperty(win.navigator, "userAgent", {
          value:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
          configurable: true,
        });
      },
    });

    cy.contains("button", "→", { timeout: 10000 }).click();
    cy.wait(200);
    cy.contains("button", "↑").click();
    cy.wait(200);
    cy.contains("button", "←").click();
    cy.wait(200);
    cy.contains("button", "↓").click();

    cy.contains("Game Over").should("not.exist");
  });

  it("handles different difficulties", () => {
    // Easy (no borders)
    cy.visit("/arcade/snake?difficulty=easy");
    cy.contains("Snake Game").should("be.visible");
    cy.get("canvas").should("not.have.class", "*strictBorder*");

    // Medium (with borders)
    cy.visit("/arcade/snake?difficulty=medium");
    cy.contains("Snake Game").should("be.visible");

    // Hard (with borders, faster)
    cy.visit("/arcade/snake?difficulty=hard");
    cy.contains("Snake Game").should("be.visible");
  });

  it("can lose the game by hitting walls (medium/hard difficulty)", () => {
    cy.visit("/arcade/snake?difficulty=medium"); // Has strict borders

    // Start game and immediately try to go off screen
    cy.get("body").type("{leftArrow}"); // Start

    // Keep going left to hit the wall
    for (let i = 0; i < 25; i++) {
      cy.get("body").type("{leftArrow}");
      cy.wait(50);

      // Check if game over appeared
      cy.get("body").then(($body) => {
        if ($body.text().includes("Game Over")) {
          return false; // Break the loop
        }
      });
    }

    // Should eventually show game over
    cy.contains("Game Over", { timeout: 10000 }).should("be.visible");
    cy.contains("New game").should("be.visible");
  });

  it("can restart game after game over", () => {
    cy.visit("/arcade/snake?difficulty=medium");

    // Force game over by hitting wall
    cy.get("body").type("{leftArrow}");

    for (let i = 0; i < 25; i++) {
      cy.get("body").type("{leftArrow}");
      cy.wait(50);
    }

    // Wait for game over and restart
    cy.contains("Game Over", { timeout: 10000 }).should("be.visible");
    cy.contains("New game").click();

    // Game should reset
    cy.contains("Press any button to start the game").should("be.visible");
    cy.contains("Game Over").should("not.exist");
  });

  it("can restart with spacebar", () => {
    cy.visit("/arcade/snake?difficulty=medium");

    // Force game over
    cy.get("body").type("{leftArrow}");
    for (let i = 0; i < 25; i++) {
      cy.get("body").type("{leftArrow}");
      cy.wait(50);
    }

    // Wait for game over and press space
    cy.contains("Game Over", { timeout: 10000 }).should("be.visible");
    cy.get("body").type(" ");

    // Should reset
    cy.contains("Press any button to start the game").should("be.visible");
  });

  it("prevents reverse direction", () => {
    // Start game going right
    cy.get("body").type("{rightArrow}");
    cy.wait(200);

    // Try to go left (opposite direction) - should be ignored
    cy.get("body").type("{leftArrow}");
    cy.wait(500);

    // Should still be alive (not crashed into itself)
    cy.contains("Game Over").should("not.exist");
  });

  it("has back to hub button", () => {
    cy.contains("Back to Hub").click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Next Arcade").should("be.visible");
  });
});
