
describe("The login process", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    // afterAll(() => {
    //     cy.get('button[type=button]').contains('Log out').click()
    //     cy.get()
    // })

    const wrongEmail: string = "test@testcom";
    const shortName: string = "ab";
    const correctEmail: string = "test@test.com";
    const passingName: string = "bob";

    it("fails login if email is incorrect", () =>{
        cy.get('input[name=name]').type(passingName);
        cy.get('input[name=email]').type(wrongEmail);
        cy.get('button[type=submit').click();

        cy.get('p').contains('Please enter a valid email address.').should('be.visible');
    });

    it("fails login if name is too short", () => {
        cy.get('input[name=name]').type(shortName);
        cy.get('input[name=email]').type(correctEmail);
        cy.get('button[type=submit').click();

        cy.get('p').contains('Your name must be at least 3 characters long.').should('be.visible');
    })

    it("grants access if login succeeds", () => {
        cy.get('input[name=name]').type(passingName);
        cy.get('input[name=email]').type(correctEmail);
        cy.get('button[type=submit').click();
        cy.wait(9000);
        cy.get('h5').should('contain', 'Search yielded ');
    })
})