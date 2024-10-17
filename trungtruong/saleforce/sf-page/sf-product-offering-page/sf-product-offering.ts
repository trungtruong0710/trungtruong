import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../sf-common-steps";

export default class sF_ProductOffering {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE PRODUCT OFFERING =========================================================
     */

    // Get Product Name
    public get ele_PO_AddOrUpdatePrice() {
        const ele_PO_AddOrUpdatePrice = this.page.locator('[name="MANAERP__Product__c.MANAERP__Add_Product_Prices"]')
        if(ele_PO_AddOrUpdatePrice != null) {
            return ele_PO_AddOrUpdatePrice;
        }else throw new Error('Cannot find ele_PO_AddOrUpdatePrice')
    }

    // Get add associate course
    public get ele_PO_AddAssociateCourse_Dialog() {
        const ele_PO_AddAssociateCourse_Dialog = this.page.locator('[name="MANAERP__Product__c.MANAERP__Add_Course"]')
        if(ele_PO_AddAssociateCourse_Dialog != null) {
            return ele_PO_AddAssociateCourse_Dialog;
        }else throw new Error('Cannot find ele_PO_AddAssociateCourse_Dialog')
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async clickBtn_PO_AddOrUpdatePrice() {

        const ele = this.ele_PO_AddOrUpdatePrice
        const common = new sF_CommonStep(this.page)
        await common.wait(500);
        await ele?.click();

    }

    public async clickBtn_PO_AddAssociateCourse() {

        const ele = this.ele_PO_AddAssociateCourse_Dialog
        const common = new sF_CommonStep(this.page)
        await common.wait(500);
        await ele?.click();

    }
}