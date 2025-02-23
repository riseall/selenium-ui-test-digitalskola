const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const data = require("../fixtures/dataTest");

async function loginTest() {
  describe("Saucedemo Add Product to Cart Test", function () {
    let driver;
    let loginPage;
    let inventoryPage;

    // menambahkan timeout
    this.timeout(30000);

    beforeEach(async function () {
      driver = await new Builder().forBrowser("chrome").build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      //open url
      await loginPage.open(data.baseUrl);
      //login
      await loginPage.login(data.validUser.username, data.validUser.password);
    });

    it("ATC-001_Add product to cart successfully", async () => {
      try {
        await inventoryPage.addToCart("Sauce Labs Backpack");

        //Menambahkan Assert
        await inventoryPage.verifyAddToCart("1", data.message.addToCart);

        await driver.sleep(1000);
        console.log(data.log.addToCartSuccess);
      } catch (error) {
        console.log(data.log.testFailed, error);
      }
    });

    it("ATC-002_Remove product from cart successfully", async () => {
      try {
        // add product
        await inventoryPage.addToCart("Sauce Labs Backpack");
        // Assert add to cart
        await inventoryPage.verifyAddToCart("1", data.message.addToCart);
        // remove product
        await inventoryPage.removeFromCart();

        await driver.sleep(1000);
        console.log(data.log.removeFromCart);
      } catch (error) {
        console.log(data.log.testFailed, error);
      }
    });

    afterEach(async function () {
      await driver.quit();
    });
  });
}

loginTest();
