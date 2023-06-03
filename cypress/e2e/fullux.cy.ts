import { c } from "msw/lib/glossary-de6278a9";

describe("Full user experience when used properly", () => {
    const myEmail: string = "raphael.cabrera111@gmail.com";
    const myName: string = "Raphael";

    it("sends you back to \"dogs\" if you try to skip to the \"match\" page", () => {
        // log in
        cy.visit("/");
        cy.get('input[name=name]').type(myName);
        cy.get('input[name=email]').type(myEmail);
        cy.get('button[type=submit').click();
        cy.wait(9000);

        // skip to match page
        cy.visit("/match");
        cy.wait(3000);

        cy.get('h5').should('contain', 'Search yielded ');
    })

    it("allows user to be matched with a dog and send the information to their email", () => {
        // log in
        cy.visit("/");
        cy.get('input[name=name]').type(myName);
        cy.get('input[name=email]').type(myEmail);
        cy.get('button[type=submit').click();
        cy.wait(9000);

        // open and close filters
        cy.get('button[type=button]').contains("Filters").click();
        cy.wait(1000)
        cy.get('[alt="close svg"').click();

        // open and use filters
        cy.wait(2000)
        cy.get('button[type=button]').contains("Filters").click();
        cy.get('select').select('MAX');
        cy.get('button[type=button]').contains('Select Breeds').click();
        cy.get('label').contains('Affenpinscher').click();
        cy.get('button[type=submit]').click();
        cy.wait(3000);

        // click breed sort (not that it matters based on the filters used)
        cy.get('section').first().children().last().click();
        cy.wait(3000);

        // navigate 2 pages forward and one back
        cy.get('nav').first().within(() => {
            cy.get('button[type=button]').last().click();
            cy.wait(3000);
            cy.get('button[type=button]').last().click();
            cy.wait(3000);
            cy.get('button[type=button]').first().click();
            cy.wait(3000);
        });

        // add favorites
        cy.get('[data-testid="heart-btn"').each(($btn, index, $btns) => {
            if (index > 10) return false;
            cy.wrap($btn).click();
        })

        // enter info to get data sent to email
        cy.get('input[name=name]').type(myName);
        cy.get('input[name=email]').type(myEmail);
        cy.get('button[type=submit').click();
        cy.wait(12000);

        // automatically redirect to home
        cy.get('p').first().should('contain', 'Welcome to');
    });
})