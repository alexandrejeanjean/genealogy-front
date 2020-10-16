//<reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name="username"]')
      .type("darkvador@tester.io")
      .should("have.value", "darkvador@tester.io");

    cy.get('input[name="password"]')
      .type("dg4p2rQ8b9bnTEh")
      .should("have.value", "dg4p2rQ8b9bnTEh");

    cy.get('button[type="submit"]').click();
  });

  it("should get button to create new family and trigger error message", () => {
    cy.url().should("include", "http://localhost:3000/dashboard");
    cy.get("div.new-card").click();
    cy.wait(1000);
    cy.get("body").then(($body) => {
      if ($body.find(".modal-dialog").length > 0) {
        cy.get(".modal-title").should("have.text", "New Family");
      }
    });
    cy.get("body").then(($body) => {
      if ($body.find("form").length > 0) {
        cy.get('button[type="submit"]').click();
        cy.get('input[name="name').should("have.class", "has-error");
      }
    });
  });

  it("should create a new family with name CypressFam and check if exist in list", () => {
    cy.url().should("include", "http://localhost:3000/dashboard");
    cy.get("div.new-card").click();
    cy.wait(1000);

    cy.get("body").then(($body) => {
      if ($body.find("form").length > 0) {
        cy.get('input[name="name"]')
          .type("CypressFam")
          .should("have.value", "CypressFam");
        cy.get('button[type="submit"]').click();
      }
    });

    cy.wait(1000);

    cy.get("ul.list-items").then(($list) => {
      if ($list.find("li").length > 0) {
        cy.get("li").should(($li) => {
          expect($li.get(0).innerText).to.eq("CypressFam");
        });
      }
    });
  });

  it("should find CypressFam and delete it", () => {
    cy.url().should("include", "http://localhost:3000/dashboard");
    cy.wait(1000);

    cy.get("ul.list-items").then(($list) => {
      if ($list.find("li").length > 0) {
        cy.get("button.delete-btn").then(($el) => {
          $el.get(0).click();
        });
      }
    });
  });
});
