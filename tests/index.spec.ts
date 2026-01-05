import { test, expect, type Page } from "@playwright/test";

const links: Record<string, string> = {
  Services: "/#services",
  Contact: "/#contact-form",
  About: "/about",
};

async function testLinks(page: Page) {
  expect(page.getByTestId("home-link")).toHaveAttribute("href", "/");

  if (await page.getByLabel("open sidebar").isVisible()) {
    page.getByLabel("open sidebar").click()
  }
  for (const link in links) {
    const elem = page
      .getByTestId("nav-link")
      .filter({ hasText: link })
      .and(page.getByRole("link", { name: link }));
    await expect(elem).toBeAttached();
    await expect(elem).toHaveAttribute("href");
    expect(await elem.getAttribute("href")).toEqual(links[link]);
  }
}

test("home page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Peridot Therapy/);
  expect(page.locator("link[rel=sitemap]"));
  expect(page.locator("meta[name=description]")).toBeDefined();
  expect(
    page.locator("a.btn").filter({ hasText: "Contact Me" }),
  ).toHaveAttribute("href", "#contact-form");

  await testLinks(page);

  expect(page.getByTitle("Contact Form")).toBeVisible();
});

test("about page", async ({ page }) => {
  await page.goto("/about");
  expect(page).toHaveTitle(/About/);
  expect(page.locator("meta[name=description]")).toBeDefined();
  await testLinks(page);
});
