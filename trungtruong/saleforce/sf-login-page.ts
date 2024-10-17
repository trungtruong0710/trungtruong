import { Page } from "@playwright/test";
import environment from "../saleforce/utils/environment";

export default class sFLoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Login admin account
  public async adminSignIn() {

    await this.page.waitForTimeout(1000)
    await this.page.fill(
      'input[id="username"]',
      environment.username
    );

    await this.page.fill(
      'input[id="password"]',
      environment.password
    );

    await this.page.getByRole('button', { name: 'Log In', exact: true }).click();
    
  }

  public async signIn(username: string, password: string) {

    await this.page.waitForTimeout(1000)
    await this.page.fill(
      'input[id="username"]',
      username
    );

    await this.page.fill(
      'input[id="password"]',
      password
    );

    await this.page.getByRole('button', { name: 'Log In', exact: true }).click();
    
  }
  
}
