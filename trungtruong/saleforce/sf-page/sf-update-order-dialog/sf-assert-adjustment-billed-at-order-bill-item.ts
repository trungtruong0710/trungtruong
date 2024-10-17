import { expect, Page } from "@playwright/test";
import sF_CreateOrder_Dialog from "../sf-contact-page/sf-create-order-dialog/sf-create-order-dialog";
import OTM from "../../utils/product-one-time-material";
import generalText from "../../utils/general-text";
import FP from "../../utils/product-frequency-package";

export default class sF_AssertBillAtOrderAdjust_BillItem {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= ONE TIME MATERIAL =========================================================
     */

     public async assert_BOD_AdjustmentBillItem(adjustmentProductName: string[]) {
        for (let i = 0; i < adjustmentProductName.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_BOD_BillItem(i)
            const eleString = await ele?.innerText()
            try {
                expect(eleString).toContain(generalText.adjustment)
                expect(eleString).toContain(adjustmentProductName[i])
            } catch(error) {
                throw new Error(`In update screen, bill item is expected to show '[Adjustment] ${adjustmentProductName}', but got '${eleString}'`)
            }
        }
    }
    
}