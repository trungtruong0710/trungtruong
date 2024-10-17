import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../sf-common-steps";
import sF_DateTime from "../../sf-date-time";
import status from "../../utils/status";
import price from "../../utils/price";
import discount from "../../utils/discount";
import billingDate from "../../utils/billing-date";
import billingPeriod from "../../utils/billing-period";
import FP from "../../utils/product-frequency-package";
import orderType from "../../utils/order-type";
import generalText from "../../utils/general-text";
import OTM from "../../utils/product-one-time-material";
import { sFApplications, sFCommonStep } from "../test-hook";

export default class sF_OrderDetail {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE ORDER DETAIL =========================================================
     */

     // Get order status
    public get ele_OrderStatus() {
        const ele_OrderStatus = this.page.locator('lightning-layout-item').filter({ hasText: 'Order Status' })
        if(ele_OrderStatus != null) {
            return ele_OrderStatus;
        }else throw new Error('Cannot find ele_OrderStatus')
    }

     // Get order type
     public get ele_OrderType() {
        const ele_OrderType = this.page.locator('lightning-layout-item').filter({ hasText: 'Order Type' })
        if(ele_OrderType != null) {
            return ele_OrderType;
        }else throw new Error('Cannot find ele_OrderType')
    }
    
    // Get product list
    public ele_OrderDetail_ProductList_ProductName(position: number) {
       const ele_OrderDetail_ProductList_ProductName = this.page.locator('[data-label="Name"] [data-label="Name"]').nth(position)
       if(ele_OrderDetail_ProductList_ProductName != null) {
           return ele_OrderDetail_ProductList_ProductName;
       }else throw new Error('Cannot find ele_OrderDetail_ProductList_ProductName')
   }
    
     // Get product list
     public get ele_OrderDetail_ProductList_ProductName_Array0() {
        const ele_OrderDetail_ProductList_ProductName_Array0 = this.page.locator('[data-label="Name"] [data-label="Name"]').nth(0)
        if(ele_OrderDetail_ProductList_ProductName_Array0 != null) {
            return ele_OrderDetail_ProductList_ProductName_Array0;
        }else throw new Error('Cannot find ele_OrderDetail_ProductList_ProductName_Array0')
    }

    // Get discount
     public ele_OrderDetail_ProductList_Discount(position: number) {
        const ele_OrderDetail_ProductList_Discount = this.page.locator('[data-label="Discount"] [data-label="Discount"]').nth(position)
        if(ele_OrderDetail_ProductList_Discount != null) {
            return ele_OrderDetail_ProductList_Discount;
        }else throw new Error('Cannot find ele_OrderDetail_ProductList_Discount')
    }
    
    // Get course
    public ele_OrderDetail_ProductList_Course(position: number) {
       const ele_OrderDetail_ProductList_Course = this.page.locator('[data-label="Courses"] [data-label="Courses"]').nth(position)
       if(ele_OrderDetail_ProductList_Course != null) {
           return ele_OrderDetail_ProductList_Course;
       }else throw new Error('Cannot find ele_OrderDetail_ProductList_Course ' + position)
   }
    
     // Get course
     public get ele_OrderDetail_ProductList_Course_Array0() {
        const ele_OrderDetail_ProductList_Course_Array0 = this.page.locator('[data-label="Courses"] [data-label="Courses"]').nth(0)
        if(ele_OrderDetail_ProductList_Course_Array0 != null) {
            return ele_OrderDetail_ProductList_Course_Array0;
        }else throw new Error('Cannot find ele_OrderDetail_ProductList_Course_Array0')
    }

     // Get start date
     public get eleOrderDetailProductListStartDate() {
        const eleOrderDetailProductListStartDate = this.page.locator('[data-label="Start Date"] [data-label="Start Date"]')
        if(eleOrderDetailProductListStartDate != null) {
            return eleOrderDetailProductListStartDate;
        }else throw new Error('Cannot find eleOrderDetailProductListStartDate')
    }

     // Get start date
     public ele_OrderDetail_ProductList_StartDate(position: number) {
        const ele_OrderDetail_ProductList_StartDate = this.page.locator('[data-label="Start Date"] [data-label="Start Date"]').nth(position)
        if(ele_OrderDetail_ProductList_StartDate != null) {
            return ele_OrderDetail_ProductList_StartDate;
        }else throw new Error('Cannot find ele_OrderDetail_ProductList_StartDate ' + position)
    }

