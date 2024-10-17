import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import amount from "../../../utils/amount";

export default class sF_AddOrUpdatePrice_Dialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE =========================================================
     */

    // Get add or update price title
    public get ele_PO_AddOrUpdatePrice_Dialog() {
        const ele_PO_AddOrUpdatePrice_Dialog = this.page.getByRole('heading', { name: 'Add/Update Product Prices' })
        if(ele_PO_AddOrUpdatePrice_Dialog != null) {
            return ele_PO_AddOrUpdatePrice_Dialog;
        }else throw new Error('Cannot find ele_PO_AddOrUpdatePrice_Dialog')
    }

    // Get one time price amount
    public get ele_PO_PriceAmount() {
        const ele_PO_PriceAmount = this.page.getByLabel('*Price', { exact: true })
        if(ele_PO_PriceAmount != null) {
            return ele_PO_PriceAmount;
        }else throw new Error('Cannot find ele_PO_PriceAmount')
    }

    // Get recurring BP1 price amount
    public get ele_PO_Recurring_BillingPeriod1() {
        const ele_PO_Recurring_BillingPeriod1 = this.page.getByTestId('1991-2020__null').getByLabel('*')
        if(ele_PO_Recurring_BillingPeriod1 != null) {
            return ele_PO_Recurring_BillingPeriod1;
        }else throw new Error('Cannot find ele_PO_Recurring_BillingPeriod1')
    }

    // Get recurring BP2 price amount
    public get ele_PO_Recurring_BillingPeriod2() {
        const ele_PO_Recurring_BillingPeriod2 = this.page.getByTestId('2021-2050__null').getByLabel('*')
        if(ele_PO_Recurring_BillingPeriod2 != null) {
            return ele_PO_Recurring_BillingPeriod2;
        }else throw new Error('Cannot find ele_PO_Recurring_BillingPeriod2')
    }

    // Get recurring BP3 price amount
    public get ele_PO_Recurring_BillingPeriod3() {
        const ele_PO_Recurring_BillingPeriod3 = this.page.getByTestId('2051-2080__null').getByLabel('*')
        if(ele_PO_Recurring_BillingPeriod3 != null) {
            return ele_PO_Recurring_BillingPeriod3;
        }else throw new Error('Cannot find ele_PO_Recurring_BillingPeriod3')
    }

    // Get recurring BP4 price amount
    public get ele_PO_Recurring_BillingPeriod4() {
        const ele_PO_Recurring_BillingPeriod4 = this.page.getByTestId('2081-2110__null').getByLabel('*')
        if(ele_PO_Recurring_BillingPeriod4 != null) {
            return ele_PO_Recurring_BillingPeriod4;
        }else throw new Error('Cannot find ele_PO_Recurring_BillingPeriod4')
    }

    // Get recurring BP5 price amount
    public get ele_PO_Recurring_BillingPeriod5() {
        const ele_PO_Recurring_BillingPeriod5 = this.page.getByTestId('2111-2140__null').getByLabel('*')
        if(ele_PO_Recurring_BillingPeriod5 != null) {
            return ele_PO_Recurring_BillingPeriod5;
        }else throw new Error('Cannot find ele_PO_Recurring_BillingPeriod5')
    }

    // Get master price amount
    public get ele_PO_MasterPrice() {
        const ele_PO_MasterPrice = this.page.getByTestId('MasterInput__1').getByLabel('')
        if(ele_PO_MasterPrice != null) {
            return ele_PO_MasterPrice;
        }else throw new Error('Cannot find ele_PO_MasterPrice')
    }

    /**
     ======================================================= ACTION =========================================================
     */

    // assert add or update price dialog is open
     public async assert_AddOrUpdatePrice_DialogIsOpen() {

        const ele = this.ele_PO_AddOrUpdatePrice_Dialog
        const eleString = await ele.innerText()
        expect(eleString).toContain('Add/Update Product Prices')

    }

    // select price type = Enrolled Price
    public async select_PriceType_Enrolled() {

        const common = new sF_CommonStep(this.page)
        await this.page.getByRole('combobox', { name: '*Price Type' }).selectOption('ENROLLED_PRICE');
        await common.wait(200);

    }

    // fill one time price amount = 1000
    public async fill_OneTimePriceAmount_1000() {

        const ele = this.ele_PO_PriceAmount
        await ele?.fill(amount.amount1000)

    }

    // fill recurring price
    public async fill_RecurringPriceAmount() {

        const eleBP1 = this.ele_PO_Recurring_BillingPeriod1
        const eleBP2 = this.ele_PO_Recurring_BillingPeriod2
        const eleBP3 = this.ele_PO_Recurring_BillingPeriod3
        const eleBP4 = this.ele_PO_Recurring_BillingPeriod4
        const eleBP5 = this.ele_PO_Recurring_BillingPeriod5
        await eleBP1?.fill('1000');
        await eleBP2?.fill('2000');
        await eleBP3?.fill('3000');
        await eleBP4?.fill('4000');
        await eleBP5?.fill('5000');
        
    }

    // fill recurring package price
    public async fill_MasterPriceAmount5000() {

        const ele = this.ele_PO_MasterPrice
        await ele?.fill('5000');
        
    }


}