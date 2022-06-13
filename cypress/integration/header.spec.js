/// <reference types="cypress" />

describe("register", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });
  it("long answer", () => {
    cy.get("#novoCampo").should("not.exist");
    cy.get("#buttonDelay").click();
    cy.get("#novoCampo").should("not.exist");
    cy.get("#novoCampo").should("exist");
    cy.get("#novoCampo").type("Funciona");
  });

  it("list DOM", () => {
    cy.get("#buttonListDOM").click();
    cy.wait(5000);
    cy.get("#lista li").find("span").contains("Item 1");
    cy.get("#lista li span").should("contain", "Item 2");
  });

  it("list", () => {
    cy.get("#buttonList").click();
    cy.get("#lista li").find("span").contains("Item 1");
    cy.get("#lista li span").should("contain", "Item 2");
  });

  it.only("button count", () => {
    cy.get("#buttonCount").click().click().should("have.value", "111");
  });
});
