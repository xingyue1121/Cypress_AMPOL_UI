class EVChargePage {

    verify_URL() {
        cy.url().should('include', Cypress.env("charge_url"));
    }

    click_AMPOLEnergyIcon() {
        cy.get('.nav-bar--level-1--content--brands > a[href="https://energy.ampol.com.au/"]').click();
    }
}
export default EVChargePage