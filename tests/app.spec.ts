import { test, expect } from '@playwright/test';

test.describe("Layout Tests", () => {
    test('check that web page loads', async ({ page }) => {
        await page.goto('/')

        // Expect title to contain "Take Home" substring
        await expect(page).toHaveTitle(/Take Home/);
    })

    test('check that create modal opens and closes', async ({ page }) => {
        // Step 1: Go to the home page
        await page.goto("/");

        // Step 2: Click the 'Add user' button
        await page.click('button:has-text("Add user")');

        // Step 3: Check that the modal appears
        await expect(page.locator('div.modal')).toBeVisible();
        await expect(page.locator('button.close')).toBeVisible();

        // Step 4: Check that the modal dissappears
        await page.click('button.close');
        await expect(page.locator('div.modal')).not.toBeAttached();

    })

    test('check form submission buttons work', async ({ page }) => {

        // Step 1: Go to the home page
        await page.goto("/");

        // Step 2: Click the 'Add user' button
        await page.click('button:has-text("Add user")');

        // Step 3: Check that the modal appears
        const modal = page.locator('div.modal');
        await expect(modal).toBeVisible();


        // Step 4: Check that the save and cancel buttons are visible and working
        const saveButton = modal.locator('button:has-text("Save")');
        const cancelButton = modal.locator('button:has-text("Cancel")');

        await expect(saveButton).toBeVisible();
        await expect(cancelButton).toBeVisible();


        // Save button test
        await saveButton.click();
        const errors = modal.locator('span.error');
        const errorCount = await errors.count();

        expect(errorCount).toBe(4);

        await expect(errors.nth(0)).toBeVisible();
        await expect(errors.nth(1)).toBeVisible();
        await expect(errors.nth(2)).toBeVisible();
        await expect(errors.nth(3)).toBeVisible();


        // Cancel button test - should close dialog
        await cancelButton.click();
        await expect(modal).not.toBeVisible();

    });
})

test.describe("Form Validations", () => {
    test.beforeAll(async ({ page }) => {

        await page.goto("/");

        // Step 2: Click the 'Add user' button
        await page.click('button:has-text("Add user")');

        const modal = page.locator('div.modal');
        await expect(modal).toBeVisible();
        await expect(modal.locator("form")).toBeVisible();
    });

    test("check form validation rules", async ({ page }) => {


        const modal = page.locator('div.modal');
        // TODO: Include form filling data to test all use cases
    })
})