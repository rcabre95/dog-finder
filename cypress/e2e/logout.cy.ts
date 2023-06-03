
describe("The process of logging in and out", () => {
    const correctEmail: string = "test@test.com";
    const passingName: string = "bob";

    it("logs out user", () => {
        cy.visit("/");
        cy.get('input[name=name]').type(passingName);
        cy.get('input[name=email]').type(correctEmail);
        cy.get('button[type=submit').click();
        cy.wait(9000);
        
        cy.get('button[type=button]').contains("Log out").click();
        cy.get('h3').contains("Are you sure you want to log out?").parent().within(() => {
            cy.get('button[type=button]').contains("Log out").click()
        });

        cy.get('p').contains('Welcome to').should('be.visible');
    })

    it("allows user to continue matching process", () => {
        cy.visit("/");
        cy.get('input[name=name]').type(passingName);
        cy.get('input[name=email]').type(correctEmail);
        cy.get('button[type=submit').click();
        cy.wait(9000);

        cy.get('button[type=button]').contains("Log out").click();
        cy.get('h3').contains("Are you sure you want to log out?").parent().within(() => {
            cy.get('button[type=button]').contains("Continue matching").click();
        });

        cy.get('dialog').should('not.exist');
    })

    
})