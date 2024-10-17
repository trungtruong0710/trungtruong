import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../sf-common-steps";
import discount from "../../utils/discount";
import productStatus from "../../utils/product-status";
import status from "../../utils/status";
import price from "../../utils/price";
import orderType from "../../utils/order-type";
import sF_DateTime from "../../sf-date-time";
import billingPeriod from "../../utils/billing-period";
import FP from "../../utils/product-frequency-package";
import generalText from "../../utils/general-text";
import { sFCommonStep, sFCreateOrder } from "../test-hook";

export default class sF_Billing {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE =========================================================
     */

    // Get show action
    public eleProductListShowAction(position: number) {
        const eleProductListShowAction = this.page.getByRole('gridcell', { name: 'Show actions' }).getByRole('button').nth(position)
        if(eleProductListShowAction != null) {
            return eleProductListShowAction;
        }else throw new Error('Cannot find eleProductListShowAction ' + position)
    }

    // Get show action
    public get ele_ProductList_ShowAction_Array0() {
        const ele_ProductList_ShowAction_Array0 = this.page.getByRole('gridcell', { name: 'Show actions' }).getByRole('button').nth(0)
        if(ele_ProductList_ShowAction_Array0 != null) {
            return ele_ProductList_ShowAction_Array0;
        }else throw new Error('Cannot find ele_ProductList_ShowAction_Array0')
    }

    // Get update product action
    public eleProductListUpdateProductBtn(position: number) {
        const eleProductListUpdateProductBtn = this.page.getByRole('menuitem', { name: 'Update' }).nth(position)
        if(eleProductListUpdateProductBtn != null) {
            return eleProductListUpdateProductBtn;
        }else throw new Error('Cannot find eleProductListUpdateProductBtn ' + position)
    }

    // Get update product action
    public get ele_ProductList_UpdateProductBtn() {
        const ele_ProductList_UpdateProductBtn = this.page.getByRole('menuitem', { name: 'Update' }).nth(0)
        if(ele_ProductList_UpdateProductBtn != null) {
            return ele_ProductList_UpdateProductBtn;
        }else throw new Error('Cannot find ele_ProductList_UpdateProductBtn')
    }

    // Get product detail
    public ele_ProductList_ProductDetail(position: number) {
        const ele_ProductList_ProductDetail = this.page.locator('[data-label="Product Details"] [data-label="Product Details"]').nth(position)
        if(ele_ProductList_ProductDetail != null) {
            return ele_ProductList_ProductDetail;
        }else throw new Error('Cannot find ele_ProductList_ProductDetail ' + position)
    }

    // Get product detail
    public get ele_ProductList_ProductDetail_Array0() {
        const ele_ProductList_ProductDetail_Array0 = this.page.locator('[data-label="Product Details"] [data-label="Product Details"]').nth(0)
        if(ele_ProductList_ProductDetail_Array0 != null) {
            return ele_ProductList_ProductDetail_Array0;
        }else throw new Error('Cannot find ele_ProductList_ProductDetail_Array0')
    }

    // Get product detail
    public get ele_ProductList_ProductDetail_Array1() {
        const ele_ProductList_ProductDetail_Array1 = this.page.locator('[data-label="Product Details"] [data-label="Product Details"]').nth(1)
        if(ele_ProductList_ProductDetail_Array1 != null) {
            return ele_ProductList_ProductDetail_Array1;
        }else throw new Error('Cannot find ele_ProductList_ProductDetail_Array1')
    }

    // Get product status
    public ele_ProductList_ProductStatus(position: number) {
        const ele_ProductList_ProductStatus = this.page.locator('[data-label="Status"] [data-label="Status"]').nth(position)
        if(ele_ProductList_ProductStatus != null) {
            return ele_ProductList_ProductStatus;
        }else throw new Error('Cannot find ele_ProductList_ProductStatus ' + position)
    }

    // Get product status
    public get ele_ProductList_ProductStatus_Array1() {
        const ele_ProductList_ProductStatus_Array1 = this.page.locator('[data-label="Status"] [data-label="Status"]').nth(1)
        if(ele_ProductList_ProductStatus_Array1 != null) {
            return ele_ProductList_ProductStatus_Array1;
        }else throw new Error('Cannot find ele_ProductList_ProductStatus_Array1')
    }

    // Get duration
    public ele_ProductList_Duration(position: number) {
        const ele_ProductList_Duration = this.page.locator('[data-label="Duration"] [data-label="Duration"]').nth(position)
        if(ele_ProductList_Duration != null) {
            return ele_ProductList_Duration;
        }else throw new Error('Cannot find ele_ProductList_Duration ' + position)
    }

    // Get duration
    public get ele_ProductList_Duration_Array0() {
        const ele_ProductList_Duration_Array0 = this.page.locator('[data-label="Duration"] [data-label="Duration"]').nth(0)
        if(ele_ProductList_Duration_Array0 != null) {
            return ele_ProductList_Duration_Array0;
        }else throw new Error('Cannot find ele_ProductList_Duration_Array0')
    }

    // Get duration
    public ele_ProductList_UpcomingBillingDate(position: number) {
        const ele_ProductList_UpcomingBillingDate = this.page.locator('[data-label="Upcoming Billing Date"] [data-label="Upcoming Billing Date"]').nth(position)
        if(ele_ProductList_UpcomingBillingDate != null) {
            return ele_ProductList_UpcomingBillingDate;
        }else throw new Error('Cannot find ele_ProductList_UpcomingBillingDate ' + position)
    }

    // Get duration
    public get ele_ProductList_UpcomingBillingDate_Array0() {
        const ele_ProductList_UpcomingBillingDate_Array0 = this.page.locator('[data-label="Upcoming Billing Date"] [data-label="Upcoming Billing Date"]').nth(0)
        if(ele_ProductList_UpcomingBillingDate_Array0 != null) {
            return ele_ProductList_UpcomingBillingDate_Array0;
        }else throw new Error('Cannot find ele_ProductList_UpcomingBillingDate_Array0')
    }

