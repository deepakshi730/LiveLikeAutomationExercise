import { test, expect } from '@playwright/test';

test.describe('Automation Exercise Tests', () => {

    const url = "https://automationexercise.com/";
    test.beforeEach('Navigation', async ({ page }) => {
        await page.goto(url);
    });

    // Test: Validate the Page URL
    test('Validate the Url', async ({ page }) => {
        await expect(page).toHaveURL(url);
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    // Test: Signup / Login Tests
    test.describe('Signup / Login Tests', () => {

        test.beforeEach('Signup / Login Link', async ({ page }) => {
            await page.getByRole('link', { name: ' Signup / Login' }).click();
        });

        test.describe('Login Tests', () => {

            test.beforeEach('Verify login text', async ({ page }) => {
                await expect(page.getByText('Login to your account')).toBeVisible();
            });

            //Test: Validate Login functionality with wrong creds
            test('To validate login functionality with wrong credentials', async ({ page }) => {
                await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('test@example.com');
                await page.getByPlaceholder('Password').fill('test');
                await page.getByRole('button', { name: 'Login' }).click();
                await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
            });
        });

        test.describe('Signup Tests', () => {

            test.beforeEach('Verify signup text', async ({ page }) => {
                await expect(page.getByText('New User Signup!')).toBeVisible();
            });

            // Test: Register a user using registered email
            test('To validate user registration(Form Submission) using registered email', async ({ page }) => {
                await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Name').fill('test');
                await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('test@gmail.com');
                await page.getByRole('button', { name: 'Signup' }).click();
                await expect(page.getByText('Email Address already exist!')).toBeVisible();
            });
        });

    });

    // Test: Form Registration (Contact Form)
    test.describe('Form Registration', () => {
        test('To validate form registration with Contact Form', async ({ page }) => {
            await page.locator('li').filter({ hasText: 'Contact us' }).click();
            await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
            await expect(page.getByText('Get In Touch Submit')).toBeVisible();
            await page.getByPlaceholder('Name').fill('test123');
            await page.getByPlaceholder('Email', { exact: true }).fill('test123@gmail.com');
            await page.getByPlaceholder('Subject').fill('Facing issue while registering user');
            await page.getByPlaceholder('Your Message Here').fill('Facing issue');
            page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button', { name: 'Submit' }).click();
        });
    });

    // Test: Search Functionality
    test.describe('Search Functionality', () => {

        test.beforeEach('Products links', async ({ page }) => {
            await page.getByRole('link', { name: 'Products' }).click();
        });

        // Test: Serach a valid item
        test('To validate Search Functionality with valid data', async ({ page }) => {
            await expect(page.getByPlaceholder('Search Product')).toBeVisible();
            const searchItem = 'Tshirt';
            await page.getByPlaceholder('Search Product').fill(searchItem);
            await page.locator('//button[@id="submit_search"]').click();
            const results = await page.locator('//div[@class="features_items"]//p').allTextContents();
            const hasResults = results.some(result => result.toLowerCase().includes(searchItem.toLowerCase()));
            expect(hasResults).toBeTruthy();
        });

        // Test: Serach an invalid item - Negative test case
        test('To validate Search Functionality with invalid data', async ({ page }) => {
            await expect(page.getByPlaceholder('Search Product')).toBeVisible();
            const searchItem = 'NonExistingItem';
            await page.getByPlaceholder('Search Product').fill(searchItem);
            await page.locator('//button[@id="submit_search"]').click();
            const results = await page.locator('//div[@class="features_items"]//p').allTextContents();
            const hasResults = results.some(result => result.toLowerCase().includes(searchItem.toLowerCase()));
            expect(hasResults).toBeFalsy();
        });

        // Test: Scroll down and add third last product to cart
        test('To validate Scroll down and add third last product to cart functionality', async ({ page }) => {
            await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
            await page.waitForTimeout(2000);

            const allProductLocator = page.locator('//div[@class="features_items"]//div[@class="product-image-wrapper"]');
            const totalProducts = await allProductLocator.count();

            const thirdLastProductIndex = totalProducts - 3;

            const productCardXPath = `(//div[@class="product-image-wrapper"])[${thirdLastProductIndex + 1}]`;
            await page.locator(productCardXPath).hover();

            const addToCartButtonXPath = `${productCardXPath}//div[contains(@class, 'product-overlay')]//a[contains(text(), 'Add to cart')]`;
            await page.waitForTimeout(2000);
            await page.locator(addToCartButtonXPath).click();
            
            await page.waitForSelector('//button[contains(text(),"Continue Shopping")]', { timeout: 5000 });
            await expect(page.getByText("Your product has been added to cart.")).toBeVisible();
        });
    });
});
