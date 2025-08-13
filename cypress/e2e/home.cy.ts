// cypress/e2e/home.cy.ts
describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the main title", () => {
    cy.contains("Next Arcade").should("be.visible");
  });

  it("shows all game options", () => {
    cy.get('[id="hangman"]', { timeout: 10000 }).should("exist");
    cy.get('[id="snake"]').should("exist");
    cy.get('[id="matching-pairs"]').should("exist");
  });

  it("displays game covers", () => {
    cy.get('img[alt="Hangman cover"]').should("be.visible");
    cy.get('img[alt="Snake cover"]').should("be.visible");
    cy.get('img[alt="Matching Pairs cover"]').should("be.visible");
  });

  it("has mute button", () => {
    cy.get("nav", { timeout: 10000 })
      .find("button")
      .filter(":has(svg)")
      .first()
      .should("exist");
  });

  it("can toggle mute", () => {
    cy.get("nav").find("button").filter(":has(svg)").first().as("mute");

    cy.get("@mute").click();
    // страница жива
    cy.contains("Next Arcade").should("be.visible");
  });

  it("shows difficulty options when clicking on a game", () => {
    cy.get('[id="hangman"]').click();

    cy.contains("Select difficulty:").should("be.visible");
    cy.contains("Easy").should("be.visible");
    cy.contains("Medium").should("be.visible");
    cy.contains("Hard").should("be.visible");
  });

  it("navigates to game when selecting difficulty", () => {
    cy.get('[id="hangman"]').click();
    cy.contains("Easy").click();

    cy.url().should("include", "/arcade/hangman");
    cy.url().should("include", "difficulty=easy");
  });

  it("can close dropdown by clicking outside", () => {
    cy.get('[id="hangman"]').click();
    cy.contains("Select difficulty:").should("be.visible");

    cy.get("body").click(100, 100);
    cy.contains("Select difficulty:").should("not.exist");
  });

  it("has working about link in footer", () => {
    cy.get('footer a[href="/about"]').click();

    cy.url().should("include", "/about");
    cy.contains("About & Acknowledgments").should("be.visible");
  });

  it("can navigate back from about page", () => {
    cy.visit("/about");
    cy.get("a").contains("Back to Hub").click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Next Arcade").should("be.visible");
  });
});
