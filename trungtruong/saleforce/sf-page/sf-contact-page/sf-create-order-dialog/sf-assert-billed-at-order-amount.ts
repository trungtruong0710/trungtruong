import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import sF_CreateOrder_Dialog from "./sf-create-order-dialog";
import price from "../../../utils/price";
import tax from "../../../utils/tax";
import discount from "../../../utils/discount";

export default class sF_AssertBillAtOrder_Amount {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= PRODUCT OFFERING ACTION =========================================================
     */

    public async assert_BOD_Price_Yen666_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Price_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.Yen666.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_Price_Yen1000_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Price_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.Yen1000.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_Price_Yen1000_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Price_Array1
        const eleString = await ele?.innerText()
        const isEleStringValid = price.Yen1000.some(price => eleString.includes(price))

        if (!isEleStringValid) {
            throw new Error(`The price should be '${price.Yen1000}', but got: '${eleString}'`);
        }

        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_Price_Yen2000_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Price_Array1
        const eleString = await ele?.innerText()
        const isEleStringValid = price.Yen2000.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_PackagePrice(priceList: string[][]) {
        for (let i = 0; i < priceList.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_BOD_PackagePrice(i)
            const eleString = await ele?.innerText()
            const isEleStringValid = priceList[i].some(price => eleString.includes(price))
            if (!isEleStringValid) {
                throw new Error(`Package price [${i}] should be '${priceList[i]}', but got: '${eleString}'`);
            }
            expect(isEleStringValid).toBe(true)
        }
    }

    public async assert_BOD_Discount10Percent_RVD1_MinusYen67_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10_RVD1)
        const isEleStringValid = price.minusYen67.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_Discount10Percent_RVD1_MinusYen100_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10_RVD1)
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_Discount10Percent_MinusYen67_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10)
        const isEleStringValid = price.minusYen67.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }


    public async assert_BOD_Discount10Percent_MinusYen100_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10)
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_DiscountFixedAmount100_MinusYen67_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.fixedAmount100)
        const isEleStringValid = price.minusYen67.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_DiscountFixedAmount100_MinusYen100_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.fixedAmount100)
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_DiscountIsNotVisible_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array1
        const eleCount = await ele.count()
        if (eleCount > 0) {
            throw new Error("Discount array 1 should not exist")
        } else {
            console.log("Discount in array 1 does not exist")
        }

    }

    public async assert_BOD_DiscountFixedAmount100_MinusYen100_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array1
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.fixedAmount100)
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_Discount10Percent_MinusYen200_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array1
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10)
        const isEleStringValid = price.minusYen200.some(price => eleString.includes(price))
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_Discount10PercentPackage_MinusYen67_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_DiscountPackage_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10)
        const isEleStringValid = price.minusYen67.some(price => eleString.includes(price))
        if(!isEleStringValid) {
            throw new Error(`Discount is expect to show '${price.minusYen67}' in billed at order, but got '${eleString}'`)
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_DiscountFixedAmount100Package_MinusYen67_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_DiscountPackage_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.fixedAmount100)
        const isEleStringValid = price.minusYen67.some(price => eleString.includes(price))
        if(!isEleStringValid) {
            throw new Error(`Discount is expect to show '${price.minusYen67}' in billed at order, but got '${eleString}'`)
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_Discount10PercentPackage_MinusYen100_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_DiscountPackage_Array1
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10)
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        if(!isEleStringValid) {
            throw new Error(`Discount is expect to show '${price.minusYen100}' in billed at order, but got '${eleString}'`)
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_DiscountFixedAmount100Package_MinusYen100_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_DiscountPackage_Array1
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.fixedAmount100)
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        if(!isEleStringValid) {
            throw new Error(`Discount is expect to show '${price.minusYen100}' in billed at order, but got '${eleString}'`)
        }
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_Discount10PercentPackage_RVD1_MinusYen134_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_DiscountPackage_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10_RVD1)
        const isEleStringValid = price.minusYen134.some(price => eleString.includes(price))
        if(!isEleStringValid) {
            throw new Error(`Discount is expect to show '${price.minusYen134}' in billed at order, but got '${eleString}'`)
        }
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_PackageDiscountIsNotVisible_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_DiscountPackage_Array1
        const eleCount = await ele.count()
        if (eleCount > 0) {
            throw new Error("Discount array 1 should not exist")
        } else {
            console.log("Discount in array 1 does not exist")
        }

    }
    
    public async assert_BOD_Tax5PercentAmount(taxAmount: string[]) {
            
        const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_BOD_Tax
            const eleString = await ele?.innerText()
            const isEleStringValid = taxAmount.some(price => eleString.includes(price))
            try {
                expect(eleString).toContain(tax.incl5Percent)
                expect(isEleStringValid).toBe(true)
            } catch(error) {
                throw new Error(`The tax should be '${taxAmount}', but got: '${eleString}'`)
            }
    }
    
    public async assert_BOD_Tax10PercentAmount(taxAmount: string[]) {
            
        const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_BOD_Tax
            const eleString = await ele?.innerText()
            const isEleStringValid = taxAmount.some(price => eleString.includes(price))
            try {
                expect(eleString).toContain(tax.incl10Percent)
                expect(isEleStringValid).toBe(true)
            } catch(error) {
                throw new Error(`The tax should be '${taxAmount}', but got: '${eleString}'`)
            }
    }

    public async assert_BOD_Total(priceList: string[]) {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = priceList.some(price => subTotalString.includes(price))
        const isTotalStringValid = priceList.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${priceList}', but got '${subTotalString}' and ${totalString}`)
        }
    }
    
    public async assertBilledAtOrderTotal(isAmountPositive: boolean, priceList: string[]) {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = priceList.some(price => subTotalString.includes(price))
        const isTotalStringValid = priceList.some(price => totalString.includes(price))

        if (isAmountPositive) {
            try {
                expect(subTotalString).not.toContain('-￥')
                expect(totalString).not.toContain('-￥')
                expect(isSubStringValid).toBe(true)
                expect(isTotalStringValid).toBe(true)
            } catch(error) {
                throw new Error(`In billed at order, total is expected to show '${priceList}', but got '${subTotalString}' and '${totalString}'`)
            }
        } else {
            try {
                expect(isSubStringValid).toBe(true)
                expect(isTotalStringValid).toBe(true)
            } catch(error) {
                throw new Error(``)
            }
        }
    }
    
}