import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../sf-common-steps";
import sF_CreateOrder_Dialog from "../sf-contact-page/sf-create-order-dialog/sf-create-order-dialog";
import OTM from "../../utils/product-one-time-material";
import price from "../../utils/price";
import discount from "../../utils/discount";
import billingDate from "../../utils/billing-date";
import RM from "../../utils/product-recurring-material";
import billingPeriod from "../../utils/billing-period";
import FP from "../../utils/product-frequency-package";
import generalText from "../../utils/general-text";

export default class sF_AssertAdjustmentUcomingBilling {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= PRODUCT OFFERING ACTION =========================================================
     */

    public async assert_UB_NoInformation() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_NoInformation
        const eleString = await ele?.innerText()
        expect(eleString).toContain('No Information')

    }

    public async assert_UB_AdjustmentBillItem(adjustmentProductList: string[]) {
        for (let i = 0; i < adjustmentProductList.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_UB_FullPackage(i)
            const eleString = await ele?.innerText()
            try {
                expect(eleString).toContain(generalText.adjustment)
                expect(eleString).toContain(adjustmentProductList[i]);
            } catch (error) {
                throw new Error(`Adjustment bill item name in upcoming billing ['${[i]}'] is expected to show '${adjustmentProductList[i]}', but got: '${eleString}'`);
            }
        }
    }
    
}