    // Get billing no item
    public get ele_OrderDetail_Billing_BillingNoItem() {
        const ele_OrderDetail_Billing_BillingNoItem = this.page.locator('[title="Billing Item (0)"]')
        if(ele_OrderDetail_Billing_BillingNoItem != null) {
            return ele_OrderDetail_Billing_BillingNoItem;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingNoItem')
    }

     // Get billing name
     public get ele_OrderDetail_Billing_BillingName_Couting() {
        const ele_OrderDetail_Billing_BillingName_Couting = this.page.locator('[data-label="Description"] [data-label="Description"]')
        if(ele_OrderDetail_Billing_BillingName_Couting != null) {
            return ele_OrderDetail_Billing_BillingName_Couting;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingName_Couting')
    }

    // Get billing name
    public ele_OrderDetail_Billing_BillingName(position: number) {
       const ele_OrderDetail_Billing_BillingName = this.page.locator('[data-label="Description"] [data-label="Description"]').nth(position)
       if(ele_OrderDetail_Billing_BillingName != null) {
           return ele_OrderDetail_Billing_BillingName;
       }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingName')
   }

    // Get billing status
    public ele_OrderDetail_Billing_BillingStatus(position: number) {
        const ele_OrderDetail_Billing_BillingStatus = this.page.locator('[data-label="Status"] [data-label="Status"]').nth(position)
        if(ele_OrderDetail_Billing_BillingStatus != null) {
            return ele_OrderDetail_Billing_BillingStatus;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingStatus')
    }

     // Get billing status array 0
     public get ele_OrderDetail_Billing_BillingStatus_Array0() {
        const ele_OrderDetail_Billing_BillingStatus_Array0 = this.page.locator('[data-label="Status"] [data-label="Status"]').nth(0)
        if(ele_OrderDetail_Billing_BillingStatus_Array0 != null) {
            return ele_OrderDetail_Billing_BillingStatus_Array0;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingStatus_Array0')
    }

     // Get billing status array 1
     public get ele_OrderDetail_Billing_BillingStatus_Array1() {
        const ele_OrderDetail_Billing_BillingStatus_Array1 = this.page.locator('[data-label="Status"] [data-label="Status"]').nth(1)
        if(ele_OrderDetail_Billing_BillingStatus_Array1 != null) {
            return ele_OrderDetail_Billing_BillingStatus_Array1;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingStatus_Array1')
    }

    // Get billing status array 2
    public get ele_OrderDetail_Billing_BillingStatus_Array2() {
       const ele_OrderDetail_Billing_BillingStatus_Array2 = this.page.locator('[data-label="Status"] [data-label="Status"]').nth(2)
       if(ele_OrderDetail_Billing_BillingStatus_Array2 != null) {
           return ele_OrderDetail_Billing_BillingStatus_Array2;
       }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingStatus_Array2')
   }

    // Get billing status array 3
    public get ele_OrderDetail_Billing_BillingStatus_Array3() {
        const ele_OrderDetail_Billing_BillingStatus_Array3 = this.page.locator('[data-label="Status"] [data-label="Status"]').nth(3)
        if(ele_OrderDetail_Billing_BillingStatus_Array3 != null) {
            return ele_OrderDetail_Billing_BillingStatus_Array3;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingStatus_Array3')
    }

    // Get billing status array 4
    public get ele_OrderDetail_Billing_BillingStatus_Array4() {
        const ele_OrderDetail_Billing_BillingStatus_Array4 = this.page.locator('[data-label="Status"] [data-label="Status"]').nth(4)
        if(ele_OrderDetail_Billing_BillingStatus_Array4 != null) {
            return ele_OrderDetail_Billing_BillingStatus_Array4;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingStatus_Array4')
    }

    // Get billing date
    public ele_OrderDetail_Billing_BillingDate(position: number) {
       const ele_OrderDetail_Billing_BillingDate = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(position)
       if(ele_OrderDetail_Billing_BillingDate != null) {
           return ele_OrderDetail_Billing_BillingDate;
       }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingDate ' + position)
   }

     // Get billing date array 0
     public get ele_OrderDetail_Billing_BillingDate_Array0() {
        const ele_OrderDetail_Billing_BillingDate_Array0 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(0)
        if(ele_OrderDetail_Billing_BillingDate_Array0 != null) {
            return ele_OrderDetail_Billing_BillingDate_Array0;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingDate_Array0')
    }

     // Get billing date array 1
     public get ele_OrderDetail_Billing_BillingDate_Array1() {
        const ele_OrderDetail_Billing_BillingDate_Array1 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(1)
        if(ele_OrderDetail_Billing_BillingDate_Array1 != null) {
            return ele_OrderDetail_Billing_BillingDate_Array1;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingDate_Array1')
    }

    // Get billing date array 2
    public get ele_OrderDetail_Billing_BillingDate_Array2() {
       const ele_OrderDetail_Billing_BillingDate_Array2 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(2)
       if(ele_OrderDetail_Billing_BillingDate_Array2 != null) {
           return ele_OrderDetail_Billing_BillingDate_Array2;
       }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingDate_Array2')
   }

    // Get billing date array 3
    public get ele_OrderDetail_Billing_BillingDate_Array3() {
        const ele_OrderDetail_Billing_BillingDate_Array3 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(3)
        if(ele_OrderDetail_Billing_BillingDate_Array3 != null) {
            return ele_OrderDetail_Billing_BillingDate_Array3;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_BillingDate_Array3')
    }

    // Get amount
    public ele_OrderDetail_Billing_Amount(position: number) {
        const ele_OrderDetail_Billing_Amount = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(position)
        if(ele_OrderDetail_Billing_Amount != null) {
            return ele_OrderDetail_Billing_Amount;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_Amount ' + position)
    }

     // Get amount array 0
     public get ele_OrderDetail_Billing_Amount_Array0() {
        const ele_OrderDetail_Billing_Amount_Array0 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(0)
        if(ele_OrderDetail_Billing_Amount_Array0 != null) {
            return ele_OrderDetail_Billing_Amount_Array0;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_Amount_Array0')
    }

     // Get amount array 1
     public get ele_OrderDetail_Billing_Amount_Array1() {
        const ele_OrderDetail_Billing_Amount_Array1 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(1)
        if(ele_OrderDetail_Billing_Amount_Array1 != null) {
            return ele_OrderDetail_Billing_Amount_Array1;
        }else throw new Error('Cannot find ele_OrderDetail_Billing_Amount_Array1')
    }

    // Get amount array 2
    public get ele_OrderDetail_Billing_Amount_Array2() {
       const ele_OrderDetail_Billing_Amount_Array2 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(2)
       if(ele_OrderDetail_Billing_Amount_Array2 != null) {
           return ele_OrderDetail_Billing_Amount_Array2;
       }else throw new Error('Cannot find ele_OrderDetail_Billing_Amount_Array2')
   }

   // Get amount array 3
   public get ele_OrderDetail_Billing_Amount_Array3() {
      const ele_OrderDetail_Billing_Amount_Array3 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(3)
      if(ele_OrderDetail_Billing_Amount_Array3 != null) {
          return ele_OrderDetail_Billing_Amount_Array3;
      }else throw new Error('Cannot find ele_OrderDetail_Billing_Amount_Array3')
  }

    /**
     ======================================================= FILL INFORMATION IN PRODUCT DETAIL =========================================================
     */

     public async assert_VoidIsDisable() {

        const eleShowMenuBtn = this.page.getByRole('button', { name: 'Show menu' })
        const eleVoidBtn = this.page.getByRole('menuitem', { name: 'Void' })
        const common = new sF_CommonStep(this.page)
        await common.wait(500);
        await eleShowMenuBtn?.click();
        await common.wait(200);
        if(eleVoidBtn) {
            throw new Error(`In order detail, void btn is expected to disable, but not`)
        }

    }

    public async clickVoid() {

        const eleShowMenuBtn = this.page.getByRole('button', { name: 'Show menu' })
        const eleVoidBtn = this.page.getByRole('menuitem', { name: 'Void' })
        const common = new sF_CommonStep(this.page)
        await common.wait(500);
        await eleShowMenuBtn?.click();
        await common.wait(200);
        await eleVoidBtn?.click();
        await common.click('Confirm');

    }
    
    public async assert_OrderDetail_ProductList_ProductName(productList: string[]) {
        for (let i = 0; i < productList.length; i++) {
            const ele = this.ele_OrderDetail_ProductList_ProductName(i)
            const eleString = await ele.innerText()
            try {
                expect(eleString).toContain(productList[i])
            } catch(error) {
                throw new Error(`Product name is expect to show "${productList[i]}", but got "${eleString}"`)
            }
            }
    }

    public async assert_OrderDetail_Discount(discountName: string[]) {
        for (let i = 0; i< discountName.length; i++) {
            const ele = this.ele_OrderDetail_ProductList_Discount(i)
            const eleString = await ele.innerText()
            try {
                expect(eleString).toContain(discountName[i])
            } catch(error) {
                throw new Error(`In order detail product discount [${i}] is expected to show '${discountName[i]}', but got '${eleString}'`)
            }
        }
    }
    
    public async assert_OrderDetail_ProductList_CourseIsNull_Array0() {

        const ele = this.ele_OrderDetail_ProductList_Course_Array0
        const eleString = await ele.innerText()
        try {
            expect(eleString).toContain('--')
        } catch(error) {
            throw new Error(`In order detail, course is expected to show '--', but got '${eleString}'`)
        }

    }
    
    public async assert_OrderDetail_ProductList_AssociateCourse(courseList: string[], course1: string[], course2: string[], course3: string[]) {
        for (let i = 0; i < course1.length; i++) {
            const ele = this.ele_OrderDetail_ProductList_Course(i)
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
    
    public async assert_OrderDetail_StartDate(date: string[]) {

        const ele = this.eleOrderDetailProductListStartDate
        const eleString = await ele.innerText()
        const isEleStringValid = date.some(date => eleString.includes(date))
        try {
            expect(isEleStringValid).toBe(true)
        } catch(error) {
            throw new Error(`In order detail, start date is expected to show '${date}', but got '${eleString}'`)
        }
    }

    public async assert_OrderDetail_OrderStatus(status: string) {

        const ele = this.ele_OrderStatus
        const eleString = await ele.innerText()
        try {
            expect(eleString).toContain(status)
        } catch(error) {
            throw new Error(`Order status is expected to show '${status}', but got '${eleString}'`)
        }

    }

    public async assert_OrderDetail_OrderType(orderType: string) {

        const ele = this.ele_OrderType
        const eleString = await ele.innerText()
        try {
            expect(eleString).toContain(orderType)
            console.log('Update order successfully')
        } catch(error) {
            throw new Error(`In order detail, order type is expected to show '${orderType}, but got '${eleString}'`)
        }
    }

    public async assertOrderDetailProductList(
        orderInfo: {
            orderStatus: string,
            orderType: string
        },
        productRows: {
            productName: string,
            associateCourses: {
                courseName: string,
                isVisible: boolean
            }[] | null,
            discountLabel: string | null,
            startDate: string[] | null
        }[] | null // Check null when we just want to assert orderType and orderStatus
    ) {

        // Assert Order info
        const {orderStatus, orderType} = orderInfo
        const eleOrderStatus = await this.ele_OrderStatus.innerText()
        const eleOrderType = await this.ele_OrderType.innerText()
        
        try {
            expect(eleOrderStatus).toContain(orderStatus)
            expect(eleOrderType).toContain(orderType)
        } catch(error) {
            throw new Error(`Order Info is expect to show '${orderStatus}', '${orderType}' but got '${eleOrderStatus}' '${eleOrderType}'`)
        }

        // Assert Product list
        if (productRows != null) {
            for (let i = 0; i < productRows.length; i++) {

                const {productName, associateCourses, discountLabel, startDate} = productRows[i]
                const eleProductName = await this.ele_OrderDetail_ProductList_ProductName(i).innerText()
                const eleAssociateCourse = await this.ele_OrderDetail_ProductList_Course(i).innerText()
                const eleDiscountLabel = await this.ele_OrderDetail_ProductList_Discount(i).innerText()
                const eleStartDate = await this.ele_OrderDetail_ProductList_StartDate(i).innerText()
    
                // Assert product name
                try {
                    expect(eleProductName).toContain(productName)
                } catch(error) {
                    throw new Error(`In order detail: Product name is expect to show '${productName}', but got '${eleProductName}'`)
                }
    
                // Assert product course
                if (associateCourses != null) {
                    for(let courseItemIndex = 0; courseItemIndex < associateCourses.length; courseItemIndex ++){
                        const {courseName, isVisible} = associateCourses[courseItemIndex];
                        if (isVisible) {
                            try {
                                expect(eleAssociateCourse).toContain(courseName);
                            } catch(error) {
                                throw new Error(`In order detail: Product is expect to show '${courseName}' but got '${eleAssociateCourse}'`)
                            }
                        } else {
                            try {
                                expect(eleAssociateCourse).not.toContain(courseName)
                            } catch(error) {
                                throw new Error(`In order detail: Product is NOT expect to show '${courseName}' but got '${eleAssociateCourse}'`)
                            }
                        }
                    }
                } else if (associateCourses == null) {
                    try {
                        expect(eleAssociateCourse).toContain('--')
                    } catch(error) {
                        throw new Error(`In order detail: Associate course is expected to show '--', but got '${eleAssociateCourse}'`)
                    }
                }
    
                // Assert discount
                if (discountLabel != null) {
                    try {
                        expect(eleDiscountLabel).toContain(discountLabel)
                    } catch(error) {
                        throw new Error(`In order detail: Product discount is expected to show '${discountLabel}', but got '${eleDiscountLabel}'`)
                    }
                } else if (discountLabel == null) {
                    try {
                        expect(eleDiscountLabel).toContain('--')
                    } catch(error) {
                        throw new Error(`In order detail: Product discount is expected NOT to show, but got '${eleDiscountLabel}'`)
                    }
                }
    
                // Assert start date
                if (startDate != null) {
                    const isEleStringValid = startDate.some(date => eleStartDate.includes(date))
                    try {
                        expect(isEleStringValid).toBe(true)
                    } catch(error) {
                        throw new Error(`In order detail: Start date is expected to show '${startDate}', but got '${eleStartDate}'`)
                    }
                } else if (startDate == null) {
                    try {
                        expect(eleStartDate).toContain('--')
                    } catch(error) {
                        throw new Error(`In order detail: Start date is NOT expect to show, but got '${eleStartDate}'`)
                    }
                }
    
            }
        }

        // Get order url
        const orderUrl = await sFCommonStep.getStudentUrl()
        // return order url
        return orderUrl

    }

    public async assert_OrderDetail_TotalBillingItem(total: number) {

        const ele = this.ele_OrderDetail_Billing_BillingName_Couting
        const eleCount = await ele.count()
        if(eleCount != total) {
            throw new Error(`In order detail, total of bill item is expected to show '${total}', but got '${eleCount.toString()}'`)
        }

    }

    // ======================================= adjustment bill item name ================================================
        
    public async assert_OrderDetail_Billing_Billing(isAdjustment: boolean[], isRatioDisplay: boolean[], billingPeriod: string [], ratio: string[]) {
        for (let i = 0; i < billingPeriod.length; i++) {
            const ele = this.ele_OrderDetail_Billing_BillingName(i)
            const eleString = await ele.innerText() 
            try {
                expect(eleString).toContain(billingPeriod[i])
            } catch(error) {
                throw new Error(`In order detail, [${i}] is expected to show '${billingPeriod[i]}', but got '${eleString}'`)
            }
            if (isAdjustment[i] == true) {
                try {
                    expect(eleString).toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In order detail, [${i}] is expected to show '${generalText.adjustment}', but got '${eleString}'`)
                }
            } if (isAdjustment[i] == false) {
                try {
                    expect(eleString).not.toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In order detail, [${i}] is not expected to show '${generalText.adjustment}', but got '${eleString}'`)
                }
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
    
    public async assert_OrderDetail_Billing_AssociateCourse(courseList: string[], course1: string[], course2: string[], course3: string[]) {
        for (let i = 0; i < course1.length; i++) {
            const ele = this.ele_OrderDetail_Billing_BillingName(i)
            const eleString = await ele.innerText()
            switch (courseList[i]) {
                case 'require course only':
                    // Thực hiện hành động cho 'req 1 only'
                    try {
                        expect(eleString).toContain(course1[i])
                        expect(eleString).not.toContain(course2[i])
                        expect(eleString).not.toContain(course3[i])
                    } catch(error) {
                        throw new Error(`In order detail, [${i}] is expected to show '${course1[i]}', but got '${eleString}'`)
                    }
                    break;
                case 'require & optional1 courses':
                    // Thực hiện hành động cho 'req & opt1 1 only'
                    try {
                        expect(eleString).toContain(course1[i])
                        expect(eleString).toContain(course2[i])
                        expect(eleString).not.toContain(course3[i])
                    } catch(error) {
                        throw new Error(`In order detail, [${i}] is expected to show '${course1[i]}' and '${course2[i]}', but got '${eleString}'`)
                    }
                    break;
                default:
                    // Thực hiện hành động mặc định nếu cần
                    break;
            }
        }
    }

    public async assert_OrderDetail_BillingStatus(billingStatus: string[]) {
        for (let i = 0; i < billingStatus.length; i++) {
            const ele = this.ele_OrderDetail_Billing_BillingStatus(i)
            const eleString = await ele.innerText()
            try {
                expect(eleString).toContain(billingStatus[i])
            } catch(error) {
                throw new Error(`In order detail, billing status [${i}] is expected to show '${billingStatus[i]}', but got '${eleString}'`)
            }
        }
    }

    public async assertOrderDetailBilling(
        totalBillItem: number,
        billItemRows: {
            isAdjustment: boolean,
            isRecurringProduct: boolean,
            billingPeriod: string | null,
            isRatio: boolean | null,
            billingRatio: string | null,
            isPackage: boolean,
            associateCourses: {
                courseName: string,
                isVisible: boolean
            }[],
            billingStatus: string,
            billingDate: string[],
            billingAmount: string[]
        }[] | null
    ) {

        // Assert toal bill item (couting)
        const eleTotalBillItem = await this.ele_OrderDetail_Billing_BillingName_Couting.count()
        if(eleTotalBillItem != totalBillItem) {
            throw new Error(`In order detail: Total of bill item is expected to show '${totalBillItem}', but got '${eleTotalBillItem.toString()}'`)
        }

        // Assert Product list
        if (billItemRows != null) {
            for (let i = 0; i < billItemRows.length; i++) {

                const {isAdjustment, isRecurringProduct, billingPeriod, isRatio, billingRatio, isPackage, associateCourses, billingStatus, billingDate, billingAmount} = billItemRows[i]
    
                const eleBillingName = await this.ele_OrderDetail_Billing_BillingName(i).innerText()
                const eleBillingStatus = await this.ele_OrderDetail_Billing_BillingStatus(i).innerText()
                const eleBillingDate = await this.ele_OrderDetail_Billing_BillingDate(i).innerText()
                const eleBillingAmount = await this.ele_OrderDetail_Billing_Amount(i).innerText()
    
                // Check tag adjustment show in bill item or not
                if (isAdjustment) {
                    try {
                        expect(eleBillingName).toContain(generalText.adjustment)
                    } catch(error) {
                        throw new Error(`In order detail: Billing [${i}] is expected to show '${generalText.adjustment}', but got '${eleBillingName}'`)
                    }
                } else {
                    try {
                        expect(eleBillingName).not.toContain(generalText.adjustment)
                    } catch(error) {
                        throw new Error(`In order detail: Billing [${i}] is expected to not show '${generalText.adjustment}', but got '${eleBillingName}'`)
                    }
                }
    
                if (isRecurringProduct) {
                    if (isRatio) {
                        try {
                            expect(eleBillingName).toContain(billingPeriod)
                            expect(eleBillingName).toContain(billingRatio)
                        } catch(error) {
                            throw new Error(`In order detail: Billing [${i}] is expected to show '${billingPeriod}' and '${billingRatio}', but got '${eleBillingName}'`)
                        }
                    } if (!isRatio) {
                        try {
                            expect(eleBillingName).toContain(billingPeriod)
                            expect(eleBillingName).not.toContain(generalText.billingRatio)
                        } catch(error) {
                            throw new Error(`In order detail: Billing [${i}] is expected to show '${billingPeriod}' and not show '${billingRatio}', but got '${eleBillingName}'`)
                        }
                    }
                }
    
                // Check course display in billing
                if (isPackage) {
                    for(let courseItemIndex = 0; courseItemIndex < associateCourses.length; courseItemIndex ++){
                        const {courseName, isVisible} = associateCourses[courseItemIndex];
                        if (isVisible) {
                            try {
                                expect(eleBillingName).toContain(courseName);
                            } catch(error) {
                                throw new Error(`In order detail: Billing [${i}] is expected to show '${courseName}', but got '${eleBillingName}'`)
                            }
                        } else {
                            try {
                                expect(eleBillingName).not.toContain(courseName)
                            } catch(error) {
                                throw new Error(`In order detail: Billing [${i}] is NOT expect to show '${courseName}', but got '${eleBillingName}'`)
                            }
                        }
                    }
                }
    
                // Check billing status
                try {
                    expect(eleBillingStatus).toContain(billingStatus)
                } catch(error) {
                    throw new Error(`In order detail: Billing [${i}] is expected to show '${billingStatus}', but got '${eleBillingStatus}'`)
                }
    
                // Check billing date
                try {
                    const isBillingDateValid = billingDate.some(date => eleBillingDate.includes(date));
                    expect(isBillingDateValid).toBe(true);
                } catch (error) {
                    throw new Error(`In order detail: Billing [${i}] is expected to show one of '${billingDate}', but got '${eleBillingDate}'`);
                }
    
                // Check amount
                try {
                    const isAmountValid = billingAmount.some(amount => eleBillingAmount.includes(amount));
                    expect(isAmountValid).toBe(true);
                } catch (error) {
                    throw new Error(`In order detail: Billing [${i}] is expected to show one of '${billingAmount}', but got '${eleBillingAmount}'`);
                }
    
            }

        }
        
    }

    public async createInvoice(
        invoiceInfo: {
            isDraftOnly: boolean,
            paymentInfo: {
                paymentMethod: string | null,
                dueDate: string | null,
                expiryDate: string | null
            } | null,
            isCancelPayment: boolean,
            isRequestPayment: boolean,
            isApprovePayment: boolean,
            paymentDate: string | null
        }
    ) {
    
        const {isDraftOnly, paymentInfo, isCancelPayment, isRequestPayment, isApprovePayment, paymentDate} = invoiceInfo;
    
        // create invoice
        try {
            await this.page.getByRole('button', { name: 'Show menu', exact: true }).click()
            await sFCommonStep.wait(200);
            await this.page.getByRole('menuitem', { name: 'Create Invoice' }).click()
            await sFCommonStep.wait(200);
            await sFCommonStep.click('Save');
            await sFCommonStep.click('Finish');
            await sFCommonStep.wait(2000);
            const invoiceUrl = this.page.url();
    
            // Check payment method info to decide whether to continue or not
            if (!isDraftOnly && paymentInfo?.paymentMethod) {
                
                await sFCommonStep.click('Issue Invoice')
                await sFCommonStep.wait(500)

                switch (paymentInfo.paymentMethod) {
                    case 'Bank Transfer - 銀行振込': //Bank-Transfer
                    case 'Cash- 現金': //Ca-sh
                    case 'Convenience Store': //Convenience-Store
                        await sFApplications.elePaymentMethod.selectOption(paymentInfo.paymentMethod);
                        if (paymentInfo?.dueDate && paymentInfo?.expiryDate) {
                            await sFApplications.eleDueDate.fill(paymentInfo.dueDate);
                            await sFApplications.eleExpiryDate.fill(paymentInfo.expiryDate);
                        }
                        await sFCommonStep.click('Confirm')
                        await sFCommonStep.click('Finish')
                        break;

                    case 'Direct Debit': //Direct-Debit
                    case 'GMO Convenience Store':
                        await sFApplications.elePaymentMethod.selectOption(paymentInfo.paymentMethod);
                        if (paymentInfo?.dueDate) {
                            await sFApplications.eleDueDate.fill(paymentInfo.dueDate);
                        }
                        await sFCommonStep.click('Confirm')
                        await sFCommonStep.click('Finish')
                        break;

                    case 'GMO Credit Card': //GMO-Credit-Card
                        await sFApplications.elePaymentMethod.selectOption(paymentInfo.paymentMethod);
                        await sFCommonStep.click('Confirm')
                        await sFCommonStep.click('Finish')
                        break;

                    default:
                        throw new Error(`Cannot select payment method`);
                }
            }

            // Check request payment
            if (isRequestPayment) {
                try {
                    await sFCommonStep.click('Request Payment')
                    await sFCommonStep.click('Confirm')
                    await sFCommonStep.click('Finish')
                } catch(error) {
                    throw new Error(`Cannot request payment`)
                }
            }

            // Check cancel payment
            if (isCancelPayment) {
                try {
                    await sFCommonStep.click('Cancel Payment')
                    await sFCommonStep.click('Confirm')
                    await sFCommonStep.click('Finish')
                } catch(error) {
                    throw new Error(`Cannot cancel payment`)
                }
            }

            // Check and approve payment
            if (isApprovePayment && paymentDate != null) {
                try {
                    await sFCommonStep.click('Approve Payment')
                    await sFApplications.elePaymentDate.fill(paymentDate)
                    await sFCommonStep.click('Confirm')
                    await sFCommonStep.click('Finish')
                } catch(error) {
                    throw new Error(`Cannot approve payment`)
                }
            }

            return invoiceUrl;
    
        } catch (error) {
            throw new Error(`Cannot create invoice for order`);
        }
    }

    // ============================================ assert billing date =======================================

    public async assert_OrderDetail_BillingDateIsCurrentDate_Array0() {

        const ele = this.ele_OrderDetail_Billing_BillingDate_Array0
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))

        if (!isEleStringValid) {
            throw new Error(`The billing date ${eleString} does not match any of the expected current date: ${common.currentDate.join(', ')}`);
        }

        expect(isEleStringValid).toBe(true)

    }

    public async assert_OrderDetail_BillingDateIsIs2110Dec31_Array0() {

        const ele = this.ele_OrderDetail_Billing_BillingDate_Array0
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2110.some(date => eleString.includes(date))
        if (!isEleStringValid) {
            throw new Error(`In order detail, billing date [0] ${eleString} does not match any of the expected ${sF_DateTime.text_31Dec2110.join(', ')}`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_OrderDetail_BillingDateIsIs2080Dec31_Array1() {

        const ele = this.ele_OrderDetail_Billing_BillingDate_Array1
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2080.some(date => eleString.includes(date))
        if (!isEleStringValid) {
            throw new Error(`In order detail, billing date [1] ${eleString} does not match any of the expected ${sF_DateTime.text_31Dec2080.join(', ')}`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_OrderDetail_BillingDateIsIs2110Dec31_Array1() {

        const ele = this.ele_OrderDetail_Billing_BillingDate_Array1
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2110.some(date => eleString.includes(date))
        if (!isEleStringValid) {
            throw new Error(`In order detail, billing date [1] ${eleString} does not match any of the expected ${sF_DateTime.text_31Dec2110.join(', ')}`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_OrderDetail_BillingDateIsIs2080Dec31_Array2() {

        const ele = this.ele_OrderDetail_Billing_BillingDate_Array2
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2080.some(date => eleString.includes(date))
        if (!isEleStringValid) {
            throw new Error(`In order detail, billing date [2] ${eleString} does not match any of the expected ${sF_DateTime.text_31Dec2080.join(', ')}`);
        }
        expect(isEleStringValid).toBe(true)
    }
    
    public async assert_OrderDetail_BillingDateIsIs2050Dec31_Array3() {

        const ele = this.ele_OrderDetail_Billing_BillingDate_Array3
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2050.some(date => eleString.includes(date))
        if (!isEleStringValid) {
            throw new Error(`In order detail, billing date [0] ${eleString} does not match any of the expected ${sF_DateTime.text_31Dec2050.join(', ')}`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_OrderDetail_BillingDateIsCurrentDate_Array1() {

        const ele = this.ele_OrderDetail_Billing_BillingDate_Array1
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))
        if (!isEleStringValid) {
            throw new Error(`The billing date ${eleString} does not match any of the expected current date: ${common.currentDate.join(', ')}`);
        }
        expect(isEleStringValid).toBe(true)
    }

    public async assert_OrderDetail_BillingDateIs2030Jan01_Array0() {

        const ele = this.ele_OrderDetail_Billing_BillingDate_Array0
        const eleString = await ele.innerText()
        expect(eleString).toContain(billingDate.Jan203001)

    }
    
    public async assert_OrderDetail_Amount(priceList: string [][]) {
        for (let i = 0; i < priceList.length; i++) {
            const ele = this.ele_OrderDetail_Billing_Amount(i)
            const eleString = await ele.innerText()
            const isEleStringValid = priceList[i].some(price => eleString.includes(price))
            try {
                expect(isEleStringValid).toBe(true)
            } catch(error) {
                throw new Error(`In order detail, [${i}] ${eleString} does not match any of the expected price: ${priceList[i].join(', ')}`)
            }      
        }
    }
    
    public async assertVoidIsDisable() {

        const eleShowMenuBtn = this.page.getByRole('button', { name: 'Show menu', exact: true })
        const eleVoidBtn = this.page.getByRole('menuitem', { name: 'Void' })
        try {
            await sFCommonStep.wait(2000)
            await eleShowMenuBtn?.click();
            await expect(eleVoidBtn).toBeDisabled();
            console.log(`Void btn is not allow`)
        } catch(error) {
            throw new Error(`In order detail: Void btn is NOT disable'`)
        }
    }

    public async assertVoidSuccess() {

        const ele = this.page.locator('text=You have voided the order successfully')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('You have voided the order successfully')
        } catch(error) {
            throw new Error(`Not show success msg 'You have voided the order successfully'`)
        }
        await sFCommonStep.wait(2000)
    }
}