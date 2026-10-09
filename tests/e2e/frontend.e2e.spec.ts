import { test, expect } from '@playwright/test'

// Requires a seeded database (npm run seed)
test.describe('Frontend', () => {
  test('homepage renders hero and loan products', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('.product-card').first()).toBeVisible()
  })

  test('enquiry form creates a lead', async ({ page }) => {
    await page.goto('http://localhost:3000')
    const form = page.locator('.hero form')
    await form.locator('input[name=fullName]').fill('E2E Tester')
    await form.locator('input[name=phone]').fill('9000000009')
    await form.locator('button[type=submit]').click()
    await expect(page.locator('.lead-form--done')).toContainText('FS-')
  })
})
