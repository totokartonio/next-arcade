describe("Matching Pairs Game", () => {
  beforeEach(() => {
    cy.visit(
      "/arcade/matching-pairs?difficulty=easy&deck=bee,dove,fish,fly,frog,worm"
    );
  });

  it("displays game title and components", () => {
    cy.contains("Matching Pairs Game").should("be.visible");
    cy.contains("Select a card to start playing").should("be.visible");

    // Should show timer (easy = 45s)
    cy.contains("45s", { timeout: 10000 }).should("be.visible");

    // Should show cards
    cy.get('[data-testid="mp-card"]').should("have.length", 12);
  });

  it("starts timer when clicking first card", () => {
    cy.get('[data-testid="mp-card"]').first().click();

    // Start message should disappear
    cy.contains("Select a card to start playing").should("not.exist");

    // Timer should start counting down
    cy.clock();
    cy.tick(2000);
    cy.contains("43s").should("be.visible");
  });

  it("flips cards when clicked", () => {
    // Click first card
    cy.get('[data-testid="mp-card"]').first().click();

    // Card should flip (show image)
    cy.get('[data-testid="mp-card"]').first().find("img").should("be.visible");
  });

  it("can match two identical cards", () => {
    // Click first card
    cy.get('[data-testid="mp-card"]').eq(0).click();
    cy.get('[data-testid="mp-card"]').eq(1).click();

    cy.wait(1000); // Wait for match animation

    // Both cards should remain flipped (matched)
    cy.get('[data-testid="mp-card"] img').should("have.length", 2);
  });

  it("flips cards back when they dont match", () => {
    cy.get('[data-testid="mp-card"]').eq(0).click();
    cy.get('[data-testid="mp-card"]').eq(2).click();

    cy.wait(1000); // Wait for flip back animation

    // Cards should flip back (no visible images)
    cy.get('[data-testid="mp-card"] img').should("have.length", 0);
  });

  it("can win the game by matching all adjacent pairs", () => {
    // With the seeded deck and no shuffle, pairs are (0,1), (2,3), ... (10,11)
    for (let i = 0; i < 12; i += 2) {
      cy.get('[data-testid="mp-card"]').eq(i).click();
      cy.get('[data-testid="mp-card"]')
        .eq(i + 1)
        .click();
      // Optional: small time jump to let match sound/animation settle
      cy.clock();
      cy.tick(350);
    }

    cy.contains("You won!").should("be.visible");
  });

  it("loses when timer runs out (fast-forwarded)", () => {
    cy.clock();

    // Start the game to start the timer
    cy.get('[data-testid="mp-card"]').first().click();

    // Easy: 45s → tick past it
    cy.tick(45_000);

    cy.contains("Game Over").should("be.visible");
    // Optionally:
    // cy.contains(/time/i).should("be.visible");
  });

  it("can restart after game over (still seeded)", () => {
    cy.clock();

    // Lose quickly via timer
    cy.get('[data-testid="mp-card"]').first().click();
    cy.tick(45_000);
    cy.contains("Game Over").should("be.visible");

    cy.contains("New game").click();

    // On restart with the same URL, the same seeded layout returns:
    cy.contains("Select a card to start playing").should("be.visible");
    cy.contains("45s").should("be.visible");
    cy.get('[data-testid="mp-card"] img').should("have.length", 0);
  });

  it("handles different difficulties (counts only)", () => {
    // Easy: 6 pairs, 45 seconds
    cy.visit("/arcade/matching-pairs?difficulty=easy");
    cy.contains("45s", { timeout: 10000 }).should("be.visible");
    cy.get('[data-testid="mp-card"]').should("have.length", 12);

    // Medium: 10 pairs, 60 seconds
    cy.visit("/arcade/matching-pairs?difficulty=medium");
    cy.contains("60s").should("be.visible");
    cy.get('[data-testid="mp-card"]').should("have.length", 20);

    // Hard: 15 pairs, 75 seconds
    cy.visit("/arcade/matching-pairs?difficulty=hard");
    cy.contains("75s").should("be.visible");
    cy.get('[data-testid="mp-card"]').should("have.length", 30);
  });

  it("prevents clicking on already flipped cards", () => {
    cy.get('[data-testid="mp-card"]').eq(0).click();
    cy.get('[data-testid="mp-card"]').eq(0).click();

    // Still only one flipped image visible
    cy.get('[data-testid="mp-card"] img').should("have.length", 1);
  });

  it("prevents clicking when cards are flipping", () => {
    cy.clock();

    cy.get('[data-testid="mp-card"]').eq(0).click();
    cy.get('[data-testid="mp-card"]').eq(2).click(); // now in flip/match flow

    // Immediate third click should be ignored while busy
    cy.get('[data-testid="mp-card"]').eq(1).click();

    // Only up to 2 images visible during the sequence
    cy.get('[data-testid="mp-card"] img').should("have.length.at.most", 2);

    // Let animations finish
    cy.tick(700);
  });

  it("has back to hub button", () => {
    cy.contains("Back to Hub").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Next Arcade").should("be.visible");
  });
});
