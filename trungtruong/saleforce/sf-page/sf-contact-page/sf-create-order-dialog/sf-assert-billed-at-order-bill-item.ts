import { expect, Page } from "@playwright/test";
import sF_CreateOrder_Dialog from "./sf-create-order-dialog";
import OTM from "../../../utils/product-one-time-material";
import OTF from "../../../utils/product-one-time-fee";
import RM from "../../../utils/product-recurring-material";
import FP from "../../../utils/product-frequency-package";
import generalText from "../../../utils/general-text";

export default class sF_AssertBillAtOrder_BillItem {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= PRODUCT OFFERING ACTION =========================================================
     */

    public async assert_BOD_BillItem_OTM1_T10_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_BillItem_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(OTM.OTM1_T10)

    }

    public async assert_BOD_BillItem_OTF1_T10_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_BillItem_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(OTF.OTF1_T10)

    }

    /**
     ========================================================================================================================================================
     */

    public async assert_BOD_BillItem_RM1_T10_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_BillItem_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(RM.RM1_T10)

    }
    
    public async assert_BOD_BillItem_RM2_T5_TFLAG_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_BillItem_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(RM.RM2_T5_TFLAG)

    }
    
    public async assert_BOD_BillItemPackage_FP1_T10_Array0() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_BillItemPackage_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(FP.FP1_T10)

    }

    public async assert_BOD_BillItem_RM1_T10_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_BillItem_Array1
        const eleString = await ele?.innerText()
        expect(eleString).toContain(RM.RM1_T10)

    }
    
    public async assert_BOD_BillItemPackage_FP1_T10_Array1() {

        const createOrder = new sF_CreateOrder_Dialog(this.page)
        const ele = createOrder.ele_BOD_BillItemPackage_Array1
        const eleString = await ele?.innerText()
        expect(eleString).toContain(FP.FP1_T10)

    }
    
    public async assertBilledAtOrderPackageType(packageBilledAtOrderRows: {
        productName: string,
        isAdjustment: boolean,
        billingPeriod: string,
        isRatio: boolean,
        billingRatio: string, // dont set ratio = null
        associateCourses: {
            courseName: string,
            isVisible: boolean
        }[],
        numberOfDiscount: number,
        isShowDiscount: boolean,
        discountLabel: string | null,
        isProductPricePositive: boolean,
        productPrice: string[]
    }[]) {

        for (let i = 0; i < packageBilledAtOrderRows.length; i++) {

            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const {productName, isAdjustment, billingPeriod, isRatio, billingRatio, associateCourses, numberOfDiscount, isShowDiscount, discountLabel, isProductPricePositive, productPrice} = packageBilledAtOrderRows[i]
            const eleBillItem = await createOrder.ele_BOD_Package(i).innerText()
            const eleDiscountCounting = await createOrder.ele_BOD_PackageDiscount_Counting.count()

            // Check product name
            try {
                expect(eleBillItem).toContain(productName)
            } catch(error) {
                throw new Error(`In billed at order, [${i}] is expected to show '${productName}', but got '${eleBillItem}'`)
            }

            // Check tag adjustment show in bill item or not
            if (isAdjustment) {
                try {
                    expect(eleBillItem).toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In billed at order, [${i}] is expected to show '${generalText.adjustment}', but got '${eleBillItem}'`)
                }
            } else {
                try {
                    expect(eleBillItem).not.toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In billed at order, [${i}] is expected to not show '${generalText.adjustment}', but got '${eleBillItem}'`)
                }
            }

            // Check billing period and billing ratio display
            if (isRatio) {
                try {
                    expect(eleBillItem).toContain(billingPeriod)
                    expect(eleBillItem).toContain(billingRatio)
                } catch(error) {
                    throw new Error(`In billed at order, [${i}] is expected to show '${billingPeriod}' and '${billingRatio}', but got '${eleBillItem}'`)
                }
            } else {
                try {
                    expect(eleBillItem).toContain(billingPeriod)
                    expect(eleBillItem).not.toContain(billingRatio)
                } catch(error) {
                    throw new Error(`In billed at order, [${i}] is expected to show '${billingPeriod}' and not show '${billingRatio}', but got '${eleBillItem}'`)
                }
            }

            // Check associate course
            for(let courseItemIndex = 0; courseItemIndex < associateCourses.length; courseItemIndex ++){
                const {courseName, isVisible} = associateCourses[courseItemIndex];
                if (isVisible) {
                    expect(eleBillItem).toContain(courseName);
                } else {
                     expect(eleBillItem).not.toContain(courseName)
                }
            }

            // Check discount is show or not
            if (isShowDiscount) {
                const eleDiscount = await createOrder.ele_BOD_PackageDiscount(i).innerText()
                try {
                    expect(eleDiscount).toContain(discountLabel)
                } catch(error) {
                    throw new Error(`In billed at order, [${i}] is expected to show '${discountLabel}', but got '${eleDiscount}'`)
                }
            } else {
                try {
                    expect(eleDiscountCounting).toEqual(numberOfDiscount)
                } catch(error) {
                    throw new Error(`In billed at order, number of discount is expected to show '${numberOfDiscount}', but got '${eleDiscountCounting}'`)
                }
            }

            // Check price
            if (isProductPricePositive) {
                try {
                    expect(eleBillItem).not.toContain('-￥')
                    const isPriceValid = productPrice.some(price => eleBillItem.includes(price));
                    expect(isPriceValid).toBe(true);
                } catch(error) {
                    throw new Error(`In billed at order, [${i}] is expected to show '${productPrice}', but got '${eleBillItem}'`)
                }
            } else {
                try {
                    const isPriceValid = productPrice.some(price => eleBillItem.includes(price));
                    expect(isPriceValid).toBe(true);
                } catch(error) {
                    throw new Error(`In billed at order, [${i}] is expected to show '${productPrice}', but got '${eleBillItem}'`)
                }
            }

        }

    }

    public async assert_BOD_BillItemPackage_AssociateCourse(courseList: string[], course1: string[], course2: string[], course3: string[]) {
        for (let i = 0; i < course1.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_BOD_BillItemPackage(i)
            const eleString = await ele.innerText()
            switch (courseList[i]) {
                case 'require course only':
                    // Thực hiện hành động cho 'req 1 only'
                    try {
                        expect(eleString).toContain(course1[i])
                        expect(eleString).not.toContain(course2[i])
                        expect(eleString).not.toContain(course3[i])
                    } catch(error) {
                        throw new Error(`In student billing, [${i}] is expected to show '${course1[i]}', but got '${eleString}'`)
                    }
                    break;
                case 'require & optional1 courses':
                    // Thực hiện hành động cho 'req & opt1 1 only'
                    try {
                        expect(eleString).toContain(course1[i])
                        expect(eleString).toContain(course2[i])
                        expect(eleString).not.toContain(course3[i])
                    } catch(error) {
                        throw new Error(`In student billing, [${i}] is expected to show '${course1[i]}' and '${course2[i]}', but got '${eleString}'`)
                    }
                    break;
                default:
                    // Thực hiện hành động mặc định nếu cần
                    break;
            }
        }
    }

    /**
     ========================================================================================================================================================
     */
    
    public async assert_BOD_BillItemPackage_BillingPeriod(periodList: string[]) {
        for (let i = 0; i < periodList.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_BOD_BillItemPackage(i)
            const eleString = await ele?.innerText()
            try{
                expect(eleString).toContain(periodList[i])
            } catch(error) {
                throw new Error(`Billing period [${i}] is expected to show '${periodList}', but got '${eleString}'`)
            }
        }
    }
    
    public async assert_BOD_BillItemPackage_Ratio(ratioList: string[]) {
        for (let i = 0; i < ratioList.length; i++) {
            const createOrder = new sF_CreateOrder_Dialog(this.page)
            const ele = createOrder.ele_BOD_BillItemPackage(i)
            const eleString = await ele?.innerText()
            try{
                expect(eleString).toContain(ratioList[i])
            } catch(error) {
                throw new Error(`Billing ratio [${i}] is expected to show '${ratioList}', but got '${eleString}'`)
            }
        }
    }

}