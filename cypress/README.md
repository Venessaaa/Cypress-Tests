# 💻 Parabank Cypress Automation

This project contains end-to-end test automation for the [Parabank Demo Website](https://parabank.parasoft.com/) using **Cypress**. It uses custom commands, fixtures and utility functions to cover major features such as user registration, account management, transfers, bill payments, transaction lookups, loan requests, and profile updates.

---
## 📁 Project Structure

cypress-project/
│
├── cypress/
│   ├── downloads/                     
│   ├── e2e/
│   │   ├── Parabank_Test/             # All test cases of Parabank
│   │   │   ├── AcctOverview.cy.js
│   │   │   ├── BillPay.cy.js
│   │   │   ├── FindTransaction.cy.js
│   │   │   ├── Logout.cy.js
│   │   │   ├── OpenAccount.cy.js
│   │   │   ├── Register.cy.js
│   │   │   ├── RequestLoan.cy.js
│   │   │   ├── TransferFunds.cy.js
│   │   │   └── UpdateProf.cy.js
│
│   ├── fixtures/                     # Static data for testing 
│
│   ├── screenshots/                  # Screenshots per tests 
│   │   ├── AcctOverview.cy/
│   │   ├── BillPay.cy/
│   │   ├── FindTransaction.cy/
│   │   ├── Logout.cy/
│   │   ├── OpenAccount.cy/
│   │   ├── Register.cy/
│   │   ├── RequestLoan.cy/
│   │   ├── TransferFunds.cy/
│   │   └── UpdateProf.cy/
│
│   └── support/
│       ├── Commands/                # Custom Cypress commands for Parabank
│       │   ├── Parabank_FindTransac.js
│       │   ├── Parabank_OpenAcct.js
│       │   ├── Parabank_Overview.js
│       │   ├── Parabank_PayBills.js
│       │   ├── Parabank_Register.js
│       │   ├── Parabank_ReqLoan.js
│       │   ├── Parabank_Transfer.js
│       │   ├── Parabank_UpdateProf.js
│       │   └── index.js             
│       ├── commands.js
│       └── e2e.js
│
├── utils/                            # Reusable utilities
├── node_modules/
├── .gitignore
├── package.json
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

### 🧪 Running the Tests

### 💻 Headed Mode (with Cypress UI):
npx cypress open
-- or  
    "parabank-register-headed": "npm cypress run --spec 'cypress/e2e/Parabank_Test/Register.cy.js' --browser chrome --headed", 
    "parabank-openacc-headed": "npm cypress run --spec 'cypress/e2e/Parabank_Test/OpenAccount.cy.js' --browser chrome --headed", 
    "parabank-overview-headed": "npm cypress run --spec 'cypress/e2e/parabank_Test/AcctOverview.cy.js' --browser chrome --headed", 
    "parabank-paybill-headed": "npm cypress run --spec 'cypress/e2/Parabank_Test/BillPay.cy.js' --browser chrome --headed", 
    "parabank-findtransac-headed": "npm cypress run --spec 'cypress/e2e/Parabank_Test/FindTransaction.cy.js' --browser chrome --headed", 
    "parabank-transfer-headed": "npm cypress run --spec 'cypress/e2e/Parabank_Test/TransferFunds.cy.js' --browser chrome --headed", 
    "parabank-reqloan-headed": "npm cypress run --spec 'cypress/e2e/Parabank_Test/RequestLoan.cy.js' --browser chrome --headed", 
    "parabank-update-headed": "npm cypress run --spec 'cypress/e2e/Parabank_Test/UpdatepProf.cy.js' --browser chrome --headed", 
    "parabank-logout-headed": "npm cypress run --spec 'cypress/e2e/Parabank_Test/Logout.cy.js' --browser chrome --headed", 

### ⚡ Headless Mode (via CLI):
npx cypress run
-- or 
    "parabank-register-headless": "npm cypress run --spec 'cypress/e2e/Parabank_Test/Register.cy.js'", 
    "parabank-openacc-headless": "npm cypress run --spec 'cypress/e2e/Parabank_Test/OpenAccount.cy.js'", 
    "parabank-overview-headless": "npm cypress run --spec 'cypress/e2e/parabank_Test/AcctOverview.cy.js'", 
    "parabank-paybill-headless": "npm cypress run --spec 'cypress/e2/Parabank_Test/BillPay.cy.js'", 
    "parabank-findtransac-headless": "npm cypress run --spec 'cypress/e2e/Parabank_Test/FindTransaction.cy.js'", 
    "parabank-transfer-headless": "npm cypress run --spec 'cypress/e2e/Parabank_Test/TransferFunds.cy.js'", 
    "parabank-reqloan-headless": "npm cypress run --spec 'cypress/e2e/Parabank_Test/RequestLoan.cy.js'", 
    "parabank-update-headless": "npm cypress run --spec 'cypress/e2e/Parabank_Test/UpdatepProf.cy.js'", 
    "parabank-logout-headless": "npm cypress run --spec 'cypress/e2e/Parabank_Test/Logout.cy.js'", 


### 🌟 Features of Parabank Website (including validation and verification of features)

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

### ❤️ Author
Created by: Jai  
GitHub: https://github.com/Venessaaa