    // Get billing name
    public get ele_Billing_BillingName_Couting() {
        const ele_Billing_BillingName_Couting = this.page.locator('[data-col-key-value="billingItemValue-productDetailWithCourses-2"] [data-label="Billing Item"]')
        if(ele_Billing_BillingName_Couting != null) {
            return ele_Billing_BillingName_Couting;
        }else throw new Error('Cannot find ele_Billing_BillingName_Couting')
    }

    // Get billing name
    public ele_Billing_BillingName(position: number) {
        const ele_Billing_BillingName = this.page.locator('[data-col-key-value="billingItemValue-productDetailWithCourses-2"] [data-label="Billing Item"]').nth(position)
        if(ele_Billing_BillingName != null) {
            return ele_Billing_BillingName;
        }else throw new Error('Cannot find ele_Billing_BillingName ' + position)
    }

    // Get billing name
    public get ele_Billing_BillingName_Array0() {
        const ele_Billing_BillingName_Array0 = this.page.locator('[data-col-key-value="billingItemValue-productDetailWithCourses-2"] [data-label="Billing Item"]').nth(0)
        if(ele_Billing_BillingName_Array0 != null) {
            return ele_Billing_BillingName_Array0;
        }else throw new Error('Cannot find ele_Billing_BillingName_Array0')
    }

    // Get billing name
    public get ele_Billing_BillingName_Array1() {
        const ele_Billing_BillingName_Array1 = this.page.locator('[data-col-key-value="billingItemValue-productDetailWithCourses-2"] [data-label="Billing Item"]').nth(1)
        if(ele_Billing_BillingName_Array1 != null) {
            return ele_Billing_BillingName_Array1;
        }else throw new Error('Cannot find ele_Billing_BillingName_Array1')
    }
    
    // Get billing name
    public get ele_Billing_BillingName_Array2() {
        const ele_Billing_BillingName_Array2 = this.page.locator('[data-col-key-value="billingItemValue-productDetailWithCourses-2"] [data-label="Billing Item"]').nth(2)
        if(ele_Billing_BillingName_Array2 != null) {
            return ele_Billing_BillingName_Array2;
        }else throw new Error('Cannot find ele_Billing_BillingName_Array2')
    }

    // Get billing name
    public get ele_Billing_BillingName_Array3() {
        const ele_Billing_BillingName_Array3 = this.page.locator('[data-col-key-value="billingItemValue-productDetailWithCourses-2"] [data-label="Billing Item"]').nth(3)
        if(ele_Billing_BillingName_Array3 != null) {
            return ele_Billing_BillingName_Array3;
        }else throw new Error('Cannot find ele_Billing_BillingName_Array3')
    }

    // Get billing name
    public get ele_Billing_BillingName_Array4() {
        const ele_Billing_BillingName_Array4 = this.page.locator('[data-col-key-value="billingItemValue-productDetailWithCourses-2"] [data-label="Billing Item"]').nth(4)
        if(ele_Billing_BillingName_Array4 != null) {
            return ele_Billing_BillingName_Array4;
        }else throw new Error('Cannot find ele_Billing_BillingName_Array4')
    }

    // Get billing name
    public get ele_Billing_BillingName_Array5() {
        const ele_Billing_BillingName_Array5 = this.page.locator('[data-col-key-value="billingItemValue-productDetailWithCourses-2"] [data-label="Billing Item"]').nth(5)
        if(ele_Billing_BillingName_Array5 != null) {
            return ele_Billing_BillingName_Array5;
        }else throw new Error('Cannot find ele_Billing_BillingName_Array5')
    }

    // Get billing staus
    public ele_Billing_BillingStatus(position: number) {
        const ele_Billing_BillingStatus = this.page.locator('[data-col-key-value="billingStatus-billItemStatusBadge-3"] [data-label="Status"]').nth(position)
        if(ele_Billing_BillingStatus != null) {
            return ele_Billing_BillingStatus;
        }else throw new Error('Cannot find ele_Billing_BillingStatus ' + position)
    }

    // Get billing staus
    public get ele_Billing_BillingStatus_Array0() {
        const ele_Billing_BillingStatus_Array0 = this.page.locator('[data-col-key-value="billingStatus-billItemStatusBadge-3"] [data-label="Status"]').nth(0)
        if(ele_Billing_BillingStatus_Array0 != null) {
            return ele_Billing_BillingStatus_Array0;
        }else throw new Error('Cannot find ele_Billing_BillingStatus_Array0')
    }

    // Get billing staus
    public get ele_Billing_BillingStatus_Array1() {
        const ele_Billing_BillingStatus_Array1 = this.page.locator('[data-col-key-value="billingStatus-billItemStatusBadge-3"] [data-label="Status"]').nth(1)
        if(ele_Billing_BillingStatus_Array1 != null) {
            return ele_Billing_BillingStatus_Array1;
        }else throw new Error('Cannot find ele_Billing_BillingStatus_Array1')
    }

    // Get billing staus
    public get ele_Billing_BillingStatus_Array2() {
        const ele_Billing_BillingStatus_Array2 = this.page.locator('[data-col-key-value="billingStatus-billItemStatusBadge-3"] [data-label="Status"]').nth(2)
        if(ele_Billing_BillingStatus_Array2 != null) {
            return ele_Billing_BillingStatus_Array2;
        }else throw new Error('Cannot find ele_Billing_BillingStatus_Array2')
    }

    // Get billing staus
    public get ele_Billing_BillingStatus_Array3() {
        const ele_Billing_BillingStatus_Array3 = this.page.locator('[data-col-key-value="billingStatus-billItemStatusBadge-3"] [data-label="Status"]').nth(3)
        if(ele_Billing_BillingStatus_Array3 != null) {
            return ele_Billing_BillingStatus_Array3;
        }else throw new Error('Cannot find ele_Billing_BillingStatus_Array3')
    }

