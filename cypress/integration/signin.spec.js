//<reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should render error messages for both inputs", () => {
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.get('input[name="username').should("have.class", "has-error");
    cy.get('input[name="password').should("have.class", "has-error");
  });

  it("should render error message only for password empty input", () => {
    cy.get('input[name="username"]')
      .type("darkvador@tester.io")
      .should("have.value", "darkvador@tester.io");

    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    cy.get('input[name="username').should("not.have.class", "has-error");
    cy.get('input[name="password').should("have.class", "has-error");
  });

  it("should have an email and a password input and on submit redirect to /dashboard", () => {
    cy.get('input[name="username"]')
      .type("darkvador@tester.io")
      .should("have.value", "darkvador@tester.io");

    cy.get('input[name="password"]')
      .type("dg4p2rQ8b9bnTEh")
      .should("have.value", "dg4p2rQ8b9bnTEh");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "http://localhost:3000/dashboard");
  });
});
