const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const edge = require("selenium-webdriver/edge");
const firefox = require("selenium-webdriver/firefox");

async function saucedemoTest() {
  describe("Saucedemo Login Test", function () {
    // menambahkan timeout
    this.timeout(30000);

    // deklarasi variavel browsers
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

    it("Should login successfully", async function () {
      // Script login Success
      for (browser of browsers) {
        let driver = await new Builder()
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

        try {
          // fetch halaman
          await driver.get("https://www.saucedemo.com");

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

          console.log(`✅ Testing Success on browser: ${browser.name}`);
        } catch (error) {
          console.error(`❌ Error in ${browser.name}:`, error);
        } finally {
          await driver.quit();
        }
      }
    });

    it("Should add product to cart", async function () {
      // Script success add product to cart
      for (browser of browsers) {
        let driver = await new Builder()
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

        try {
          // fetch halaman
          await driver.get("https://www.saucedemo.com");

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
            .findElement(By.xpath("//a[.='1']"))
            .getText();
          assert.strictEqual(cart, "1", "Cart count is not 1");
          await driver.sleep(1000);

          console.log(`✅ Testing Success on browser: ${browser.name}`);
        } catch (error) {
          console.error(`❌ Error in ${browser.name}:`, error);
        } finally {
          await driver.quit();
        }
      }
    });
  });
}

saucedemoTest();
