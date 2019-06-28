beforeEach(() => {
  cy.visit("http://localhost:3000/vehicles");
});

it("should display vehicles header", () => {
  cy.get("h1").should("have.text", "Vehicles");
});
