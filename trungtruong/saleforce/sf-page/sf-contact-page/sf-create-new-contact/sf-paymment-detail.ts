import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";

export default class sF_PaymentDetail {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE  =========================================================
     */

    // Get edit btn
    public get ele_EditBtn() {
        const ele_EditBtn = this.page.locator('[data-target-selection-name="sfdc:StandardButton.MANAERP__Student_Payment_Detail__c.Edit"]')
        if(ele_EditBtn != null) {
            return ele_EditBtn;
        }else throw new Error('Cannot find ele_EditBtn')
    }

    // Get sync billing address from
    public get ele_SBAF() {
        const ele_DirectDebit = this.page.locator('[name="syncBillingAddressFrom"]')
        if(ele_DirectDebit != null) {
            return ele_DirectDebit;
        }else throw new Error('Cannot find ele_DirectDebit')
    }

    // Get default payment method
    public get ele_DPM() {
        const ele_DPM = this.page.locator('[name="paymentMethod"]')
        if(ele_DPM != null) {
            return ele_DPM;
        }else throw new Error('Cannot find ele_DPM')
    }
    
    // Get postal code
    public get ele_PayerEmail() {
        const ele_PayerEmail = this.page.locator('[name="payersEmail"]')
        if(ele_PayerEmail != null) {
            return ele_PayerEmail;
        }else throw new Error('Cannot find ele_PayerEmail')
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async Edit_PaymentMethod() {

        const eleEditBtn = this.ele_EditBtn
        const eleSBAF = this.ele_SBAF
        const eleDPM = this.ele_DPM
        const payersEmail = this.ele_PayerEmail
        const common = new sF_CommonStep(this.page)
        await eleEditBtn?.click()
        await eleSBAF?.click()
        await this.page.getByRole('option', {name: 'Student'}).click();
        await common.wait(200)
        await payersEmail.fill('testing@domain.com')
        await eleDPM?.click()
        await common.wait(200)
        await this.page.getByText('GMO Credit Card', { exact: true }).click();
        await common.click('Save');

    }

    public async Edit_PaymentMethodATien() {

        const eleEditBtn = this.ele_EditBtn
        const eleSBAF = this.ele_SBAF
        const eleDPM = this.ele_DPM
        const payersEmail = this.ele_PayerEmail
        const common = new sF_CommonStep(this.page)
        await eleEditBtn?.click()
        await eleSBAF?.click()
        await this.page.getByRole('option', {name: 'Student'}).click();
        await common.wait(200)
        await payersEmail.fill('quangtien.pham@manabie.com')
        await eleDPM?.click()
        await common.wait(200)
        await this.page.getByText('GMO Credit Card', { exact: true }).click();
        await common.click('Save');

    }
}