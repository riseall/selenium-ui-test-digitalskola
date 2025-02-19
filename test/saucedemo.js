const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoTest() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("https://www.saucedemo.com");
    await driver
      .findElement(By.xpath("//input[@id='user-name']"))
      .sendKeys("standard_user", Key.RETURN);
    await driver
      .findElement(By.xpath("//input[@id='password']"))
      .sendKeys("secret_sauce", Key.RETURN);
    await driver.findElement(By.xpath("//input[@id='login-button']")).click();

    const title = await driver
      .findElement(By.xpath("//div[@class='app_logo']"))
      .getText();
    assert.strictEqual(
      title.includes("Swag Labs"),
      true,
      "Title does not include Swag Labs"
    );

    await driver
      .findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']"))
      .click();

    const cart = await driver
      .findElement(By.className(".shopping_cart_badge"))
      .getText();
    assert.strictEqual(cart, "1", "Cart count is not 1");
    await driver.sleep(1000);

    console.log("Testing Success");
  } finally {
    await driver.quit();
  }
}

saucedemoTest();
