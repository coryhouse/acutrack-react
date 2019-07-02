beforeEach(() => {
  cy.visit("http://localhost:3000/vehicles");
});

it("should display vehicles header", () => {
  // cy.get('[href="/vehicles"]').click(); // find vehicles link and click it.
  cy.get("h1").should("have.text", "Vehicles"); // once on the vehicles page, the headers should say vehicles.
});

it("should support adding, editing and deleting a vehicle", () => {
  // add record first
  cy.get('[href="/vehicle"]').click();
  cy.get("#make").type("Cypress make");
  cy.get("#model").type("Cypress model");
  cy.get('[type="submit"]').click();
  cy.get(".Toastify__toast-body").should("have.text", "Vehicle saved."); // assert that the toast displays upon save.
  cy.getByText("Cypress make"); // make and model should display on the vehicles page after save.
  cy.getByText("Cypress model").click(); // click on model so we can edit the record that we just saved.

  // Edit record we created above and assert that it saves successfully.
  cy.get("#make").type("2");
  cy.get("#model").type("2");
  cy.get('[type="submit"]').click();
  cy.get(".Toastify__toast-body").should("have.text", "Vehicle saved."); // assert that the toast displays upon save.
  cy.getByText("Cypress make2"); // make and model should display on the vehicles page after save.
  cy.getByText("Cypress model2");

  // Delete record we created above
  cy.getByLabelText("Delete Cypress make2 Cypress model2").click();
  cy.get(".Toastify__toast-body").should("have.text", "Vehicle deleted."); // assert that the toast displays upon delete.
});