    // Get billing staus
    public get ele_Billing_BillingStatus_Array4() {
        const ele_Billing_BillingStatus_Array4 = this.page.locator('[data-col-key-value="billingStatus-billItemStatusBadge-3"] [data-label="Status"]').nth(4)
        if(ele_Billing_BillingStatus_Array4 != null) {
            return ele_Billing_BillingStatus_Array4;
        }else throw new Error('Cannot find ele_Billing_BillingStatus_Array4')
    }

    // Get billing staus
    public get ele_Billing_BillingStatus_Array5() {
        const ele_Billing_BillingStatus_Array5 = this.page.locator('[data-col-key-value="billingStatus-billItemStatusBadge-3"] [data-label="Status"]').nth(5)
        if(ele_Billing_BillingStatus_Array5 != null) {
            return ele_Billing_BillingStatus_Array5;
        }else throw new Error('Cannot find ele_Billing_BillingStatus_Array5')
    }

    // Get billing date
    public ele_Billing_BillingDate(position: number) {
        const ele_Billing_BillingDate = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(position)
        if(ele_Billing_BillingDate != null) {
            return ele_Billing_BillingDate;
        }else throw new Error('Cannot find ele_Billing_BillingDate ' + position)
    }

    // Get billing date
    public get ele_Billing_BillingDate_Array0() {
        const ele_Billing_BillingDate_Array0 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(0)
        if(ele_Billing_BillingDate_Array0 != null) {
            return ele_Billing_BillingDate_Array0;
        }else throw new Error('Cannot find ele_Billing_BillingDate_Array0')
    }

    // Get billing date
    public get ele_Billing_BillingDate_Array1() {
        const ele_Billing_BillingDate_Array1 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(1)
        if(ele_Billing_BillingDate_Array1 != null) {
            return ele_Billing_BillingDate_Array1;
        }else throw new Error('Cannot find ele_Billing_BillingDate_Array1')
    }

    // Get billing date
    public get ele_Billing_BillingDate_Array2() {
        const ele_Billing_BillingDate_Array2 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(2)
        if(ele_Billing_BillingDate_Array2 != null) {
            return ele_Billing_BillingDate_Array2;
        }else throw new Error('Cannot find ele_Billing_BillingDate_Array2')
    }

    // Get billing date
    public get ele_Billing_BillingDate_Array3() {
        const ele_Billing_BillingDate_Array3 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(3)
        if(ele_Billing_BillingDate_Array3 != null) {
            return ele_Billing_BillingDate_Array3;
        }else throw new Error('Cannot find ele_Billing_BillingDate_Array3')
    }

    // Get billing date
    public get ele_Billing_BillingDate_Array4() {
        const ele_Billing_BillingDate_Array4 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(4)
        if(ele_Billing_BillingDate_Array4 != null) {
            return ele_Billing_BillingDate_Array4;
        }else throw new Error('Cannot find ele_Billing_BillingDate_Array4')
    }

    // Get billing date
    public get ele_Billing_BillingDate_Array5() {
        const ele_Billing_BillingDate_Array5 = this.page.locator('[data-label="Billing Date"] [data-label="Billing Date"]').nth(5)
        if(ele_Billing_BillingDate_Array5 != null) {
            return ele_Billing_BillingDate_Array5;
        }else throw new Error('Cannot find ele_Billing_BillingDate_Array5')
    }

    // Get billing amount
    public get ele_Billing_Amount_Array0() {
        const ele_Billing_Amount_Array0 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(0)
        if(ele_Billing_Amount_Array0 != null) {
            return ele_Billing_Amount_Array0;
        }else throw new Error('Cannot find ele_Billing_Amount_Array0')
    }

    // Get billing amount
    public ele_Billing_Amount(position: number) {
        const ele_Billing_Amount = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(position)
        if(ele_Billing_Amount != null) {
            return ele_Billing_Amount;
        }else throw new Error('Cannot find ele_Billing_Amount_' + position)
    }

    // Get billing amount
    public get ele_Billing_Amount_Array1() {
        const ele_Billing_Amount_Array1 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(1)
        if(ele_Billing_Amount_Array1 != null) {
            return ele_Billing_Amount_Array1;
        }else throw new Error('Cannot find ele_Billing_Amount_Array1')
    }

    // Get billing amount
    public get ele_Billing_Amount_Array2() {
        const ele_Billing_Amount_Array2 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(2)
        if(ele_Billing_Amount_Array2 != null) {
            return ele_Billing_Amount_Array2;
        }else throw new Error('Cannot find ele_Billing_Amount_Array2')
    }

    // Get billing amount
    public get ele_Billing_Amount_Array3() {
        const ele_Billing_Amount_Array3 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(3)
        if(ele_Billing_Amount_Array3 != null) {
            return ele_Billing_Amount_Array3;
        }else throw new Error('Cannot find ele_Billing_Amount_Array3')
    }

    // Get billing amount
    public get ele_Billing_Amount_Array4() {
        const ele_Billing_Amount_Array4 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(4)
        if(ele_Billing_Amount_Array4 != null) {
            return ele_Billing_Amount_Array4;
        }else throw new Error('Cannot find ele_Billing_Amount_Array4')
    }

    // Get billing amount
    public get ele_Billing_Amount_Array5() {
        const ele_Billing_Amount_Array5 = this.page.locator('[data-label="Amount"] [data-label="Amount"]').nth(5)
        if(ele_Billing_Amount_Array5 != null) {
            return ele_Billing_Amount_Array5;
        }else throw new Error('Cannot find ele_Billing_Amount_Array5')
    }

