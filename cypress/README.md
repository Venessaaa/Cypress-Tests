# 💻 Parabank Cypress Automation

This project contains end-to-end test automation for the [Parabank Demo Website](https://parabank.parasoft.com/) using **Cypress**. It uses custom commands, fixtures and utility functions to cover major features such as user registration, account management, transfers, bill payments, transaction lookups, loan requests, and profile updates.

---
## 📁 Project Structure
cypress/
├── downloads/
├── e2e/
│ ├── Basic_Tests.cy.js
│ ├── Parabank_Commands.cy.js
│ ├── Parabank_Fixture.cy.js
│ ├── Parabank_Flow.cy.js
│ ├── Parabank_POM.cy.js
│ ├── Parabank_Util.cy.js
│ ├── Parabank_Util2.cy.js
│ ├── Sreenshot_Parabank_Signin.cy.js
│ ├── test2.cy.js
│ └── cypress project.code-workspace
├── fixtures/
│ ├── example.json
│ └── parabankfixtures.json
├── pages/
│ ├── RegisterPage.js
│ └── UpdateProfilePage.js
├── screenshots/
├── support/
│ └── Commands/
│ ├── Parabank_FindTransac.js
│ ├── Parabank_OpenAcct.js
│ ├── Parabank_Overview.js
│ ├── Parabank_PayBills.js
│ ├── Parabank_Register.js
│ ├── Parabank_ReqLoan.js
│ ├── Parabank_Transfer.js
│ ├── Parabank_Updateprof.js
│ ├── command.js
│ └── e2e.js
└── utils/
└── README.md
---

## 📑 Table of Contents

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
  - [Headless Mode](#headless-mode)
  - [Headed Mode](#headed-mode)
- [Features](#features)

---

## 🚀 Installation

Follow the steps below to set up the project on your local machine.

1. Download and install the latest Node.js (LTS or Current version) from:
https://nodejs.org/en/download/current

Verify installation:
node -v
npm -v

2. Download and install VS Code:
https://code.visualstudio.com/

3. Create project folder in your c: drive:
C:\cypress project

4. Open folder in VS code > Open the terminal in VS Code (Ctrl + backtick) and run:
npm init -y

5. Install Cypress:
npm install cypress --save-dev

Verify installation:
npx cypress --version

6. Open Cypress 
npx cypress open

7.  Install Additional Tools & Plugins
npm install cypress-mochawesome-reporter --save-dev
npm install --save-dev cypress-downloadfile
npm install cypress-plugin-api
npm install @faker-js/faker


🌟 Features of Parabank Website (including validation and verification of features)

✅ Automated user registration 

💳 Open and manage multiple bank accounts

💸 Transfer funds between accounts

🧾 Bill payment with field validations

📅 Find transactions using:

Date Range (including today’s date)

Amount

📝 Update user profile

🏦 Request loan functionality 

🔐 Logout functionality

🧪 Custom Cypress commands and data generators

🧪 Faker.js for generating realistic test data

🧪 Fixture-based testing for reusable data

🧪 Running the Tests
💻 Headed Mode (with Cypress UI):
npx cypress open
//or  
"parabank-commands-headed": "npx cypress run --spec 'cypress/e2e/Parabank_Commands.cy.js' --browser chrome --headed"

⚡ Headless Mode (via CLI):
npx cypress run
"parabank-commands-headless": "npx cypress run --spec 'cypress/e2e/Parabank_Commands.cy.js'"






