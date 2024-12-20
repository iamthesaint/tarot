import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{ts,tsx,js,jsx}",
  },
  e2e: {
    setupNodeEvents(on, config) {

  },
  },
});