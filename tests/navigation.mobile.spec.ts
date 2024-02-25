import {test, expect} from '@playwright/test'

test.describe('mobile navigation', () => {
  test('shows a hamburger', async ({page}) => {
    await page.goto('/')

    await expect(page.getByTestId('hamburger-top')).toBeVisible()
  })

  test('initially, the menu is not shown', async ({page}) => {
    await page.goto('/')

    await expect(page.getByRole('menu')).not.toBeInViewport()
  })

  test('clicking the hamburger opens the menu', async ({page}) => {
    await page.goto('/')

    await page.click('data-testid=hamburger-trigger')

    await expect(page.getByRole('menu')).toBeInViewport()
  })
})
