class EnergyPage {

    click_SWITCHNOW() {
        cy.get('.Hero-module_buttonContainer__sNadp > [data-testid="Button"]').click();
    }

    verify_Signup_URL() {
        cy.url().should('include', Cypress.env("energy_url"));
    }
}
export default EnergyPage