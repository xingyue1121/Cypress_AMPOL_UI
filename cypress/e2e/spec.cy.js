import HomePage from '../support/PageObjects/HomePage';
import EVChargePage from '../support/PageObjects/EVChargePage';
import EnergyPage from '../support/PageObjects/EnergyPage';
import EnergyPostcodePage from '../support/PageObjects/EnergyPostcodePage';

describe('UI Test', () => {

  before(() => {
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
  })
})