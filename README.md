## Objective: 
The objective of this project is to create automated tests for the website [https://automationexercise.com/] using Playwright and integrate them with a CI/CD pipeline. The pipeline will automatically trigger the tests whenever a new commit is pushed/merged into the main branch, and will generate test reports with logs and screenshots.

## Prerequisites:
1. Node.js (v16.x or higher)
2. Playwright installed
3. GitHub repository for version control
4. GitHub Actions for CI pipeline setup

## Automation:
**Test Cases Automated**
The following test cases have been automated using Playwright:
 
   **Login Functionality:**
   - Validate the Page Url
   - Validate the login text
   - Validate login functionality with invalid credentials
   - Validate the signup text
   - Validate user registration using registered email

   **Form Submission:**
   - Automates submission of a contact form
   - Tests successful message post form submission

   **Search Functionality:**
   - Automates the search for valid products using the search bar.
   - Automates the search for invalid products using the search bar.
   - Verifies that getting relevant results based on search queries.

   **Scroll Down and Add Third Last Product to Cart:**
   - Scrolls down the product list and adds the third last product to the cart.
   - Verifies the successful message is shown on adding product to the cart.

## CI Pipeline
The CI pipeline is set up to trigger automated tests every time a new commit is pushed into the main branch.

**GitHub Actions CI Pipeline**
- A GitHub Actions workflow is used to automate the test runs. The .yml configuration file triggers the pipeline on pushes to the main branch and automatically installs the necessary dependencies, runs the tests, and uploads the test results.

## Reporting
The test reports generated include logs, screenshots, and an HTML report that summarizes the test runs. After every test run:
 - Reports with be stored in /playwright-report and /test-results folder
 - We can also view the reports using: 
    npx playwright show-report test-results

**Accessing Reports in GitHub Actions**
 - After the pipeline run, go to the Actions tab in GitHub.
 - Select the specific workflow run.
 - Download the uploaded artifact containing test results and screenshots from the Artifacts section.

## Project Setup
**Running Tests Locally**
1. **Clone the repository:**
    ```
    git clone https://github.com/deepakshi730/LiveLikeAutomationExercise.git
    ```
2. **Install the dependencies**
    ```bash
    npm i
3. **Install Playwright**
    ```bash
    npx playwright install --with-deps
4. **Run the tests**
    ```bash
    npx playwright test
5. **Open/View HTML Report**
    ```bash
    npx playwright show-report test-results
6. **Pipeline setup**
    1. Push your code to main branch
    ```
    git push
    ```
    2. The pipeline will automatically trigger upon code push
