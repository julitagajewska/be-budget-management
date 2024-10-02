# Comparison of Frontend Frameworks: Personal Budget Management App using React, Vue, and Qwik
This project aims to provide a comparison of three popular frontend frameworks — React, Vue, and Qwik — by developing a personal budget management application in each. The focus of the research was to analyze and compare both the technical aspects and developer experience across these frameworks.

⚠️ Currently the server app and an instruction on how to run it can be found here: [server repo](https://github.com/julitagajewska/be-server) ⚠️

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)

## Installation
To install and run the client applications locally, follow these steps:
1. Clone the repository
     ```
    git clone https://github.com/julitagajewska/be-budget-management.git
    ```
2. Navigate to the project directory
    ```
    cd be-budget-management
    ```
3. Install the dependencies
   ```
    npm i
    ```
4. To start the client, navigate to desired client's directory and run project.
   ```
   cd apps/client-react
   npm run dev
   ```
   ```
   cd apps/client-vue
   npm run dev
   ```
   ```
   cd apps/client-qwik
   npm run dev
   ```
## Usage
The core functionalities are accessible under the /accounts section. The app enables users to create and manage financial accounts, each of which can have transactions associated with it. On the /accounts/:id page, users can view a detailed overview of their registered transactions, presented both in a bar chart and a table format, along with the total account balance.

Transactions can be filtered by various criteria such as date, status, and category. Users can also customize the visual representation of their data by switching between bar and donut charts. Additionally, the charts can be configured to display either the sum of transactions or the total number of transactions, and they can show incomes, expenses, or both.

⚠️ Please note that the primary objective of this application was to evaluate the frameworks and their features. As such, not all functionalities visible in the user interface are fully implemented.
## Screenshots
![screenshot-2](https://github.com/user-attachments/assets/e23fcc00-c7a7-4796-af45-18a34dcfff19)
![screenshot-1](https://github.com/user-attachments/assets/c76dfa4f-8431-4b4f-8e82-d83b94a910c6)
