import { test, expect } from '@playwright/test'

test('Can click button an call birthdates', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page).toHaveTitle('Whose birthday?')
  await expect(page.getByRole('img')).toBeVisible()

  await page.getByRole('button', { name: 'Find out!' }).click()

  await Promise.race([
    page.waitForSelector('[aria-label="loader"]'),
    page.waitForSelector('[aria-label="birthdateList"]', { timeout: 5000 }),
    page.waitForSelector('[aria-label="errorModal"]', { timeout: 5000 })
  ])

  await expect(page.getByRole('img')).not.toBeVisible()
})
