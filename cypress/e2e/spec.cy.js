import HomePage from '../support/PageObjects/HomePage';
import EVChargePage from '../support/PageObjects/EVChargePage';
import EnergyPage from '../support/PageObjects/EnergyPage';
import EnergyPostcodePage from '../support/PageObjects/EnergyPostcodePage';

describe('UI Test', () => {

  before(() => {
    cy.viewport(1440, 900);
  })

  it('senario_1', () => {
    //Instantiate page objects
    const homePage=new HomePage();
    const eVChargePage=new EVChargePage();
    const energyPage=new EnergyPage();

    //Visit https://www.ampol.com.au/
    cy.visit(Cypress.env("home_url"));
    //Hover on ‘YOUR VEHICLE’ menu
    homePage.hover_YourVehicle();
    //Click on ‘EV charging’ option
    homePage.click_EVcharging();
    //Verify that the URL is https://ampcharge.ampol.com.au
    eVChargePage.verify_URL();
    //Click on AMPOL energy icon at the top of the page.
    eVChargePage.click_AMPOLEnergyIcon();
    //Click on ‘SWITCH NOW’ button.
    energyPage.click_SWITCHNOW();
    //Verify that the URL is https://energy.ampol.com.au/sign-up/postcode
    energyPage.verify_Signup_URL();
  })

  it('senario_2', () => {
    //Instantiate page object
    const energyPostcodePage = new EnergyPostcodePage();
    //Intercept the network request
    cy.intercept('POST', Cypress.env("intercept_url")).as('getResponse');
    //Visit https://energy.ampol.com.au/sign-up/postcode
    cy.visit(Cypress.env("energy_url"));
    //Enter Postcode “4011”
    energyPostcodePage.enter_Postcode();
    //Select Clayfield 4011 QLD from dropdown
    energyPostcodePage.select_FromDropdown();
    //Click on VIEW PLANS button
    energyPostcodePage.click_VIEWPLANS();
    //Wait on the intercepted request
    cy.wait('@getResponse').then((interception)=> {
        //Write the network response to a JSON file.
        cy.writeFile(Cypress.env("interceptResponse_filepath"), interception.response);
        //Copy the leadId value from the response and go to the URL as follows: https://energy.ampol.com.au/sign-up/agent?leadid={leadId}
        cy.visit(Cypress.env("target_url") + interception.response.body.leadId);
    })
  })
})