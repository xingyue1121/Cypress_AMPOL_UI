const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    "home_url": "https://www.ampol.com.au/",
    "charge_url": "https://ampcharge.ampol.com.au",
    "energy_url": "https://energy.ampol.com.au/sign-up/postcode",
    "intercept_url": "https://api.ampolenergy.com.au/onboarding/v1.0/lead",
    "interceptResponse_filepath" : "intercept_result.json",
    "target_url": "https://energy.ampol.com.au/sign-up/agent?leadid="
}
});
