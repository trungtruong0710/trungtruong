import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import sF_CreateOrder_Dialog from "./sf-create-order-dialog";
import OTM from "../../../utils/product-one-time-material";
import price from "../../../utils/price";
import discount from "../../../utils/discount";
import billingDate from "../../../utils/billing-date";
import RM from "../../../utils/product-recurring-material";
import billingPeriod from "../../../utils/billing-period";
import FP from "../../../utils/product-frequency-package";
import generalText from "../../../utils/general-text";

export default class sF_AssertUcomingBilling {
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

    public async assert_UB_BillItem_OTM3CBD20300101_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_BillItem_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(OTM.OTM3_CBD2030Jan01)

    }

    public async assert_UB_BillItem_RM1_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_BillItem_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(RM.RM1_T10)

    }

    public async assert_UB_BillItemPackage_FP1_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_FullPackage_Array0
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain(FP.FP1_T10);
        } catch (error) {
            throw new Error(`Expected bill item name to contain '${FP.FP1_T10}', but got: '${eleString}'`);
        }

    }
    
    public async assert_UB_PackageBillItem(packageUpcomingBillingRows: {
        productName: string,
        isAdjustment: boolean,
        billingPeriod: string,
        isRatio: boolean,
        billingRatio: string, // dont set value = null
        associateCourses: {
            courseName: string,
            isVisible: boolean
        }[],
        isShowDiscount: boolean,
        discountLabel: string,
        isProductPricePositive: boolean,
        productPrice: string[],
        billingDate: string[]
    }[]) {

        for (let i = 0; i < packageUpcomingBillingRows.length; i++) {

            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const {productName, isAdjustment, billingPeriod, isRatio, billingRatio, associateCourses, isShowDiscount, discountLabel, isProductPricePositive, productPrice, billingDate} = packageUpcomingBillingRows[i]
            const eleUpcomingBillItem = await createOrder.ele_UB_FullPackage(i).innerText()

            // Check product name
            try {
                expect(eleUpcomingBillItem).toContain(productName)
            } catch(error) {
                throw new Error(`In upcoming billing, [${i}] is expected to show '${productName}', but got '${eleUpcomingBillItem}'`)
            }

            // Check tag adjustment show in bill item or not
            if (isAdjustment) {
                try {
                    expect(eleUpcomingBillItem).toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In upcoming billing, [${i}] is expected to show '${generalText.adjustment}', but got '${eleUpcomingBillItem}'`)
                }
            } else {
                try {
                    expect(eleUpcomingBillItem).not.toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In upcoming billing, [${i}] is expected to not show '${generalText.adjustment}', but got '${eleUpcomingBillItem}'`)
                }
            }

            // Check billing period and billing ratio display
            if (isRatio) {
                try {
                    expect(eleUpcomingBillItem).toContain(billingPeriod)
                    expect(eleUpcomingBillItem).toContain(billingRatio)
                } catch(error) {
                    throw new Error(`In upcoming billing, [${i}] is expected to show '${billingPeriod}' and '${billingRatio}', but got '${eleUpcomingBillItem}'`)
                }
            } else {
                try {
                    expect(eleUpcomingBillItem).toContain(billingPeriod)
                    expect(eleUpcomingBillItem).not.toContain(generalText.billingRatio)
                } catch(error) {
                    throw new Error(`In upcoming billing, [${i}] is expected to show '${billingPeriod}' and not show '${billingRatio}', but got '${eleUpcomingBillItem}'`)
                }
            }

            // Check associate course
            for(let courseItemIndex = 0; courseItemIndex < associateCourses.length; courseItemIndex ++){
                const {courseName, isVisible} = associateCourses[courseItemIndex];
                if (isVisible) {
                    expect(eleUpcomingBillItem).toContain(courseName);
                } else {
                     expect(eleUpcomingBillItem).not.toContain(courseName)
                }
            }

            // Check discount is show or not
            if (isShowDiscount) {
                try {
                    expect(eleUpcomingBillItem).toContain(discountLabel)
                } catch(error) {
                    throw new Error(`In upcoming billing, [${i}] is expected to show '${discountLabel}', but got '${eleUpcomingBillItem}'`)
                }
            } else {
                try {
                    expect(eleUpcomingBillItem).not.toContain(discountLabel)
                } catch(error) {
                    throw new Error(`In upcoming billing, [${i}] is expected to not show '${discountLabel}', but got '${eleUpcomingBillItem}'`)
                }
            }

            // Check price
            if (isProductPricePositive) {
                try {
                    expect(eleUpcomingBillItem).not.toContain('-￥')
                    const isPriceValid = productPrice.some(price => eleUpcomingBillItem.includes(price));
                    expect(isPriceValid).toBe(true);
                } catch(error) {
                    throw new Error(`In upcoming billing, [${i}] is expected to show '${productPrice}', but got '${eleUpcomingBillItem}'`)
                }
            } else {
                try {
                    const isPriceValid = productPrice.some(price => eleUpcomingBillItem.includes(price));
                    expect(isPriceValid).toBe(true);
                } catch(error) {
                    throw new Error(`In upcoming billing, [${i}] is expected to show '${productPrice}', but got '${eleUpcomingBillItem}'`)
                }
            }

            // Check billing date
            try {
                const isBillingDateValid = billingDate.some(date => eleUpcomingBillItem.includes(date));
                expect(isBillingDateValid).toBe(true)
            } catch(error) {
                throw new Error(`In upcoming billing, [${i}] is expected to show '${billingDate}', but got '${eleUpcomingBillItem}'`)
            }

        }

    }

    public async assert_UB_BillItemPackage_AssociateCourse(courseList: string[], course1: string[], course2: string[], course3: string[]) {
        for (let i = 0; i < course1.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_UB_FullPackage(i)
            const eleString = await ele.innerText()
            switch (courseList[i]) {
                case 'require course only':
                    // Thực hiện hành động cho 'req 1 only'
                    try {
                        expect(eleString).toContain(course1[i])
                        expect(eleString).not.toContain(course2[i])
                        expect(eleString).not.toContain(course3[i])
                    } catch(error) {
                        throw new Error(`In order screen, [${i}] is expected to show '${course1[i]}', but got '${eleString}'`)
                    }
                    break;
                case 'require & optional1 courses':
                    // Thực hiện hành động cho 'req & opt1 1 only'
                    try {
                        expect(eleString).toContain(course1[i])
                        expect(eleString).toContain(course2[i])
                        expect(eleString).not.toContain(course3[i])
                    } catch(error) {
                        throw new Error(`In order screen, [${i}] is expected to show '${course1[i]}' and '${course2[i]}', but got '${eleString}'`)
                    }
                    break;
                default:
                    // Thực hiện hành động mặc định nếu cần
                    break;
            }
        }
    }
    
    public async assert_UB_BillItemPackage_BillingPeriodAndRatio(isRatioDisplay: boolean[], billingPeriod: string [], ratio: string[]) {
        for (let i = 0; i < billingPeriod.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_UB_FullPackage(i)
            const eleString = await ele.innerText() 
            try {
                expect(eleString).toContain(billingPeriod[i])
            } catch(error) {
                throw new Error(`In order detail, [${i}] is expected to show '${billingPeriod[i]}', but got '${eleString}'`)
            }
            if (isRatioDisplay[i] == true) {
                try {
                    expect(eleString).toContain(ratio[i])
                } catch(error) {
                    throw new Error(`In order detail, [${i}] is expected to show '${ratio[i]}', but got '${eleString}'`)
                }
            } if (isRatioDisplay[i] == false) {
                try {
                    expect(eleString).not.toContain(ratio[i])
                } catch(error) {
                    throw new Error(`In order detail, [${i}] is expected to show '${ratio[i]}', but got '${eleString}'`)
                }
            }
        }
    }

    public async assert_UB_Price(priceList: string[][]) {
        for (let i = 0; i < priceList.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_UB_Price(i)
            const eleString = await ele?.innerText()
            const isEleStringValid = priceList[i].some(price => eleString.includes(price))
            try {
                expect(isEleStringValid).toBe(true)
            } catch(error) {
                throw new Error(`The price ${eleString} does not match any of the expected price: ${priceList[i].join(', ')}`);
            }            
        }  
    }
    
    public async assert_UB_DiscountIsNotVisible_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_Discount_Array0
        const eleCount = await ele.count()
        if(eleCount) {
            throw new Error("Discount array 0 in upcoming billing should not exist")
        } else {
            console.log("Discount array 0 in upcoming billing does not exist")
        }

    }

    public async assert_UB_Discount_10Percent_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10)

    }

    public async assert_UB_Discount_10Percent_RVD1_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.Percent10_RVD1)

    }

    public async assert_UB_Discount_FixedAmount100_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_Discount_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(discount.fixedAmount100)

    }

    public async assert_UB_BillingDate_2030Jan01_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_BillingDate_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(billingDate.Jan203001)

    }

    public async assert_UB_BillingDate_2050Dec31_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_BillingDate_Array0
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain(billingDate.Dec205031);
        } catch (error) {
            throw new Error(`Expected bill item name to contain '${billingDate.Dec205031}', but got: '${eleString}'`);
        }

    }

    public async assert_UB_BillingDate_2080Dec31_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_UB_BillingDate_Array0
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain(billingDate.Dec208031);
        } catch (error) {
            throw new Error(`Expected bill item name to contain '${billingDate.Dec208031}', but got: '${eleString}'`);
        }

    }
}