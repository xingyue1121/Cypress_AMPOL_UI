class HomePage {
    hover_YourVehicle() {
        cy.get('.nav-bar--level-2--content > :nth-child(1) > :nth-child(2)').realHover();
        cy.get('.amp-mega-menu > :nth-child(2) > :nth-child(1)').realHover();
    }

    click_EVcharging() {
        cy.contains('EV Charging').click();
    }
}
export default HomePage