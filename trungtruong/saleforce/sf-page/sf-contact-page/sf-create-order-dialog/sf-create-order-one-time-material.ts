import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import sF_CreateOrder_Dialog from "./sf-create-order-dialog";
import OTM from "../../../utils/product-one-time-material"

export default class sF_CreateOrder_OTM {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async select_OTM1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(OTM.OTM1_T10)
        await this.page.getByRole('option', { name: OTM.OTM1_T10, exact: true }).click();

    }

    public async select_OTM2_CBD2021Jan01() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(OTM.OTM2_CBD2021Jan01)
        await this.page.getByRole('option', { name: OTM.OTM2_CBD2021Jan01, exact: true }).click();

    }

    public async select_OTM3_CBD2030Jan01() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(OTM.OTM3_CBD2030Jan01)
        await this.page.getByRole('option', { name: OTM.OTM3_CBD2030Jan01, exact: true }).click();

    }
    
    public async select_OTM4_PriceNotDefine() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        await createOrder.ele_Product_Array0.fill(OTM.OTM4_PriceNotDefine)
        await this.page.getByRole('option', { name: OTM.OTM4_PriceNotDefine, exact: true }).click();

    }
}