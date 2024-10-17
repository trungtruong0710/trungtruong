import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import sF_CreateOrder_Dialog from "./sf-create-order-dialog";
import RM from "../../../utils/product-recurring-material";

export default class sF_CreateOrder_RM {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async select_RM1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(RM.RM1_T10)
        await this.page.getByRole('option', { name: RM.RM1_T10, exact: true }).click();

    }

    public async select_RM2_T5_TFLAG() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(RM.RM2_T5_TFLAG)
        await this.page.getByRole('option', { name: RM.RM2_T5_TFLAG, exact: true }).click();

    }
}