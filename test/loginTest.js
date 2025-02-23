const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const data = require("../fixtures/dataTest");

async function loginTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let loginPage;
    let inventoryPage;

    // menambahkan timeout
    this.timeout(30000);

    beforeEach(async function () {
      driver = await new Builder().forBrowser("chrome").build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      await loginPage.open(data.baseUrl);
    });

    it("LG-001_Login success with valid credentials", async () => {
      try {
        await loginPage.login(data.validUser.username, data.validUser.password);

        //Menambahkan Assert
        await inventoryPage.verifyTitleText(
          data.expectedText.title,
          data.message.title
        );

        console.log(data.log.loginSuccess);
      } catch (error) {
        console.log(data.log.testFailed, error);
      }
    });

    it("LG-002_Login failed with empty username and valid password", async () => {
      try {
        await loginPage.login(
          data.invalidUser.emptyUser,
          data.validUser.password
        );

        //Menambahkan Assert
        await loginPage.assertErrorMessage(
          data.expectedText.emptyUser,
          data.message.emptyUser
        );

        console.log(data.log.loginFailed);
      } catch (error) {
        console.log(data.log.testFailed, error);
      }
    });

    it("LG-003_Login failed with valid username and empty password", async () => {
      try {
        await loginPage.login(
          data.validUser.username,
          data.invalidUser.emptyPass
        );

        //Menambahkan Assert
        await loginPage.assertErrorMessage(
          data.expectedText.emptyPass,
          data.message.emptyPass
        );

        console.log(data.log.loginFailed);
      } catch (error) {
        console.log(data.log.testFailed, error);
      }
    });

    it("LG-004_Login failed with invalid username and valid password", async () => {
      try {
        await loginPage.login(
          data.invalidUser.username,
          data.validUser.password
        );

        //Menambahkan Assert
        await loginPage.assertErrorMessage(
          data.expectedText.invalid,
          data.message.invalid
        );

        console.log(data.log.loginFailed);
      } catch (error) {
        console.log(data.log.testFailed, error);
      }
    });

    it("LG-001_Login failed with valid username and invalid password", async () => {
      try {
        await loginPage.login(
          data.validUser.username,
          data.invalidUser.password
        );

        //Menambahkan Assert
        await loginPage.assertErrorMessage(
          data.expectedText.invalid,
          data.message.invalid
        );

        console.log(data.log.loginFailed);
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
