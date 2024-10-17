import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import sF_CreateOrder_Dialog from "./sf-create-order-dialog";
import FP from "../../../utils/product-frequency-package";

export default class sF_CreateOrder_FP {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async select_FP1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(FP.FP1_T10)
        await this.page.getByRole('option', { name: FP.FP1_T10, exact: true }).click();

    }
    
    public async select_FP2_T10_TFLAG() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(FP.FP2_T10_TFLAG)
        await this.page.getByRole('option', { name: FP.FP2_T10_TFLAG, exact: true }).click();

    }
}