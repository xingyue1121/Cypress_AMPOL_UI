import HomePage from '../support/PageObjects/HomePage';
import EVChargePage from '../support/PageObjects/EVChargePage';
import EnergyPage from '../support/PageObjects/EnergyPage';
import EnergyPostcodePage from '../support/PageObjects/EnergyPostcodePage';

describe('UI Test', () => {

  before(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1440, 900);
  })

  it('senario_1', () => {

    const homePage=new HomePage();
    const eVChargePage=new EVChargePage();
    const energyPage=new EnergyPage();

    cy.visit(Cypress.env("home_url"));
    homePage.hover_YourVehicle();
    homePage.click_EVcharging();
    eVChargePage.verify_URL();
    eVChargePage.click_AMPOLEnergyIcon();
    energyPage.click_SWITCHNOW();
    energyPage.verify_Signup_URL();
    
    // cy.visit('https://www.ampol.com.au/');
    // cy.get('.nav-bar--level-2--content > :nth-child(1) > :nth-child(2)').realHover();
    // cy.get('.amp-mega-menu > :nth-child(2) > :nth-child(1)').realHover();
    // cy.contains('EV Charging').click();
    // cy.url().should('include', 'https://ampcharge.ampol.com.au');
    // cy.get('.nav-bar--level-1--content--brands > a[href="https://energy.ampol.com.au/"]').click();
    // cy.get('.Hero-module_buttonContainer__sNadp > [data-testid="Button"]').click();
    // cy.url().should('include', 'https://energy.ampol.com.au/sign-up/postcode');
  })

  it('senario_2', () => {

    const energyPostcodePage = new EnergyPostcodePage();
    cy.intercept('POST', Cypress.env("intercept_url")).as('getResponse');
    cy.visit(Cypress.env("energy_url"));
    energyPostcodePage.enter_Postcode();
    energyPostcodePage.select_FromDropdown();
    energyPostcodePage.click_VIEWPLANS();
    cy.wait('@getResponse').then((interception)=> {
        cy.writeFile(Cypress.env("interceptResponse_filepath"), interception.response);
        cy.visit(Cypress.env("target_url") + interception.response.body.leadId);
    })

    // cy.intercept('POST', 'https://api.ampolenergy.com.au/onboarding/v1.0/lead').as('getResponse');
    // cy.visit(Cypress.env("energy_url"));
    // cy.get('[data-testid="postcode-input"]').type("4011");
    // cy.get('[data-testid="postcode-option-0"] > .AddressAutocomplete_item__dbUr6').click();
    // cy.get('[data-testid="Button"]').click();
    // cy.wait('@getResponse').then((interception)=> {
    //     cy.writeFile("intercept_result.json", interception.response);
    //     cy.visit("https://energy.ampol.com.au/sign-up/agent?leadid=" + interception.response.body.leadId);
    // })

  })
})