    // Get order number counting
    public get ele_Order_OrderNo_Counting() {
        const ele_Order_OrderNo = this.page.locator('[data-label="Order Type"] [data-label="Order Type"]')
        if(ele_Order_OrderNo != null) {
            return ele_Order_OrderNo;
        }else throw new Error('Cannot find ele_Order_OrderNo')
    }

    // Get order type
    public ele_Order_OrderType(position: number) {
        const ele_Order_OrderType = this.page.locator('[data-label="Order Type"] [data-label="Order Type"]').nth(position)
        if(ele_Order_OrderType != null) {
            return ele_Order_OrderType;
        }else throw new Error('Cannot find ele_Order_OrderType ' + position)
    }

    // Get order type
    public get ele_Order_OrderType_Array0() {
        const ele_Order_OrderType_Array0 = this.page.locator('[data-label="Order Type"] [data-label="Order Type"]').nth(0)
        if(ele_Order_OrderType_Array0 != null) {
            return ele_Order_OrderType_Array0;
        }else throw new Error('Cannot find ele_Order_OrderType_Array0')
    }

    // Get order type
    public get ele_Order_OrderType_Array1() {
        const ele_Order_OrderType_Array1 = this.page.locator('[data-label="Order Type"] [data-label="Order Type"]').nth(1)
        if(ele_Order_OrderType_Array1 != null) {
            return ele_Order_OrderType_Array1;
        }else throw new Error('Cannot find ele_Order_OrderType_Array1')
    }

    // Get order type
    public get ele_Order_OrderType_Array2() {
        const ele_Order_OrderType_Array2 = this.page.locator('[data-label="Order Type"] [data-label="Order Type"]').nth(2)
        if(ele_Order_OrderType_Array2 != null) {
            return ele_Order_OrderType_Array2;
        }else throw new Error('Cannot find ele_Order_OrderType_Array2')
    }

    // Get order status
    public ele_Order_OrderStatus(position: number) {
        const ele_Order_OrderStatus = this.page.locator('[data-col-key-value="orderStatus-orderStatusBadge-3"] [data-label="Status"] ').nth(position)
        if(ele_Order_OrderStatus != null) {
            return ele_Order_OrderStatus;
        }else throw new Error('Cannot find ele_Order_OrderStatus ' + position)
    }

