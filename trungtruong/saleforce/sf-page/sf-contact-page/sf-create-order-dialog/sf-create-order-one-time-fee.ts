import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import sF_CreateOrder_Dialog from "./sf-create-order-dialog";
import OTF from "../../../utils/product-one-time-fee";

export default class sF_CreateOrder_OTF {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async select_OTF1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(OTF.OTF1_T10)
        await this.page.getByRole('option', { name: OTF.OTF1_T10, exact: true }).click();

    }
}