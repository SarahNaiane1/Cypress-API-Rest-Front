/// <reference types="cypress" />

describe("register", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.get("body").should("contain", "Cuidado");
    cy.get("span").should("contain", "Cuidado");
    cy.get(".facilAchar").should("contain", "Cuidado");
    cy.get(".facilAchar").should(
      "contain",
      "Cuidado onde clica, muitas armadilhas..."
    );
  });
  it("Link Back", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.get("body > center > center:nth-child(8) > a:nth-child(1)").click();
    cy.get("#resultado").should("have.text", "Voltou!");

    cy.reload();
    cy.get("#resultado").should("have.not.text", "Voltou!");
  });

  it.only("assert title ", () => {
    cy.title()
      .should("be.equal", "Campo de Treinamento")
      .and("contain", "Campo de Treinamento");

    cy.title().then((title) => {
      console.log(title);
    });
  });

  it("should fill in the fields name, last name, gender, fav food, scholarity, practice sports and suggestions", () => {
    cy.get("#formNome").type("Usuario");
    cy.get("#formSobrenome").type(
      "Cypress Sarah{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}"
    );

    cy.get("#formSexoFem").click().should("be.checked");

    cy.get("#formSexoMasc").should("not.be.checked");

    cy.get("[name='formSexo']").should("have.length", 2);

    cy.get("#formComidaCarne").click().should("be.checked");

    cy.get("[name=formComidaFavorita]").click({ multiple: true });

    cy.get("[name=formComidaFavorita]").should("be.checked");

    cy.get("[data-test=dataEscolaridade]")
      .select("Especializacao")
      .should("have.value", "especializacao");

    cy.get("[data-testid=dataEsportes]").select(["natacao"]);

    cy.get("#elementosForm\\:sugestoes")
      .type(
        "Esse é um exemplo, esse é um exemplo. Esse é um exemplo, esse é um exemplo"
      )
      .should(
        "have.value",
        "Esse é um exemplo, esse é um exemplo. Esse é um exemplo, esse é um exemplo"
      )
      .clear()
      .type(
        "Erro{selectall}Esse é um exemplo, esse é um exemplo. Esse é um exemplo, esse é um exemplo 2",
        { delay: 50 }
      )
      .should(
        "have.value",
        "Esse é um exemplo, esse é um exemplo. Esse é um exemplo, esse é um exemplo 2"
      );

    //Button,	Checkbox,	Radio and	Input on Table
    cy.get(
      "#tabelaUsuarios > tbody > tr:nth-child(1) > td:nth-child(4) > input[type=checkbox]"
    ).check();
    cy.get(
      ":nth-child(1) > :nth-child(5) > table > tbody > tr > td > input"
    ).check();
    cy.get(
      "#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input"
    ).type("teste Input");

    cy.get("#formCadastrar").click();
  });
});
