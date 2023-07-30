class EnergyPostcodePage {

    enter_Postcode() {
        cy.get('[data-testid="postcode-input"]').type("4011");
    }

    select_FromDropdown() {
        cy.get('[data-testid="postcode-option-0"] > .AddressAutocomplete_item__dbUr6').click();
    }
    
    click_VIEWPLANS() {
        cy.get('[data-testid="Button"]').click();
    }
    

}
export default EnergyPostcodePage