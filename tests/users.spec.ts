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

test.describe("Form Tests", () => {
    test.beforeEach(async ({ page }) => {

        await page.goto("/");

        // Step 2: Click the 'Add user' button
        await page.click('button:has-text("Add user")');

        const form = page.locator('div.modal form');
        await expect(form).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.click('button.close');
        await expect(page.locator('div.modal')).not.toBeAttached();
    })

    test("validate firstName", async ({ page }) => {

        const form = page.locator('div.modal form');
        await expect(form).toBeVisible();

        // Check less than 5 validation
        
        const input = form.locator("input[name='firstName']");
        const error = form.locator("input[name='firstName'] + span.error");

        await input.focus();
        await input.fill("")
        await input.blur();

        await expect(error).toBeVisible();

        await input.focus();
        await input.fill("ABCD")
        await input.blur();


        await expect(error).toBeVisible();

        // Check between 5 and 20 validation
        await input.focus();
        await input.fill("Generic")
        await input.blur();

        await expect(error).not.toBeVisible();

        // Check above 20 validation
        await input.focus();
        await input.fill("This will never be the name of a person")
        await input.blur();

        await expect(error).toBeVisible();

    })

    test("validate lastName", async ({ page }) => {

        const form = page.locator('div.modal form');
        await expect(form).toBeVisible();

        // Check less than 5 validation

        const input = form.locator("input[name='lastName']");
        const error = form.locator("input[name='lastName'] + span.error");

        await input.focus();
        await input.fill("")
        await input.blur();

        await expect(error).toBeVisible();

        await input.focus();
        await input.fill("ABCD")
        await input.blur();


        await expect(error).toBeVisible();

        // Check between 5 and 20 validation
        await input.focus();
        await input.fill("Generic")
        await input.blur();

        await expect(error).not.toBeVisible();

        // Check above 20 validation
        await input.focus();
        await input.fill("This will never be the name of a person")
        await input.blur();

        await expect(error).toBeVisible();

    })

    test("validate gender", async ({ page }) => {

        const form = page.locator('div.modal form');
        await expect(form).toBeVisible();

        // Check less than 5 validation

        const input = form.locator("select[name='gender']");
        const error = form.locator("select[name='gender'] + span.error");

        await expect(input).toBeVisible();

        // Check between 5 and 20 validation
        await input.focus();
        await input.selectOption({ value: "MALE" })
        await input.blur();

        await expect(error).not.toBeVisible();

        // Check between 5 and 20 validation
        await input.focus();
        await input.selectOption({value: "FEMALE"})
        await input.blur();

        await expect(error).not.toBeVisible();

        await input.focus();
        await input.selectOption('')
        await input.blur();


        await expect(error).toBeVisible();


    })

    test("validate age", async ({ page }) => {

        const form = page.locator('div.modal form');
        await expect(form).toBeVisible();

        // Check less than 5 validation

        const input = form.locator("input[name='age']");
        const error = form.locator("input[name='age'] + span.error");

        await input.focus();
        await input.fill("")
        await input.blur();

        await expect(error).toBeVisible();


        await input.focus();
        await input.fill("13")
        await input.blur();


        await expect(error).toBeVisible();

        // Check between 5 and 20 validation
        await input.focus();
        await input.fill("25")
        await input.blur();

        await expect(error).not.toBeVisible();

        // Check above 20 validation
        await input.focus();
        await input.fill("120")
        await input.blur();

        await expect(error).toBeVisible();


        // Check above 20 validation

        const select = form.locator("select[name='gender']");
        await select.selectOption({ value: "MALE" })
        
        await input.focus();
        await input.fill("114")
        await input.blur();

        await expect(error).toBeVisible();

        await input.focus();
        await input.fill("100")
        await input.blur();

        await expect(error).not.toBeVisible();


        await select.selectOption({ value: "FEMALE" })

        await input.focus();
        await input.fill("119")
        await input.blur();

        await expect(error).toBeVisible();

        await input.focus();
        await input.fill("116")
        await input.blur();

        await expect(error).not.toBeVisible();

    })

})