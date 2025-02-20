const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const edge = require("selenium-webdriver/edge");
const firefox = require("selenium-webdriver/firefox");

async function saucedemoTest() {
  // deklarasi variabel browsers
  const browsers = [
    {
      name: "chrome",
      Options: new chrome.Options().addArguments("--headless=new"),
    },
    {
      name: "MicrosoftEdge",
      Options: new edge.Options().addArguments("--headless"),
    },
    {
      name: "firefox",
      Options: new firefox.Options().addArguments("--headless"),
    },
  ];

  browsers.forEach(async (browser) => {
    describe("Saucedemo Login Test", function () {
      let driver;
      // menambahkan timeout
      this.timeout(30000);

      beforeEach(async function () {
        driver = await new Builder()
          .forBrowser(browser.name)
          .setChromeOptions(
            browser.name === "chrome" ? browser.Options : undefined
          )
          .setEdgeOptions(
            browser.name === "MicrosoftEdge" ? browser.Options : undefined
          )
          .setFirefoxOptions(
            browser.name === "firefox" ? browser.Options : undefined
          )
          .build();

        // fetch halaman
        await driver.get("https://www.saucedemo.com");
      });

      it("Should login successfully", async function () {
        // Script login Success
        try {
          // Insert username dan password
          await driver
            .findElement(By.xpath("//input[@id='user-name']"))
            .sendKeys("standard_user", Key.RETURN);
          await driver
            .findElement(By.xpath("//input[@id='password']"))
            .sendKeys("secret_sauce", Key.RETURN);
          await driver
            .findElement(By.xpath("//input[@id='login-button']"))
            .click();

          // Assertion untuk verifikasi halaman
          const title = await driver
            .findElement(By.xpath("//div[@class='app_logo']"))
            .getText();
          assert.strictEqual(
            title.includes("Swag Labs"),
            true,
            "Title does not include Swag Labs"
          );

          console.log(`✅ Login Success on browser: ${browser.name}`);
        } catch (error) {
          console.error(`❌ Error in ${browser.name}:`, error);
        }
      });

      it("Should add product to cart", async function () {
        // Script success add product to cart
        try {
          // Insert username dan password
          await driver
            .findElement(By.xpath("//input[@id='user-name']"))
            .sendKeys("standard_user", Key.RETURN);
          await driver
            .findElement(By.xpath("//input[@id='password']"))
            .sendKeys("secret_sauce", Key.RETURN);
          await driver
            .findElement(By.xpath("//input[@id='login-button']"))
            .click();

          // Assertion untuk verifikasi halaman
          const title = await driver
            .findElement(By.xpath("//div[@class='app_logo']"))
            .getText();
          assert.strictEqual(
            title.includes("Swag Labs"),
            true,
            "Title does not include Swag Labs"
          );

          // Click button add to cart
          await driver
            .findElement(
              By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")
            )
            .click();

          // Assertion menambahkan sukses ditambahkan ke cart
          const cart = await driver
            .findElement(By.className("shopping_cart_badge"))
            .getText();
          assert.strictEqual(cart, "1", "Cart count is not 1");
          await driver.sleep(1000);

          console.log(`✅ Add to Cart Success on browser: ${browser.name}`);
        } catch (error) {
          console.error(`❌ Error in ${browser.name}:`, error);
        }
      });

      afterEach(async function () {
        await driver.quit();
      });
    });
  });
}

saucedemoTest();
