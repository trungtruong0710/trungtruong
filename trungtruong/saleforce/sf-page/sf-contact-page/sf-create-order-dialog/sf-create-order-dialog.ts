import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import discount from "../../../utils/discount";
import billingDate from "../../../utils/billing-date";
import sF_DateTime from "../../../sf-date-time";
import generalText from "../../../utils/general-text";
import { sFAssertBODAmount, sFAssertUpcomingBilling, sFCommonStep, sFContactDetail, sFCreateOrder } from "../../test-hook";
import environment from "../../../utils/environment";

export default class sF_CreateOrder_Dialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE CREATE ORDER DIALOG =========================================================
     */

    public get eleAddNewProduct() {
        const eleAddNewProduct = this.page.locator('[data-testid="TableAddDeleteRow__addButton"] >> [data-testid="AddIcon"]')
        if(eleAddNewProduct != null) {
            return eleAddNewProduct;
        }else throw new Error('Cannot find eleAddNewProduct')
    } // Get Add new button

    // Get start date
    public get ele_DefaultStartDate() {
         const ele_DefaultStartDate = this.page.getByTestId('OrderForm__defaultStartDate').getByTestId('MDatePickerHF__input')
         if(ele_DefaultStartDate != null) {
             return ele_DefaultStartDate;
         }else throw new Error('Cannot find ele_DefaultStartDate')
     }
    
    // Get start date
    public get ele_StartDate() {
        const ele_StartDate = this.page.getByTestId('RecurringProductDetails__startDate').getByTestId('MDatePickerHF__input')
        if(ele_StartDate != null) {
            return ele_StartDate;
        }else throw new Error('Cannot find ele_StartDate')
    }
    
     // Get start date
    public get ele_PackageStartDate() {
        const ele_PackageStartDate = this.page.getByTestId('PackageProductDetails__startDate').getByTestId('MDatePickerHF__input')
        if(ele_PackageStartDate != null) {
            return ele_PackageStartDate;
        }else throw new Error('Cannot find ele_PackageStartDate')
    }

    //  // Get start date
    //  public elePackageStartDate(position: number) {
    //     const ele_PackageStartDate = this.page.getByTestId('PackageProductDetails__startDate').getByTestId('MDatePickerHF__input').nth(position)
    //     if(ele_PackageStartDate != null) {
    //         return ele_PackageStartDate;
    //     }else throw new Error('Cannot find ele_PackageStartDate ' + position)
    // }

     // Get start date
     public eleRecurringStartDate(position: number) {
        const eleRecurringStartDate = this.page.locator('[name="productItems.'+ position +'.recurringDetails_startDate"]')
        if(eleRecurringStartDate != null) {
            return eleRecurringStartDate;
        }else throw new Error('Cannot find eleRecurringStartDate ' + position)
    }
    
     // Get effective date
     public get ele_EffectiveDate() {
        const ele_EffectiveDate = this.page.locator('[name="productItems.0.updateOrderDetails_effectiveDate"]')
        if(ele_EffectiveDate != null) {
            return ele_EffectiveDate;
        }else throw new Error('Cannot find ele_EffectiveDate')
    }
    
    // Get package course
    public elePackageAssociateCourse(position: number) {
        const elePackageAssociateCourse = this.page.locator('[data-testid="PackageCourseDetailsSF__checkbox"]').nth(position)
        if(elePackageAssociateCourse != null) {
            return elePackageAssociateCourse;
        }else throw new Error('Cannot find elePackageAssociateCourse ' + position)
    }
    
    // Get package course
    public get ele_PackageCourse_Array1() {
        const ele_PackageCourse_Array1 = this.page.locator('[data-testid="PackageCourseDetailsSF__checkbox"]').nth(1)
        if(ele_PackageCourse_Array1 != null) {
            return ele_PackageCourse_Array1;
        }else throw new Error('Cannot find ele_PackageCourse_Array1')
    }

    // Get package course
    public get ele_PackageCourse_Array2() {
        const ele_PackageCourse_Array2 = this.page.locator('[data-testid="PackageCourseDetailsSF__checkbox"]').nth(2)
        if(ele_PackageCourse_Array2 != null) {
            return ele_PackageCourse_Array2;
        }else throw new Error('Cannot find ele_PackageCourse_Array2')
    }
    
    // Get number of slot
    public eleNumberOfSlot(position: number) {
        const eleNumberOfSlot = this.page.locator('[data-testid="PackageCourseDetailsSlot__select"] [title=Open] [data-testid="ArrowDropDownIcon"]').nth(position)
        if(eleNumberOfSlot != null) {
            return eleNumberOfSlot;
        }else throw new Error('Cannot find eleNumberOfSlot ' + position)
    }
    
    // Get number of slot
    public get ele_NumberOfSlot() {
        const ele_NumberOfSlot = this.page.locator('[data-testid="PackageCourseDetailsSlot__select"] [title=Open] [data-testid="ArrowDropDownIcon"]').nth(0)
        if(ele_NumberOfSlot != null) {
            return ele_NumberOfSlot;
        }else throw new Error('Cannot find ele_NumberOfSlot')
    }

    // Get BOD no information
    public get ele_BOD_NoInformation() {
        const ele_BOD_NoInformation = this.page.locator('[data-testid="BilledAtOrderSection__container"]')
        if(ele_BOD_NoInformation != null) {
            return ele_BOD_NoInformation;
        }else throw new Error('Cannot find ele_BOD_NoInformation')
    }
    
     // Get location
    public get ele_Location() {
        const ele_Location = this.page.locator('[data-testid="LocationsLowestLevelAutocompleteHF__autocomplete"]')
        if(ele_Location != null) {
            return ele_Location;
        }else throw new Error('Cannot find ele_Location')
    }
    
    // Get add product
    public get eleAddProduct() {
        const eleAddProduct = this.page.locator('[data-testid="TableAddDeleteRowHeader"] [data-testid="TableAddDeleteRow__addButton"]')
        if(eleAddProduct != null) {
            return eleAddProduct;
        }else throw new Error('Cannot find eleAddProduct')
    }
    
    // Get remove product
    public eleRemoveProduct(position: number) {
        const eleRemoveProduct = this.page.locator('[data-testid="TableAddDeleteRow__root"] [data-testid="DeleteOutlineOutlinedIcon"]').nth(position)
        if(eleRemoveProduct != null) {
            return eleRemoveProduct;
        }else throw new Error('Cannot find eleRemoveProduct ' + position)
    }
    
    // Get remove product
    public get ele_RemoveProduct_Array0() {
        const ele_RemoveProduct_Array0 = this.page.locator('[data-testid="TableAddDeleteRow__root"] [data-testid="DeleteOutlineOutlinedIcon"]').nth(0)
        if(ele_RemoveProduct_Array0 != null) {
            return ele_RemoveProduct_Array0;
        }else throw new Error('Cannot find ele_RemoveProduct_Array0')
    }

    // Get discount
    public  eleDiscount(position: number) {
        const eleDiscount = this.page.locator('[data-testid="DiscountsAutocompleteHF__autocomplete"] [placeholder="Discount"]').nth(position)
        if(eleDiscount != null) {
            return eleDiscount;
        }else throw new Error('Cannot find eleDiscount ' + position)
    }

    // Get discount remove icon
    public eleRemoveDiscount(position: number) {
        const eleRemoveDiscount = this.page.locator('[aria-label="Clear"]').nth(position)
        if(eleRemoveDiscount != null) {
            return eleRemoveDiscount;
        }else throw new Error('Cannot find eleRemoveDiscount ' + position)
    }

    // Get discount
    public get ele_Discount_Array0() {
        const ele_Discount_Array0 = this.page.locator('[data-testid="DiscountsAutocompleteHF__autocomplete"] [placeholder="Discount"]')
        if(ele_Discount_Array0 != null) {
            return ele_Discount_Array0;
        }else throw new Error('Cannot find ele_Discount_Array0')
    }

    // Get discount remove icon
    public get ele_RemoveDiscount_Array0() {
        const ele_RemoveDiscount_Array0 = this.page.locator('[aria-label="Clear"]').nth(0)
        if(ele_RemoveDiscount_Array0 != null) {
            return ele_RemoveDiscount_Array0;
        }else throw new Error('Cannot find ele_RemoveDiscount_Array0')
    }

    // Get comment
    public get ele_Comment() {
        const ele_Comment = this.page.locator('[data-testid="CommentSection__commentInput"]')
        if(ele_Comment != null) {
            return ele_Comment;
        }else throw new Error('Cannot find ele_Comment')
    }

    // Get Product 
    public eleProduct(position: number) {
        const eleProduct = this.page.locator('[data-testid="ProductAutocompleteWithIdsHF__autocomplete"] [placeholder="Name"]').nth(position)
        if(eleProduct != null) {
            return eleProduct;
        }else throw new Error('Cannot find eleProduct ' + position)
    }

    // Get Product array 0
    public get eleProduct_Array0() {
        const eleProduct_Array0 = this.page.locator('[data-testid="ProductAutocompleteWithIdsHF__autocomplete"] [placeholder="Name"]').nth(0)
        if(eleProduct_Array0 != null) {
            return eleProduct_Array0;
        }else throw new Error('Cannot find eleProduct_Array0')
    }

    // Get billing date array 0
    public get ele_BillingDate_Array0() {
        const ele_BillingDate_Array0 = this.page.locator('[data-testid="ProductListItemDetails__billingDate"]').nth(0)
        if(ele_BillingDate_Array0 != null) {
            return ele_BillingDate_Array0;
        }else throw new Error('Cannot find ele_BillingDate_Array0')
    }

    // Get bod bill item
    public ele_BOD_BillItem(position: number) {
        const ele_BOD_BillItem = this.page.locator('[data-testid="BilledAtOrderList__orderItemList"] [data-testid="BilledAtOrderItem__name"]').nth(position)
        if(ele_BOD_BillItem != null) {
            return ele_BOD_BillItem;
        }else throw new Error('Cannot find ele_BOD_BillItem ' + position)
    }

    // Get bod bill item array 0 
    public get ele_BOD_BillItem_Array0() {
        const ele_BOD_BillItem_Array0 = this.page.locator('[data-testid="BilledAtOrderList__orderItemList"] [data-testid="BilledAtOrderItem__name"]').nth(0)
        if(ele_BOD_BillItem_Array0 != null) {
            return ele_BOD_BillItem_Array0;
        }else throw new Error('Cannot find ele_BOD_BillItem_Array0')
    }

    // Get bod bill item array 1
    public get ele_BOD_BillItem_Array1() {
        const ele_BOD_BillItem_Array1 = this.page.locator('[data-testid="BilledAtOrderList__orderItemList"] [data-testid="BilledAtOrderItem__name"]').nth(1)
        if(ele_BOD_BillItem_Array1 != null) {
            return ele_BOD_BillItem_Array1;
        }else throw new Error('Cannot find ele_BOD_BillItem_Array1')
    }
    
    // Get bod bill item package
    public ele_BOD_BillItemPackage(position: number) {
        const ele_BOD_BillItemPackage = this.page.locator('[data-testid="PackageBilledAtOrder__productContainer"] [data-testid="BilledAtOrderItem__container"]').nth(position)
        if(ele_BOD_BillItemPackage != null) {
            return ele_BOD_BillItemPackage;
        }else throw new Error('Cannot find ele_BOD_BillItemPackage')
    }
    
    // Get bill at order package array 0 
    public ele_BOD_Package(position: number) {
        const ele_BOD_Package = this.page.locator('[data-testid="PackageBilledAtOrder__productContainer"] [data-testid="BilledAtOrderItem__container"]').nth(position)
        if(ele_BOD_Package != null) {
            return ele_BOD_Package;
        }else throw new Error('Cannot find ele_BOD_Package ' + position)
    }
    
    // Get bod bill item package array 0 
    public get ele_BOD_BillItemPackage_Array0() {
        const ele_BOD_BillItemPackage_Array0 = this.page.locator('[data-testid="PackageBilledAtOrder__productContainer"] [data-testid="BilledAtOrderItem__container"]').nth(0)
        if(ele_BOD_BillItemPackage_Array0 != null) {
            return ele_BOD_BillItemPackage_Array0;
        }else throw new Error('Cannot find ele_BOD_BillItemPackage_Array0')
    }

    // Get bod bill item package array 1
    public get ele_BOD_BillItemPackage_Array1() {
        const ele_BOD_BillItemPackage_Array1 = this.page.locator('[data-testid="PackageBilledAtOrder__productContainer"] [data-testid="BilledAtOrderItem__container"]').nth(1)
        if(ele_BOD_BillItemPackage_Array1 != null) {
            return ele_BOD_BillItemPackage_Array1;
        }else throw new Error('Cannot find ele_BOD_BillItemPackage_Array1')
    }

    // Get bod price array 0
    public get ele_BOD_Price_Array0() {
        const ele_BOD_Price_Array0 = this.page.locator('[data-testid="BilledAtOrderProduct__productContainer"] [data-testid="BilledAtOrderItem__price"]').nth(0)
        if(ele_BOD_Price_Array0 != null) {
            return ele_BOD_Price_Array0;
        }else throw new Error('Cannot find ele_BOD_Price_Array0')
    }

    // Get bod price array 1
    public get ele_BOD_Price_Array1() {
        const ele_BOD_Price_Array1 = this.page.locator('[data-testid="BilledAtOrderProduct__productContainer"] [data-testid="BilledAtOrderItem__price"]').nth(1)
        if(ele_BOD_Price_Array1 != null) {
            return ele_BOD_Price_Array1;
        }else throw new Error('Cannot find ele_BOD_Price_Array1')
    }

    // Get bod price
    public ele_BOD_PackagePrice(position: number) {
        const ele_BOD_PackagePrice = this.page.locator('[data-testid="PackageBilledAtOrder__productContainer"] [data-testid="BilledAtOrderItem__price"]').nth(position)
        if(ele_BOD_PackagePrice != null) {
            return ele_BOD_PackagePrice;
        }else throw new Error('Cannot find ele_BOD_PackagePrice')
    }

    // Get bod price array 0
    public get ele_BOD_PackagePrice_Array0() {
        const ele_BOD_PackagePrice_Array0 = this.page.locator('[data-testid="PackageBilledAtOrder__productContainer"] [data-testid="BilledAtOrderItem__price"]').nth(0)
        if(ele_BOD_PackagePrice_Array0 != null) {
            return ele_BOD_PackagePrice_Array0;
        }else throw new Error('Cannot find ele_BOD_PackagePrice_Array0')
    }

    // Get bod price array 1
    public get ele_BOD_PackagePrice_Array1() {
        const ele_BOD_PackagePrice_Array1 = this.page.locator('[data-testid="PackageBilledAtOrder__productContainer"] [data-testid="BilledAtOrderItem__price"]').nth(1)
        if(ele_BOD_PackagePrice_Array1 != null) {
            return ele_BOD_PackagePrice_Array1;
        }else throw new Error('Cannot find ele_BOD_PackagePrice_Array1')
    }

    // Get bod discount array 0
    public get ele_BOD_Discount_Array0() {
        const ele_BOD_Discount_Array0 = this.page.locator('[data-testid="BilledAtOrderProduct__discountContainer"]').nth(0)
        if(ele_BOD_Discount_Array0 != null) {
            return ele_BOD_Discount_Array0;
        }else throw new Error('Cannot find ele_BOD_Discount_Array0')
    }

    // Get bod discount array 1
    public get ele_BOD_Discount_Array1() {
        const ele_BOD_Discount_Array1 = this.page.locator('[data-testid="BilledAtOrderProduct__discountContainer"]').nth(1)
        if(ele_BOD_Discount_Array1 != null) {
            return ele_BOD_Discount_Array1;
        }else throw new Error('Cannot find ele_BOD_Discount_Array1')
    }

    // Get bod discount package array 0
    public get ele_BOD_PackageDiscount_Counting() {
        const ele_BOD_PackageDiscount_Counting = this.page.locator('[data-testid="PackageBilledAtOrder__discountContainer"]')
        if(ele_BOD_PackageDiscount_Counting != null) {
            return ele_BOD_PackageDiscount_Counting;
        }else throw new Error('Cannot find ele_BOD_PackageDiscount_Counting')
    }

    // Get bod discount package array 0
    public ele_BOD_PackageDiscount(position: number) {
        const ele_BOD_PackageDiscount = this.page.locator('[data-testid="PackageBilledAtOrder__discountContainer"]').nth(position)
        if(ele_BOD_PackageDiscount != null) {
            return ele_BOD_PackageDiscount;
        }else throw new Error('Cannot find ele_BOD_PackageDiscount ' + position)
    }

    // Get bod discount package array 0
    public get ele_BOD_DiscountPackage_Array0() {
        const ele_BOD_DiscountPackage_Array0 = this.page.locator('[data-testid="PackageBilledAtOrder__discountContainer"]').nth(0)
        if(ele_BOD_DiscountPackage_Array0 != null) {
            return ele_BOD_DiscountPackage_Array0;
        }else throw new Error('Cannot find ele_BOD_DiscountPackage_Array0')
    }

    // Get bod discount package array 1
    public get ele_BOD_DiscountPackage_Array1() {
        const ele_BOD_DiscountPackage_Array1 = this.page.locator('[data-testid="PackageBilledAtOrder__discountContainer"]').nth(1)
        if(ele_BOD_DiscountPackage_Array1 != null) {
            return ele_BOD_DiscountPackage_Array1;
        }else throw new Error('Cannot find ele_BOD_DiscountPackage_Array1')
    }

    // Get bod tax
    public get ele_BOD_Tax() {
        const ele_BOD_Tax = this.page.locator('[data-testid="BilledAtOrderList__taxInclusions"]')
        if(ele_BOD_Tax != null) {
            return ele_BOD_Tax;
        }else throw new Error('Cannot find ele_BOD_Tax')
    }

    // Get bod tax array 0
    public get ele_BOD_Tax_Array0() {
        const ele_BOD_Tax_Array0 = this.page.locator('[data-testid="BilledAtOrderList__taxInclusions"]').nth(0)
        if(ele_BOD_Tax_Array0 != null) {
            return ele_BOD_Tax_Array0;
        }else throw new Error('Cannot find ele_BOD_Tax_Array0')
    }

    // Get bod subTotal
    public get ele_SubTotal() {
        const ele_SubTotal = this.page.locator('[data-testid="BilledAtOrderList__subtotal"]')
        if(ele_SubTotal != null) {
            return ele_SubTotal;
        }else throw new Error('Cannot find ele_SubTotal')
    }

    // Get bod total
    public get ele_Total() {
        const ele_Total = this.page.locator('[data-testid="BilledAtOrderList__total"]')
        if(ele_Total != null) {
            return ele_Total;
        }else throw new Error('Cannot find ele_Total')
    }

    // Get upcoming billing no information
    public get ele_UB_NoInformation() {
        const ele_Total = this.page.locator('[data-testid="UpcomingBillingSection__noDataContainer"]')
        if(ele_Total != null) {
            return ele_Total;
        }else throw new Error('Cannot find ele_Total')
    }
    
    // Get upcoming full Package array 0
    public ele_UB_FullPackage(position: number) {
        const ele_UB_FullPackage = this.page.locator('[data-testid="UpcomingBillingProduct__root"]').nth(position)
        if(ele_UB_FullPackage != null) {
            return ele_UB_FullPackage;
        }else throw new Error('Cannot find ele_UB_FullPackage')
    }
    
    // Get upcoming full Package array 0
    public get ele_UB_FullPackage_Array0() {
        const ele_UB_FullPackage_Array0 = this.page.locator('[data-testid="UpcomingBillingProduct__root"]').nth(0)
        if(ele_UB_FullPackage_Array0 != null) {
            return ele_UB_FullPackage_Array0;
        }else throw new Error('Cannot find ele_UB_FullPackage_Array0')
    }

    // Get upcoming billing bill item array 0
    public get ele_UB_BillItem_Array0() {
        const ele_UB_BillItem_Array0 = this.page.locator('[data-testid="UpcomingBillingProduct__name"]').nth(0)
        if(ele_UB_BillItem_Array0 != null) {
            return ele_UB_BillItem_Array0;
        }else throw new Error('Cannot find ele_UB_BillItem_Array0')
    }

    // Get upcoming price 
    public ele_UB_Price(position: number) {
        const ele_UB_Price = this.page.locator('[data-testid="UpcomingBillingProduct__price"]').nth(position)
        if(ele_UB_Price != null) {
            return ele_UB_Price;
        }else throw new Error('Cannot find ele_UB_Price')
    }

    // Get upcoming price array 0
    public get ele_UB_Price_Array0() {
        const ele_UB_Price_Array0 = this.page.locator('[data-testid="UpcomingBillingProduct__price"]').nth(0)
        if(ele_UB_Price_Array0 != null) {
            return ele_UB_Price_Array0;
        }else throw new Error('Cannot find ele_UB_Price_Array0')
    }

    // Get upcoming discount array 0
    public get ele_UB_Discount_Array0() {
        const ele_UB_Discount_Array0 = this.page.locator('[data-testid="UpcomingBillingProduct__discount"]').nth(0)
        if(ele_UB_Discount_Array0 != null) {
            return ele_UB_Discount_Array0;
        }else throw new Error('Cannot find ele_UB_Discount_Array0')
    }

    // Get upcoming billing date array 0
    public get ele_UB_BillingDate_Array0() {
        const ele_UB_BillingDate_Array0 = this.page.locator('[data-testid="UpcomingBillingProduct__billingDate"]').nth(0)
        if(ele_UB_BillingDate_Array0 != null) {
            return ele_UB_BillingDate_Array0;
        }else throw new Error('Cannot find ele_UB_BillingDate_Array0')
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async assert_BOD_NoInformation() {

        const ele = this.ele_BOD_NoInformation
        const eleString = await ele?.innerText()
        expect(eleString).toContain('No Information')

    }

    // remove
    public async select_Location() {

        const ele = this.ele_Location
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await this.page.getByRole('option', { name: environment.location, exact: true }).click();

    }

    public async selectLocation(location: string) {

        const ele = this.ele_Location
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await this.page.getByRole('option', { name: location, exact: true }).click();

    }

    public async removeProduct(position: number) {

        const ele = this.eleRemoveProduct(position)
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await ele?.click();

    }

    public async click_RemoveProduct_Array0() {

        const ele = this.ele_RemoveProduct_Array0
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await ele?.click();

    }

    public async click_RemoveDiscount() {

        const eleDiscount = this.ele_Discount_Array0
        const eleRemoveDiscount = this.ele_RemoveDiscount_Array0
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDiscount?.hover();
        await common.wait(200);
        await eleRemoveDiscount?.click();

    }

    public async removeDiscount(discountPosition: number) {

        const ele = this.eleDiscount(discountPosition)
        const eleRemoveDiscount = this.eleRemoveDiscount(0)
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await ele?.hover();
        await common.wait(200);
        await eleRemoveDiscount?.click();

    }

    public async selectDiscount(discountPosition: number, discountName: string) {

        let i = 0
        const ele = this.eleDiscount(i)
        const common = new sF_CommonStep(this.page)
        await this.removeDiscount(discountPosition);
        await common.wait(200);
        await ele?.fill(discountName)
        await common.wait(200);
        await this.page.getByRole('option', { name: discountName }).click();
        await common.wait(500);

    }

    public async selectDiscountWithoutRemoveDiscountFirst(discountName: string) {

        let i = 0
        const ele = this.eleDiscount(i)
        const common = new sF_CommonStep(this.page)
        await ele?.fill(discountName)
        await common.wait(200);
        await this.page.getByRole('option', { name: discountName }).click();
        await common.wait(500);

    }

    public async select_FixedAmountDiscount100_Array0() {

        const ele = this.ele_Discount_Array0
        const common = new sF_CommonStep(this.page)
        await this.click_RemoveDiscount();
        await common.wait(200);
        await ele?.fill(discount.fixedAmount100)
        await common.wait(200);
        await this.page.getByRole('option', { name: discount.fixedAmount100 }).click();
        await common.wait(500);

    }
    
    public async select_10Percent_RVD1_Array0() {

        const ele = this.ele_Discount_Array0
        const common = new sF_CommonStep(this.page)
        await this.click_RemoveDiscount();
        await common.wait(200);
        await ele?.fill(discount.Percent10_RVD1)
        await common.wait(200);
        await this.page.getByRole('option', { name: discount.Percent10_RVD1 }).click();
        await common.wait(500);

    }

    public async select_Update_PercentageDiscount10() {

        const ele = this.ele_Discount_Array0
        const common = new sF_CommonStep(this.page)
        await ele?.fill(discount.Percent10)
        await common.wait(200);
        await this.page.getByRole('option', { name: discount.Percent10 }).click();
        await common.wait(500);

    }

    public async select_Update_10Percent_RVD1() {

        const ele = this.ele_Discount_Array0
        const common = new sF_CommonStep(this.page)
        await ele?.fill(discount.Percent10_RVD1)
        await common.wait(200);
        await this.page.getByRole('option', { name: discount.Percent10_RVD1 }).click();
        await common.wait(500);

    }

    public async selectAssociateCourse(courseMasterCount: number, associateCourseOptions: {
        courseName: string,
        isSelect: boolean
    }[]) {

        for (let eleIndex = 0; eleIndex < courseMasterCount; eleIndex++) {
            
            const ele = this.elePackageAssociateCourse(eleIndex)
            const eleString = await this.elePackageAssociateCourse(eleIndex).innerText()
            const selectableCourse = associateCourseOptions.find(({courseName}) => courseName.includes(eleString));

            if (selectableCourse) {
                if (selectableCourse.isSelect){ 
                    await ele?.click();
                }
            }
        }
    }

    public async select_Optional1Course() {

        const ele1 = this.ele_PackageCourse_Array1
        const ele2 = this.ele_PackageCourse_Array2
        const ele1String = await ele1.innerText();
        const ele2String = await ele2.innerText();
        if (ele1String.includes('OPTIONAL1-1SLOT')) {
            await ele1.click();
        } else if (ele2String.includes('OPTIONAL1-1SLOT')) {
            await ele2.click();
        }

    }

    public async selectSlotForRequireCourse(CourseElement: number, numberOfSlot: number) {

        const ele = this.eleNumberOfSlot(CourseElement)
        await sFCommonStep.wait(500);
        await ele?.click()
        await sFCommonStep.wait(500);
        await this.page.getByRole('option', { name: numberOfSlot.toString() }).click();

    }

    public async select_1Slot_REQCourse() {

        const ele = this.ele_NumberOfSlot
        const common = new sF_CommonStep(this.page)
        await common.wait(500);
        await ele?.click()
        await common.wait(500);
        await this.page.getByRole('option', { name: '1' }).click();

    }
    
    public async select_2Slots_REQCourse() {

        const ele = this.ele_NumberOfSlot
        const common = new sF_CommonStep(this.page)
        await common.wait(500);
        await ele?.click()
        await common.wait(500);
        await this.page.getByRole('option', { name: '2' }).click();

    }

    public async select_Optional2Course() {

        const ele1 = this.ele_PackageCourse_Array1
        const ele2 = this.ele_PackageCourse_Array2
        const ele1String = await ele1.innerText();
        const ele2String = await ele2.innerText();
        if (ele1String.includes('OPTIONAL2-1SLOT')) {
            await ele1.click();
        } else if (ele2String.includes('OPTIONAL2-1SLOT')) {
            await ele2.click();
        }

    }

    public async fill_Comment() {

        const ele = this.ele_Comment
        const common = new sF_CommonStep(this.page)
        await ele?.fill('Sói Con Cô Độc')
        await common.wait(1000)

    }

    public async assert_BillingDate_Array0_IsCurrentDate() {

        const ele = this.ele_BillingDate_Array0
        const common = new sF_CommonStep(this.page)
        const eleString = await ele?.innerText()
        const isEleStringValid = common.currentDate.some(date => eleString.includes(date))
        expect(isEleStringValid).toBe(true)

    }

    public async assert_BillingDate_Array0_Is2030Jan01() {

        const ele = this.ele_BillingDate_Array0
        const eleString = await ele?.innerText()
        expect(eleString).toContain(billingDate.Jan203001)

    }

    public async fill_StartDate(date: string) {

        const ele = this.ele_StartDate
        const common = new sF_CommonStep(this.page)
        await ele?.fill(date)
        await common.wait(1000)
    
    }

    public async fill_PackageStartDate(date: string) {

        const ele = this.ele_PackageStartDate
        const common = new sF_CommonStep(this.page)
        await ele?.fill(date)
        await common.wait(1000)
    
    }

    public async fill_StartDate_BeforeDate() {

        const ele = this.ele_PackageStartDate
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.beforeDate[1])
        await common.wait(1000)
    
    }

    public async fill_StartDate_CurrentDate() {

        const ele = this.ele_PackageStartDate
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.currentDate[1])
        await common.wait(1000)
    
    }
    
    public async fill_EffectiveDate(date: string) {

        const ele = this.ele_EffectiveDate
        const common = new sF_CommonStep(this.page)
        await ele?.fill(date)
        await common.wait(1000)
    
    }

    public async createOrder(orderInfor: {
        location: string,
        productInfo: {
            productType: 'one-time' | 'recurring',
            product: string,
            startDate: string | null,
            packageInfo: {
                courseName: string,
                isSelect: boolean
            }[] | null,
            numberOfSlot: number | null,
        },
        discountInfo: {
            isRemoveDiscount: boolean,
            discountName: string | null,
        } | null,
        isShowBilledAtOrder: boolean,
        totalPrice: string[], 
        isShowUpcomingBilling: boolean,
        upcomingBillingPrice: string[][]
    }
    ) {

        let i = 0
        const common = new sF_CommonStep(this.page)
        const {location, productInfo, discountInfo, isShowBilledAtOrder, totalPrice, isShowUpcomingBilling, upcomingBillingPrice} = orderInfor
        
        // Access create order screen
        await sFContactDetail.clickBtn_CreateOrder();

        // Select location
        await this.ele_Location?.click();
        await common.wait(200);
        await this.page.getByRole('option', { name: location, exact: true }).click();
        await common.wait(1000);

        // Select product
        await this.eleProduct(i)?.fill(productInfo.product)
        await this.page.getByRole('option', { name: productInfo.product, exact: true }).click();

        // Fill comment and wait for product info has been load
        await sFCreateOrder.fill_Comment();
        await common.wait(4000);

        // Check discount info
        if (discountInfo != null) {
            if (discountInfo.isRemoveDiscount) {
                try {
                    await this.removeDiscount(i);
                } catch(error) {
                    throw new Error(`Cannot remove discount`)
                }
                try {
                    if (discountInfo.discountName != null) {
                        await this.selectDiscount(i, discountInfo.discountName);
                    }
                } catch(error) {
                    throw new Error(`Cannot select discount`)
                }
            }
        }

        // Select associate course
        try {
            if (productInfo.packageInfo) {
                await this.selectAssociateCourse(3,productInfo.packageInfo)
            }
        } catch(error) {
            throw new Error(`Cannot select associate course`)
        }

        // Select number of course slot
        if (productInfo.numberOfSlot != null) {
            try {
                await this.selectSlotForRequireCourse(i, productInfo.numberOfSlot);
            } catch(error) {
                throw new Error(`Cannot select associate course slot`)
            }
        }

        // Select start date
        if (productInfo.productType != 'one-time') {
            if (productInfo.startDate != null) {
                try {
                    await this.fill_PackageStartDate(productInfo.startDate);
                } catch(error) {
                    throw new Error(`Cannot select start date`)
                }
            }
        }
        
        // Assert billed at order
        if (isShowBilledAtOrder) {
            await sFAssertBODAmount.assert_BOD_Total(totalPrice);
        } else {
            await sFCreateOrder.assert_BOD_NoInformation();
        }
        
        // Assert upcoming billing
        if (isShowUpcomingBilling) {
            await sFAssertUpcomingBilling.assert_UB_Price(upcomingBillingPrice);
        } else {
            await sFAssertUpcomingBilling.assert_UB_NoInformation();
        }
    }

    public async createMultipleProductsOrder(
        orderInfor: {
            numberOfProduct: number,
            location: string,
            listProductInfor: {
                productInfo: {
                    productType: 'one-time' | 'recurring',
                    product: string,
                    startDate: string | null,
                },
                discountInfo: {
                    isRemoveDiscount: boolean,
                    discountName: string | null,
                } | null,
            }[],
            isShowBilledAtOrder: boolean,
            totalPrice: string[], 
            isShowUpcomingBilling: boolean,
            upcomingBillingPrice: string[][]
        }
    ) {

        const common = new sF_CommonStep(this.page)
        const {location, listProductInfor, isShowBilledAtOrder, totalPrice, isShowUpcomingBilling, upcomingBillingPrice} = orderInfor
        
        // Access create order screen
        await sFContactDetail.clickBtn_CreateOrder();

        // Select location
        await this.ele_Location?.click();
        await common.wait(200);
        await this.page.getByRole('option', { name: location, exact: true }).click();
        await common.wait(1000);

        // Add product
        for (let i = 0; i < listProductInfor.length; i++) {

            // define variable for list product info
            const {productInfo, discountInfo} = listProductInfor[i]
            
            // click add new product
            try {
                if (i > 0 && i < listProductInfor.length) {
                    await this.eleAddNewProduct.click(),
                    await sFCommonStep.wait(500);
                }
            } catch(error) {
                throw new Error(`Cannot click add product`)
            }

            // Select product
            await this.eleProduct(i)?.fill(productInfo.product)
            await this.page.getByRole('option', { name: productInfo.product, exact: true }).click();

            // Fill comment and wait for product info has been load
            await sFCreateOrder.fill_Comment();
            await common.wait(2000);

            // Check discount info
            if (discountInfo != null) {
                if (discountInfo.isRemoveDiscount) {
                    try {
                        await this.removeDiscount(i);
                    } catch(error) {
                        throw new Error(`Cannot remove discount`)
                    }
                    try {
                        if (discountInfo.discountName != null) {
                            await this.selectDiscount(i, discountInfo.discountName);
                        }
                    } catch(error) {
                        throw new Error(`Cannot select discount`)
                    }
                }
            }

            // Select start date
            if (productInfo.productType != 'one-time') {
                if (productInfo.startDate != null) {
                    try {
                        await this.eleRecurringStartDate(i).fill(productInfo.startDate);
                    } catch(error) {
                        throw new Error(`Cannot select start date`)
                    }
                }
            }

        }
        
        // Assert billed at order
        if (isShowBilledAtOrder) {
            await sFAssertBODAmount.assert_BOD_Total(totalPrice);
        } else {
            await sFCreateOrder.assert_BOD_NoInformation();
        }
        
        // Assert upcoming billing
        if (isShowUpcomingBilling) {
            await sFAssertUpcomingBilling.assert_UB_Price(upcomingBillingPrice);
        } else {
            await sFAssertUpcomingBilling.assert_UB_NoInformation();
        }

    }
    
    public async createNotPackageOrder(
        orderInfor: {
            location: string, 
            isRecurringProduct: boolean,
            startDate: string | null, 
            product: string,
            isRemoveDiscount: boolean,
            discountName: string | null,
            updatePackage: {
                courseName: string,
                isSelect: boolean
            }[] | null,
            numberOfSlot: number | null
        }
    ) {

        let i = 0
        const common = new sF_CommonStep(this.page)
        const {location, isRecurringProduct, startDate, product, isRemoveDiscount, discountName, updatePackage, numberOfSlot} = orderInfor
        
        // access create order screen and select location
        try {
            await sFContactDetail.clickBtn_CreateOrder();
        } catch(error) {
            throw new Error(`Cannot click create order`)
        }

        try {
            await sFCreateOrder.selectLocation(location);
        } catch(error) {
            throw new Error(`Cannot select location`)
        }
        
        // Select product
        try {
            await sFCreateOrder.eleProduct(i).fill(product)
            await this.page.getByRole('option', { name: product, exact: true }).click();
        } catch(error) {
            throw new Error(`Cannot add product`)
        }

        // Add comment and wait for product information is loaded successfully
        await sFCreateOrder.fill_Comment();
        await common.wait(4000);

        // Check discount
        if (isRemoveDiscount) {
            try {
                await sFCreateOrder.removeDiscount(i);
            } catch(error) {
                throw new Error(`In create order screen, cannot remove discount`)
            }
            if (discountName != null) {
                try {
                    await sFCreateOrder.selectDiscount(i, discountName);
                } catch(error) {
                    throw new Error(`In create order screen, cannot select discount`)
                }
            }
        }

        if (updatePackage) {
            try {
                await sFCreateOrder.selectAssociateCourse(3,updatePackage)
            } catch(error) {
                throw new Error(`In create order screen, cannot select associate course`)
            }
        }

        if (numberOfSlot != null) {
            try {
                await sFCreateOrder.selectSlotForRequireCourse(i, numberOfSlot);
            } catch(error) {
                throw new Error(`In create order screen, cannot change number of course slot`)
            }
        }

        if (isRecurringProduct) {
            if (startDate != null) {
                try {
                    await sFCreateOrder.fill_PackageStartDate(startDate);
                } catch(error) {
                    throw new Error(`In create order screen, cannot fill start date`)
                }
            }
        }
        await common.wait(500)
    }

    public async assertCreateCustomBillingOrderSuccess() {

        const ele = this.page.locator('text=Submitted Successfully')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('Submitted Successfully')
        } catch(error) {
            throw new Error(`Not show success msg 'Submitted Successfully'`)
        }
    }

    public async assertCreateOrderSuccess() {

        const ele = this.page.locator('text=You have created the order successfully')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('You have created the order successfully')
        } catch(error) {
            throw new Error(`Not show success msg 'You have created the order successfully'`)
        }
    }

    public async assert_Error_DuplicateCourse() {

        const ele = this.page.locator('text=You are not allowed to order to duplicate courses.')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('You are not allowed to order to duplicate courses.')
        } catch(error) {
            throw new Error(`Not show err msg 'You are not allowed to order to duplicate courses.'`)
        }
    }

    public async assert_Error_OverlapTimeRangeOfCourse() {

        const ele = this.page.locator('text=You are not allowed to order a course with an overlapping date to the same course.')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('You are not allowed to order a course with an overlapping date to the same course.')
        } catch(error) {
            throw new Error(`Not show err msg 'You are not allowed to order a course with an overlapping date to the same course.'`)
        }
    }
    
    public async assert_Error_PriceNotDefine() {

        const ele = this.page.locator('text=There are products which price is not defined, please check')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('There are products which price is not defined, please check')
        } catch(error) {
            throw new Error(`Not show err msg 'There are products which price is not defined, please check'`)
        }
    }

    public async assertErrorUpdateScheduled() {

        const ele = this.page.locator('text=Student has products which are “update scheduled” in the selected location')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('Student has products which are “update scheduled” in the selected location')
        } catch(error) {
            throw new Error(`Not show err msg 'Student has products which are “update scheduled” in the selected location'`)
        }
    }

}