    // Get order status
    public get ele_Order_OrderStatus_Array0() {
        const ele_Order_OrderStatus_Array0 = this.page.locator('[data-col-key-value="orderStatus-orderStatusBadge-3"] [data-label="Status"] ').nth(0)
        if(ele_Order_OrderStatus_Array0 != null) {
            return ele_Order_OrderStatus_Array0;
        }else throw new Error('Cannot find ele_Order_OrderStatus_Array0')
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async updateProductOld(
        productElement: number,
        updateOptions: {
            updateType: 'update' | 'cancel' | null,
            isRemoveDiscount: boolean | null,
            discount: string | null,
            effectiveDate: string | null,
            updatePackage: {
                courseName: string,
                isSelect: boolean
            }[] | null,
            numberOfSlot: number | null

        }
    ) {

        for (let i = 0; i < productElement + 1; i++) {

            const eleShowAction = this.eleProductListShowAction(i)
            const eleUpdateBtn = this.eleProductListUpdateProductBtn(i)
            const {updateType, isRemoveDiscount, discount, effectiveDate, updatePackage, numberOfSlot} = updateOptions

            // access update screen
            await sFCommonStep.wait(500)
            await eleShowAction?.click()
            await sFCommonStep.wait(500)
            await eleUpdateBtn?.click()

            // update product infor
            if (updateType == 'update') {

                if (isRemoveDiscount) {
                    if (discount) {
                        await sFCreateOrder.selectDiscount(i, discount);
                    } else if (!discount) {
                        await sFCreateOrder.removeDiscount(i);
                    }
                } else if (!isRemoveDiscount) {
                    if (discount) {
                        await sFCreateOrder.selectDiscountWithoutRemoveDiscountFirst(discount);
                    }
                }

                if (updatePackage) {
                        await sFCreateOrder.selectAssociateCourse(3,updatePackage)
                }
            } else if (updateType == 'cancel') {
                await sFCreateOrder.removeProduct(i);
            }

            if (numberOfSlot != null) {
                await sFCreateOrder.selectSlotForRequireCourse(i, numberOfSlot);
            }

            if (effectiveDate) {
                await sFCreateOrder.fill_EffectiveDate(effectiveDate);
            }
        }
    }

    public async updateProduct(updateInfo: {
        productElement: number,
        updateOptions: {
            updateType: 'update' | 'cancel',
            isRemoveDiscount: boolean | null,
            discount: string | null,
            effectiveDate: string | null,
            updatePackage: {
                courseName: string,
                isSelect: boolean
            }[] | null,
            numberOfSlot: number | null
        }
    }
    ) {

        const {productElement, updateOptions} = updateInfo

        for (let i = 0; i < productElement + 1; i++) {

            // access update screen
            await sFCommonStep.wait(500)
            await this.eleProductListShowAction(i)?.click()
            await sFCommonStep.wait(500)
            await this.eleProductListUpdateProductBtn(i)?.click()

            // update product info
            if (updateOptions.updateType == 'update') {

                if (updateOptions.isRemoveDiscount) {
                    if (updateOptions.discount) {
                        try {
                            await sFCreateOrder.selectDiscount(i, updateOptions.discount);
                        } catch(error) {
                            throw new Error(`Cannot update select discount`)
                        }
                    } else if (!updateOptions.discount) {
                        try {
                            await sFCreateOrder.removeDiscount(i);
                        } catch(error) {
                            throw new Error(`Cannot update remove discount`)
                        }
                    }
                } else if (!updateOptions.isRemoveDiscount) {
                    if (updateOptions.discount) {
                        try {
                            await sFCreateOrder.selectDiscountWithoutRemoveDiscountFirst(updateOptions.discount);
                        } catch(error) {
                            throw new Error(`Cannot update select discount`)
                        }
                    }
                }

                if (updateOptions.updatePackage) {
                    try {
                        await sFCreateOrder.selectAssociateCourse(3,updateOptions.updatePackage)
                    } catch(error) {
                        throw new Error(`Cannot update select associate course`)
                    }
                }
            } else if (updateOptions.updateType == 'cancel') {
                try {
                    await sFCreateOrder.removeProduct(i);
                } catch(error) {
                    throw new Error(`Cannot update remove product`)
                }
            }

            if (updateOptions.numberOfSlot != null) {
                try {
                    await sFCreateOrder.selectSlotForRequireCourse(i, updateOptions.numberOfSlot);
                } catch(error) {
                    throw new Error(`Cannot update associate course slot`)
                }
            }

            if (updateOptions.effectiveDate) {
                try {
                    await sFCreateOrder.fill_EffectiveDate(updateOptions.effectiveDate);
                } catch(error) {
                    throw new Error(`Cannot update effective date`)
                }
            }
        }
    }
    
    public async click_UpdateProduct_Array0() {

        const eleShowAction = this.ele_ProductList_ShowAction_Array0
        const eleUpdateBtn = this.ele_ProductList_UpdateProductBtn
        const common = new sF_CommonStep(this.page)
        await common.wait(500)
        await eleShowAction?.click()
        await common.wait(500)
        await eleUpdateBtn?.click()

    }

    public async assert_UpdateProductIsDisable_Array0() {

        const eleShowAction = this.ele_ProductList_ShowAction_Array0
        const eleUpdateBtn = this.ele_ProductList_UpdateProductBtn
        const isDisabled = await eleUpdateBtn.isDisabled()
        const common = new sF_CommonStep(this.page)
        await common.wait(2000)
        await eleShowAction?.click()
        await common.wait(500)
        if(isDisabled) {
            console.log('eleUpdateBtn is disabled')
        } else {
            throw new Error('eleUpdateBtn is not disabled.')
        }
    }

    public async assert_Billing_ProductList_ProductItemIsNotVisible() {

        const ele = this.ele_ProductList_ProductDetail_Array0
        const eleCount = await ele.count()
        if (eleCount > 0) {
            throw new Error("Product item should not existed")
        } else {
            console.log("Product Item is not exist when order status is draft")
        }

    }

    public async assert_Billing_ProductList_Tag(isShowTag: boolean[], tagInfo: string []) {
        for (let i = 0; i < tagInfo.length; i++) {
            const ele = this.ele_ProductList_ProductDetail(i)
            const eleString = await ele.innerText()
            if (isShowTag[i] == true) {
                try {
                    expect(eleString).toContain(tagInfo[i])
                } catch(error) {
                    throw new Error(`In student billing, product detail [0] is expected to show '${tagInfo[i]}', but got '${eleString}'`)
                }
            } if (isShowTag[i] == false) {
                try {
                    expect(eleString).not.toContain('Schedule')
                } catch(error) {
                    throw new Error(`In student billing, product detail [0] is not expected to show tag, but got '${eleString}'`)
                }
            }
            
        }
    }
    
    public async assert_Billing_ProductList_UpdateScheduleTag_Array0() {

        const ele = this.ele_ProductList_ProductDetail_Array0
        const eleString = await ele.innerText()
        try {
            expect(eleString).toContain(generalText.updateSchedule)
        } catch(error) {
            throw new Error(`In student billing, product detail [0] is expected to show '${generalText.updateSchedule}', but got '${eleString}'`)
        }
    }
    
    public async assert_Billing_ProductList_UpdateScheduleTagIsNotVisible_Array0() {

        const ele = this.ele_ProductList_ProductDetail_Array0
        const eleString = await ele.innerText()
        try {
            expect(eleString).not.toContain(generalText.updateSchedule)
        } catch(error) {
            throw new Error(`In student billing, product detail [0] is expected NOT show '${generalText.updateSchedule}', but got '${eleString}'`)
        }

    }

    public async assert_Billing_ProductList_UpdateScheduleTag_Array1() {

        const ele = this.ele_ProductList_ProductDetail_Array1
        const eleString = await ele.innerText()
        try {
            expect(eleString).toContain(generalText.updateSchedule)
        } catch(error) {
            throw new Error(`In student billing, product detail [1] is expected to show '${generalText.updateSchedule}', but got '${eleString}'`)
        }

    }
    
    public async assert_Billing_ProductList_Discount(discountName: string[]) {
        for (let i = 0; i < discountName.length; i++) {
            const ele = this.ele_ProductList_ProductDetail(i)
            const eleString = (await ele.innerText()).split("Discount")[1]
            try {
                expect(eleString).toContain(discountName[i].toString())
            } catch(error) {
                throw new Error(`In student billing, [${i}] discount is expected to show '${discountName[i]}', but got '${eleString}'`)
            }
        }
    }

    public async assert_Billing_ProductList_AssociateCourse(courseList: string[], course1: string[], course2: string[], course3: string[]) {
        for (let i = 0; i < course1.length; i++) {
            const ele = this.ele_ProductList_ProductDetail(i)
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

    public async assert_Billing_ProductList_ProductStatus(productStatus: string[]) {
        for (let i = 0; i < productStatus.length; i++) {
            const ele = this.ele_ProductList_ProductStatus(i)
            const eleString = await ele.innerText()
            try {
                expect(eleString).toContain(productStatus[i])
            } catch(error) {
                throw new Error(`In student billing, [${i}] product status is expected to show '${productStatus[i]}', but got '${eleString}'`)
            }
        }
    }

    public async assert_Billing_ProductList_Duration(isCurrentDate: boolean[], duration: string[][]) {
        for (let i = 0; i < duration.length; i++) {
            const ele = this.ele_ProductList_Duration(i)
            const eleString = await ele.innerText()
            if (isCurrentDate[i] == false) {
                try {
                    const isEleStringValid = duration[i].some(date => eleString.includes(date))
                    expect(isEleStringValid).toBe(true);
                } catch(error) {
                    throw new Error(`In student billing, [${i}] duration is expected to show '${duration[i]}', but got '${eleString}'`)
                }
            } if (isCurrentDate[i] == true) {
                try {
                    const common = new sF_CommonStep(this.page)
                    const isCurrentDate0 = eleString.includes(common.currentDate[0] + ' - ' + common.currentDate[0]);
                    const isCurrentDate1 = eleString.includes(common.currentDate[1] + ' - ' + common.currentDate[1]);
                    expect(isCurrentDate0 || isCurrentDate1).toBeTruthy();
                } catch(error) {
                    throw new Error(`In student billing, [${i}] duration is expected to show current date, but got '${eleString}'`)
                }
            }
            
        }
    }    
    
    public async assert_Billing_ProductList_UpcomingBillingDate(billingDate: string[]) {
        for (let i = 0; i < billingDate.length; i++) {
            const ele = this.ele_ProductList_UpcomingBillingDate(i)
            const eleString = await ele.innerText()
            if (billingDate[i] === 'noDate') {
                expect(eleString).toContain('--')
            } if (billingDate[i] != 'noDate') {
                try {
                    const isEleStringValid = billingDate.some(date => eleString.includes(date))
                    expect(isEleStringValid).toBe(true)
                } catch(error) {
                    throw new Error(`In student billing, [${i}] upcoming billing is expected to show '${billingDate}', but got '${eleString}'`)
                }
            }
        }
    }

    public async assert_Billing_ProductList(productRows: {
        isShowTag: boolean,
        tagType: string | null,
        isPackage: boolean,
        associateCourses: {
            courseName: string,
            isVisible: boolean
        }[],
        discountLabel: string,
        productStatus: string,
        durationIsCurrentDate: boolean,
        duration: string[],
        upcomingBillingDate: string[] 
    }[]) {
        
        for (let i = 0; i < productRows.length; i++) {
            const {isShowTag, tagType, isPackage, associateCourses, discountLabel, productStatus, durationIsCurrentDate, duration, upcomingBillingDate} = productRows[i]

            const eleProductName = await this.ele_ProductList_ProductDetail(i).innerText()
            const eleProductStatus = await this.ele_ProductList_ProductStatus(i).innerText()
            const eleDuration = await this.ele_ProductList_Duration(i).innerText()
            const eleUpcomingBillingDate = await this.ele_ProductList_UpcomingBillingDate(i).innerText()

            // Check tag display in product list
            if (isShowTag) {
                try {
                    expect(eleProductName).toContain(tagType)
                } catch(error) {
                    throw new Error(`In student billing, [${i}] is expected to show '${tagType}', but got '${eleProductName}'`)
                }
            } else {
                try {
                    expect(eleProductName).not.toContain('Schedule')
                } catch(error) {
                    throw new Error(`In student billing, [${i}] is not expected to show tag, but got '${eleProductName}'`)
                }
            }

            // Check associate course display in product list
            if (isPackage) {
                for(let courseItemIndex = 0; courseItemIndex < associateCourses.length; courseItemIndex ++){
                    const {courseName, isVisible} = associateCourses[courseItemIndex];
                    if (isVisible) {
                        expect(eleProductName).toContain(courseName);
                    } else {
                        expect(eleProductName).not.toContain(courseName)
                    }
                }
            } else {
                console.log(`This is not package type => There's no associate course in student billing`)
            }

            // Check discount in product list
            try {
                expect(eleProductName).toContain(discountLabel)
            } catch(error) {
                throw new Error(`In student billing, [${i}] is expected to show '${discountLabel}', but got '${eleProductName}'`)
            }

            // Check product status
            try {
                expect(eleProductStatus).toContain(productStatus)
            } catch(error) {
                throw new Error(`In student billing, [${i}] is expected to show '${productStatus}', but got '${eleProductStatus}'`)
            }

            // Check duration
            if (durationIsCurrentDate) {
                try {
                    const currentDateDurationFormats = [
                        sFCommonStep.currentDate[0] + ' - ' + sFCommonStep.currentDate[0],
                        sFCommonStep.currentDate[0] + ' - ' + sFCommonStep.currentDate[0]
                    ]
                    const isDurationValid = currentDateDurationFormats.some(durationFormat => eleDuration.includes(durationFormat));
                    expect(isDurationValid).toBeTruthy();
                } catch(error) {
                    throw new Error(`In student billing, [${i}] duration is expected to show current date, but got '${eleDuration}'`)
                }
            } else {
                try {
                    const isDurationValid = duration.some(date => eleDuration.includes(date))
                    expect(isDurationValid).toBe(true);
                } catch(error) {
                    throw new Error(`In student billing, [${i}] duration is expected to show '${duration}', but got '${eleDuration}'`)
                }
            }

            // Check Upcoming billing date
            try {
                const isUpcomingBillingDateValid = upcomingBillingDate.some(date => eleUpcomingBillingDate.includes(date))
                expect(isUpcomingBillingDateValid).toBe(true);
            } catch(error) {
                throw new Error(`In student billing, [${i}] upcoming billing date is expected to show '${upcomingBillingDate}', but got '${eleUpcomingBillingDate}'`)
            }

        }
        
    }
    
    public async assert_Billing_Billing_BillingItemIsNotVisible() {

        const ele = this.ele_Billing_BillingName_Array0
        const eleCount= await ele.count()
        if(eleCount > 0) {
            throw new Error("Bill Item should not existed")
        } else {
            console.log("Bill item is not exist when order status is draft")
        }

    }
    
    public async assert_Billing_Billing_TotalBillItem(total: number) {

        const ele = this.ele_Billing_BillingName_Couting
        const eleCount= await ele.count()
        if(eleCount != total) {
            throw new Error(`Total of bill item should be '${total}', but got '${eleCount.toString()}'`)
        }
    }
    
    public async assert_Billing_Billing_Billing(isAdjustment: boolean[], isRatioDisplay: boolean[], billingPeriod: string [], ratio: string[]) {
        for (let i = 0; i < billingPeriod.length; i++) {
            const ele = this.ele_Billing_BillingName(i)
            const eleString = await ele.innerText() 
            if (isAdjustment[i] == true) {
                try {
                    expect(eleString).toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In student billing, [${i}] is expected to show '${generalText.adjustment}', but got '${eleString}'`)
                }
            } if (isAdjustment[i] == false) {
                try {
                    expect(eleString).not.toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In student billing, [${i}] is expected to not show '${generalText.adjustment}', but got '${eleString}'`)
                }
            }
            if (isRatioDisplay[i] == true) {
                try {
                    expect(eleString).toContain(billingPeriod[i])
                    expect(eleString).toContain(ratio[i])
                } catch(error) {
                    throw new Error(`In student billing, [${i}] is expected to show '${billingPeriod[i]}' and '${ratio[i]}', but got '${eleString}'`)
                }
            } if (isRatioDisplay[i] == false) {
                try {
                    expect(eleString).toContain(billingPeriod[i])
                    expect(eleString).not.toContain(ratio[i])
                } catch(error) {
                    throw new Error(`In student billing, [${i}] is expected to show '${billingPeriod[i]}' and not show '${ratio[i]}', but got '${eleString}'`)
                }
            }
        }
    }
    
    public async assert_Billing_Billing_BillingName_AssociateCourse(courseList: string[], course1: string[], course2: string[], course3: string[]) {
        for (let i = 0; i < course1.length; i++) {
            const ele = this.ele_Billing_BillingName(i)
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

    public async assert_Billing_Billing_BillingStatus(statusList: string[]) {
        for (let i = 0; i < statusList.length; i++) {
            const ele = this.ele_Billing_BillingStatus(i)
            const eleString = await ele.innerText()
            try {
                expect(eleString).toContain(statusList[i])
            } catch(error) {
                throw new Error(`Billing status array [${i}] is expected '${statusList[i]}', but got '${eleString}'`)
            }
        }

    }

    public async assert_Billing_Billing_BillingDateIsCurrentDate_Array0() {

        const ele = this.ele_Billing_BillingDate_Array0
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))
        if(!isEleStringValid) {
            throw new Error(`Billing date in student billing array 0 is expect current date, but got '${eleString}'`)
        }
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIs2030Jan01_Array0() {

        const ele = this.ele_Billing_BillingDate_Array0
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_01Jan2030.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIs2050Dec31_Array0() {

        const ele = this.ele_Billing_BillingDate_Array0
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2050.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIs2080Dec31_Array0() {

        const ele = this.ele_Billing_BillingDate_Array0
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2080.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIs2110Dec31_Array0() {

        const ele = this.ele_Billing_BillingDate_Array0
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2110.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIsCurrentDate_Array1() {

        const ele = this.ele_Billing_BillingDate_Array1
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))
        if(!isEleStringValid) {
            throw new Error(`Billing date in student billing array 1 is expect current date, but got '${eleString}'`)
        }
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIs2050Dec31_Array1() {

        const ele = this.ele_Billing_BillingDate_Array1
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2050.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIs2080Dec31_Array1() {

        const ele = this.ele_Billing_BillingDate_Array1
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2080.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIsCurrentDate_Array2() {

        const ele = this.ele_Billing_BillingDate_Array2
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))
        if(!isEleStringValid) {
            throw new Error(`Billing date in student billing array 2 is expect current date, but got '${eleString}'`)
        }
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIs2050Dec31_Array2() {

        const ele = this.ele_Billing_BillingDate_Array2
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2050.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIsCurrentDate_Array3() {

        const ele = this.ele_Billing_BillingDate_Array3
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIs2050Dec31_Array3() {

        const ele = this.ele_Billing_BillingDate_Array3
        const eleString = await ele.innerText()
        const isEleStringValid = sF_DateTime.text_31Dec2050.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIsCurrentDate_Array4() {

        const ele = this.ele_Billing_BillingDate_Array4
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_BillingDateIsCurrentDate_Array5() {

        const ele = this.ele_Billing_BillingDate_Array5
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_Billing_Billing_Amount(pricesList: string[][]) {
        for (let i = 0; i < pricesList.length; i++) {
            const ele = this.ele_Billing_Amount(i);
            const eleString = await ele.innerText()
            const isEleStringValid = pricesList[i].some(price => eleString.includes(price))
            if (!isEleStringValid) {
                throw new Error(`The price in array [${i}]: ${eleString} does not match any of the expected price: ${pricesList[i].join(', ')}`);
            }
            expect(isEleStringValid).toBe(true)
        }
    }
    
    public async assert_Billing_BillItem(billItemRows: {
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
    }[]) {
        
        for (let i = 0; i < billItemRows.length; i++) {

            const {isAdjustment, isRecurringProduct, billingPeriod, isRatio, billingRatio, isPackage, associateCourses, billingStatus, billingDate, billingAmount} = billItemRows[i]

            const eleBillingName = await this.ele_Billing_BillingName(i).innerText()
            const eleBillingStatus = await this.ele_Billing_BillingStatus(i).innerText()
            const eleBillingDate = await this.ele_Billing_BillingDate(i).innerText()
            const eleBillingAmount = await this.ele_Billing_Amount(i).innerText()

            // Check tag adjustment show in bill item or not
            if (isAdjustment) {
                try {
                    expect(eleBillingName).toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In student billing, [${i}] is expected to show '${generalText.adjustment}', but got '${eleBillingName}'`)
                }
            } else {
                try {
                    expect(eleBillingName).not.toContain(generalText.adjustment)
                } catch(error) {
                    throw new Error(`In student billing, [${i}] is expected to not show '${generalText.adjustment}', but got '${eleBillingName}'`)
                }
            }

            if (isRecurringProduct) {
                if (isRatio) {
                    try {
                        expect(eleBillingName).toContain(billingPeriod)
                        expect(eleBillingName).toContain(billingRatio)
                    } catch(error) {
                        throw new Error(`In student billing, [${i}] is expected to show '${billingPeriod}' and '${billingRatio}', but got '${eleBillingName}'`)
                    }
                } if (!isRatio) {
                    try {
                        expect(eleBillingName).toContain(billingPeriod)
                        expect(eleBillingName).not.toContain(generalText.billingRatio)
                    } catch(error) {
                        throw new Error(`In student billing, [${i}] is expected to show '${billingPeriod}' and not show '${billingRatio}', but got '${eleBillingName}'`)
                    }
                }
            }

            // Check course display in billing
            if (isPackage) {
                for(let courseItemIndex = 0; courseItemIndex < associateCourses.length; courseItemIndex ++){
                    const {courseName, isVisible} = associateCourses[courseItemIndex];
                    if (isVisible) {
                        expect(eleBillingName).toContain(courseName);
                    } else {
                         expect(eleBillingName).not.toContain(courseName)
                    }
                }
            }

            // Check billing status
            try {
                expect(eleBillingStatus).toContain(billingStatus)
            } catch(error) {
                throw new Error(`In student billing, [${i}] is expected to show '${billingStatus}', but got '${eleBillingStatus}'`)
            }

            // Check billing date
            try {
                const isBillingDateValid = billingDate.some(date => eleBillingDate.includes(date));
                expect(isBillingDateValid).toBe(true);
            } catch (error) {
                throw new Error(`In student billing, [${i}] is expected to show one of '${billingDate}', but got '${eleBillingDate}'`);
            }

            // Check amount
            try {
                const isAmountValid = billingAmount.some(amount => eleBillingAmount.includes(amount));
                expect(isAmountValid).toBe(true);
            } catch (error) {
                throw new Error(`In student billing, [${i}] is expected to show one of '${billingAmount}', but got '${eleBillingAmount}'`);
            }

        }
    }

    public async assert_Billing_TotalOrder(total: number) {
        
        const ele = this.ele_Order_OrderNo_Counting;
        const eleCount = await ele.count();
        if (eleCount != total) {
            throw new Error(`In student billing, total order is expected to show '${total}', but got '${eleCount}'`)
        }
    }

    public async assert_Billing_Order(orderRows: {
        orderType: string, orderStatus: string
    }[]) {

        for (let i = 0; i < orderRows.length; i++) {
            const {orderType, orderStatus} = orderRows[i]
            const eleOrderType = await this.ele_Order_OrderType(i).innerText()
            const eleOrderStatus = await this.ele_Order_OrderStatus(i).innerText()

            try{
                expect(eleOrderType).toContain(orderType)
            } catch(error) {
                throw new Error(`In student billing, order type [${i}] is expected to show '${orderType}', but got '${eleOrderType}'`)
            }

            try{
                expect(eleOrderStatus).toContain(orderStatus)
            } catch(error) {
                throw new Error(`In student billing, order type [${i}] is expected to show '${orderStatus}', but got '${eleOrderStatus}'`)
            }
        }
    }

    public async assert_Billing_Order_OrderType(orderTypeList: string[]) {
        for (let i = 0; i < orderTypeList.length; i++) {
            const ele = this.ele_Order_OrderType(i)
            const eleString = await ele.innerText()
            try{
                expect(eleString).toContain(orderTypeList[i])
            } catch(error) {
                throw new Error(`In student billing, order type [${i}] is expected to show '${orderTypeList[i]}', but got '${eleString}'`)
            }
        }
    }

    public async assert_Billing_Order_OrderTypeIsNew_Array0() {

        const ele = this.ele_Order_OrderType_Array0
        const eleString = await ele.innerText()
        expect(eleString).toContain(orderType.new)

    }
    
    public async assert_Billing_Order_OrderTypeIsUpdate_Array0() {

        const ele = this.ele_Order_OrderType_Array0
        const eleString = await ele.innerText()
        expect(eleString).toContain(orderType.update)

    }
    
    public async assert_Billing_Order_OrderTypeIsNew_Array1() {

        const ele = this.ele_Order_OrderType_Array1
        const eleString = await ele.innerText()
        expect(eleString).toContain(orderType.new)

    }
    
    public async assert_Billing_Order_OrderTypeIsUpdate_Array1() {

        const ele = this.ele_Order_OrderType_Array1
        const eleString = await ele.innerText()
        expect(eleString).toContain(orderType.update)

    }

    public async assert_Billing_Order_OrderTypeIsNew_Array2() {

        const ele = this.ele_Order_OrderType_Array2
        const eleString = await ele.innerText()
        expect(eleString).toContain(orderType.new)

    }

    public async assert_Billing_Order_OrderStatusIsDraft_Array0() {

        const ele = this.ele_Order_OrderStatus_Array0
        const eleString = await ele.innerText()
        expect(eleString).toContain(status.draft)

    }
    
    public async assert_Billing_Order_OrderStatusIsVoided_Array0() {

        const ele = this.ele_Order_OrderStatus_Array0
        const eleString = await ele.innerText()
        expect(eleString).toContain(status.voided)

    }

    public async assert_Billing_Order_OrderStatusIsSubmitted_Array0() {

        const ele = this.ele_Order_OrderStatus_Array0
        const eleString = await ele.innerText()
        expect(eleString).toContain(status.submitted)

    }
}