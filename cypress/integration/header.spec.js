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

  it("button count", () => {
    cy.get("#buttonCount").click().click().should("have.value", "111");
  });

  it("invoke", () => {
    cy.window().invoke("alert", "Dá para ver?");
  });
  it("alert", () => {
    cy.get("#alert").click();
    cy.on("window:alert", (msg) => {
      console.log(msg);
      expect(msg).to.be.equal("Alert Simples");
    });
  });
  it("alert with mock", () => {
    const stub = cy.stub().as("Alerta");
    cy.on("window:alert", stub);
    cy.get("#alert")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Alert Simples");
      });
  });
  it("confirm", () => {
    cy.on("window:confirm", (msg) => {
      expect(msg).to.be.equal("Confirm Simples");
    });
    cy.on("window:alert", (msg) => {
      console.log(msg);
      expect(msg).to.be.equal("Confirmado");
    });
    cy.get("#confirm").click();
  });

  it("Deny Confirm", () => {
    cy.on("window:confirm", (msg) => {
      expect(msg).to.be.equal("Confirm Simples");
      return false;
    });
    cy.on("window:alert", (msg) => {
      console.log(msg);
      expect(msg).to.be.equal("Negado");
    });
    cy.get("#confirm").click();
  });
  it("Prompt", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(42);
    });
    cy.on("window:confirm", (msg) => {
      expect(msg).to.be.equal("Era 42?");
    });

    cy.on("window:alert", (msg) => {
      expect(msg).to.be.equal(":D");
    });
    cy.get("#prompt").click();
  });

  it("validation fild name, surname and gen  der", () => {
    const stub = cy.stub().as("alerta");
    cy.on("window:alert", stub);
    cy.get("#formCadastrar")
      .click()
      .then(() =>
        expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio")
      );

    cy.get("#formNome").type("Maria");
    cy.get("#formCadastrar")
      .click()
      .then(() =>
        expect(stub.getCall(1)).to.be.calledWith("Sobrenome eh obrigatorio")
      );

    cy.get("[data-cy=dataSobrenome]").type("Santos ");
    cy.get("#formCadastrar")
      .click()
      .then(() =>
        expect(stub.getCall(2)).to.be.calledWith("Sexo eh obrigatorio")
      );

    cy.get("#formSexoFem").click();
    cy.get("#formCadastrar").click();
    cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!");
  });

  it("work with iframe", () => {
    cy.get("#frame1").then((iframe) => {
      const body = iframe.contents().find("body");
      cy.wrap(body)
        .find("#tfield")
        .type("funciona?")
        .should("have.value", "funciona?");

      cy.visit("https://wcaquino.me/cypress/frame.html  ");
      cy.get("#otherButton").click();
      cy.on("window:alert", (msg) => {
        expect(msg).to.be.equal("Click OK!");
      });
    });
  });

  it("work with popup", () => {
    cy.window().then((win) => {
      cy.stub(win, "open").as("winOpen");
    });
    cy.get("#buttonPopUp").click();
    cy.get("@winOpen").should("be.called");
  });

  describe.only("work with popup ", () => {
    beforeEach(() => {
      cy.visit("https://wcaquino.me/cypress/componentes.html");
    });
    it("check popup url", () => {
      cy.contains("Popup2")
        .should("have.prop", "href")
        .and("equal", "https://wcaquino.me/cypress/frame.html");
    });
    it("popup dinamically", () => {
      cy.contains("Popup2").then(($a) => {
        const href = $a.prop("href");
        cy.visit(href);
        cy.get("#tfield").type("funciona");
      });
    });
    it("should force link on same page", () => {
      cy.contains("Popup2").invoke("removeAttr", "target").click();
      cy.get("#tfield").type("funciona");
    });
  });


});
