// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.findByText(/all/i);
  });
});

describe("List of items", () => {
  it("checks initial length of array items", () => {
    const items = cy.findAllByTestId(/list-items/i).should("have.length", 20);
  });

  it("checks when a user scrolls to bottom of pages and the new returned length of array items", () => {
    cy.scrollTo(0, 2000);
    const items = cy.findAllByTestId(/list-items/i).should("have.length", 30);
  });
});

describe("Favorites", () => {
  it("checks route to the favorites page on nav click", () => {
    cy.visit("/");

    cy.findByText(/favorites/i).click();
  });
});
