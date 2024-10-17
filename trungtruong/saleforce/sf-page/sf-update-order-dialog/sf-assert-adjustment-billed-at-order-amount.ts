import { expect, Page } from "@playwright/test";
import sF_CreateOrder_Dialog from "../sf-contact-page/sf-create-order-dialog/sf-create-order-dialog";
import price from "../../utils/price";
import tax from "../../utils/tax";
import discount from "../../utils/discount";

export default class sF_AssertBillAtOrderAdjust_Amount {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= PRODUCT OFFERING ACTION =========================================================
     */
     
    public async assert_BOD_AdjustPricePackage_MinusYen33_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_PackagePrice_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.minusYen33.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.minusYen33}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_BOD_AdjustPricePackage_MinusYen100_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_PackagePrice_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.minusYen100}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_BOD_AdjustPricePackage_MinusYen333_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_PackagePrice_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.minusYen333.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.minusYen333}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_BOD_AdjustPricePackage_MinusYen367_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_PackagePrice_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.minusYen367.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.minusYen367}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_BOD_AdjustPricePackage_MinusYen1100_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_PackagePrice_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.minusYen1100.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.minusYen1100}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_BOD_AdjustPricePackage_Yen0_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_PackagePrice_Array0
        const eleString = await ele?.innerText()
        try {
            expect(eleString).not.toContain('-')
        } catch(error) {
            throw new Error(`Adjustment price is expected positive amount, but got '${eleString}'`)
        }
        const isEleStringValid = price.Yen0.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.Yen0}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_BOD_AdjustPricePackage_Yen266_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_PackagePrice_Array0
        const eleString = await ele?.innerText()
        try {
            expect(eleString).not.toContain('-')
        } catch(error) {
            throw new Error(`Adjustment price is expected positive amount, but got '${eleString}'`)
        }
        const isEleStringValid = price.Yen266.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.Yen266}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_BOD_AdjustPricePackage_Yen800_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_PackagePrice_Array0
        const eleString = await ele?.innerText()
        try {
            expect(eleString).not.toContain('-')
        } catch(error) {
            throw new Error(`Adjustment price is expected positive amount, but got '${eleString}'`)
        }
        const isEleStringValid = price.Yen800.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.Yen800}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_BOD_AdjustPrice_MinusYen100_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Price_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.minusYen100}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_BOD_AdjustPrice_MinusYen900_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Price_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.minusYen900.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.minusYen900}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_BOD_AdjustPrice_Yen0_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Price_Array0
        const eleString = await ele?.innerText()
        const isEleStringValid = price.Yen0.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.Yen0}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_BOD_AdjustPrice_Yen100_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Price_Array0
        const eleString = await ele?.innerText()
        try {
            expect(eleString).not.toContain('-')
        } catch(error) {
            throw new Error(`Adjustment price is expected positive amount, but got '${eleString}'`)
        }
        const isEleStringValid = price.Yen100.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment price should be '${price.Yen100}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_BOD_DiscountIsNotVisible_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Discount_Array0
        const eleCount = await ele.count()
        if (eleCount > 0) {
            throw new Error("Discount array 0 should not exist")
        } else {
            console.log("Discount in array 0 does not exist")
        }
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

    public async assert_BOD_PackageDiscountIsNotVisible_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_DiscountPackage_Array0
        const eleCount = await ele.count()
        if (eleCount > 0) {
            throw new Error("Discount array 0 should not exist")
        } else {
            console.log("Discount in array 0 does not exist")
        }
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
    
    public async assert_BOD_AdjustTax10_MinusYen3() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        const isEleStringValid = price.minusYen3.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.minusYen3}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_AdjustTax10_MinusYen9() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        const isEleStringValid = price.minusYen9.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.minusYen9}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_AdjustTax10_MinusYen30() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        const isEleStringValid = price.minusYen30.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.minusYen30}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_AdjustTax10_MinusYen33() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        const isEleStringValid = price.minusYen33.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.minusYen33}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_AdjustTax10_MinusYen82() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        const isEleStringValid = price.minusYen82.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.minusYen82}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BOD_AdjustTax10_MinusYen100() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        const isEleStringValid = price.minusYen100.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.minusYen100}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_AdjustTotal_MinusYen33() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.minusYen33.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.minusYen33.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.minusYen33}', but got '${subTotalString}' and ${totalString}`)
        }

    }

    public async assert_BOD_AdjustTotal_MinusYen100() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.minusYen100.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.minusYen100.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.minusYen100}', but got '${subTotalString}' and ${totalString}`)
        }

    }
    
    public async assert_BOD_AdjustTotal_MinusYen333() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.minusYen333.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.minusYen333.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.minusYen333}', but got '${subTotalString}' and ${totalString}`)
        }

    }
    
    public async assert_BOD_AdjustTotal_MinusYen367() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.minusYen367.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.minusYen367.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.minusYen367}', but got '${subTotalString}' and ${totalString}`)
        }

    }

    public async assert_BOD_AdjustTotal_MinusYen900() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.minusYen900.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.minusYen900.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.minusYen900}', but got '${subTotalString}' and ${totalString}`)
        }

    }

    public async assert_BOD_AdjustTotal_MinusYen1100() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.minusYen1100.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.minusYen1100.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.minusYen1100}', but got '${subTotalString}' and ${totalString}`)
        }

    }
    
    public async assert_BOD_AdjustTotal_Yen266() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.Yen266.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.Yen266.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.Yen266}', but got '${subTotalString}' and ${totalString}`)
        }

    }
    
    public async assert_BOD_AdjustTotal_Yen800() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.Yen800.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.Yen800.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.Yen266}', but got '${subTotalString}' and ${totalString}`)
        }

    }
    
    public async assert_BOD_AdjustTax10_Yen0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        const isEleStringValid = price.Yen0.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.Yen0}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_AdjustTax10_Yen9() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        try {
            expect(eleString).not.toContain('-')
        } catch(error) {
            throw new Error(`Adjustment tax is expected positive amount, but got '${eleString}'`)
        }
        const isEleStringValid = price.Yen9.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.Yen9}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_AdjustTax10_Yen24() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        try {
            expect(eleString).not.toContain('-')
        } catch(error) {
            throw new Error(`Adjustment tax is expected positive amount, but got '${eleString}'`)
        }
        const isEleStringValid = price.Yen24.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.Yen24}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_AdjustTax10_Yen73() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_Tax_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(tax.incl10Percent)
        try {
            expect(eleString).not.toContain('-')
        } catch(error) {
            throw new Error(`Adjustment tax is expected positive amount, but got '${eleString}'`)
        }
        const isEleStringValid = price.Yen73.some(price => eleString.includes(price))
        if (!isEleStringValid) {
            throw new Error(`The adjustment tax should be '${price.Yen73}', but got: '${eleString}'`);
        }
        expect(isEleStringValid).toBe(true)

    }
    
    public async assert_BOD_AdjustTotal_Yen0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        const isSubStringValid = price.Yen0.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.Yen0.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.Yen0}', but got '${subTotalString}' and ${totalString}`)
        }

    }
    
    public async assert_BOD_AdjustTotal_Yen100() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const subTotal = createOrder.ele_SubTotal
        const total = createOrder.ele_Total
        const subTotalString = await subTotal?.innerText()
        const totalString = await total?.innerText()
        try {
            expect(subTotalString.split('total')[1]).not.toContain('-')
            expect(totalString).not.toContain('-')
        } catch(error) {
            throw new Error(`Adjustment price is expected positive amount, but got '${subTotalString}' and '${totalString}'`)
        }
        const isSubStringValid = price.Yen100.some(price => subTotalString.includes(price))
        const isTotalStringValid = price.Yen100.some(price => totalString.includes(price))
        try {
            expect(isSubStringValid).toBe(true)
            expect(isTotalStringValid).toBe(true)
        } catch(error) {
            throw new Error(`Total expect is '${price.Yen100}', but got '${subTotalString}' and ${totalString}`)
        }

    }
}