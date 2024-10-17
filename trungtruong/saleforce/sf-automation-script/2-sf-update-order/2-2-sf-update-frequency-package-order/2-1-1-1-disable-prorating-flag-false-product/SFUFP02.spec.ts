import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateFP, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep, sFAssertAdjustmentUpcomingBilling } from '../../../../sf-page/test-hook';
import sF_DateTime from '../../../../sf-date-time';
import billingDate from '../../../../utils/billing-date';
import billingPeriod from '../../../../utils/billing-period';
import discount from '../../../../utils/discount';
import generalText from '../../../../utils/general-text';
import orderType from '../../../../utils/order-type';
import price from '../../../../utils/price';
import FP from '../../../../utils/product-frequency-package';
import productStatus from '../../../../utils/product-status';
import status from '../../../../utils/status';

test.describe('Update frequency package product (eff.date belong to next billing schedule period)', () => {

    test('Update discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen1499);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true],[billingPeriod.period_2051_2080],[billingPeriod.ratio23]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen0]); // ((1000*2/3)-(100*2/3)) - ((1000*2/3)-((1000*2/3)*0.1))
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        await sFOrderDetail.assert_OrderDetail_Billing_Billing(
            [false, false], 
            [false, false], 
            [
              billingPeriod.period_2111_2140, 
              billingPeriod.period_2081_2110
            ], 
            [
              generalText.billingRatio, 
              generalText.billingRatio
            ]
          );
        await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
            [
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFOrderDetail.assert_OrderDetail_BillingStatus([status.cancelled, status.cancelled]);
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2110Dec31_Array0();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2080Dec31_Array1();
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen900, price.Yen900]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_1991Jan01_2050Dec31]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_TotalBillItem(6);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                false,
                false,
                true,
                false,
                false,
                false
            ], 
            [
                false,
                false,
                true,
                false,
                false,
                true 
            ], 
            [
                billingPeriod.period_2111_2140,
                billingPeriod.period_2081_2110,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2021_2050,
                billingPeriod.period_1991_2020,
            ], 
            [
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23,
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only',
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending, status.pending, status.pending, status.billed, status.billed]);
        await sFBilling.assert_Billing_Billing_Amount([price.Yen900, price.Yen900, price.Yen0, price.Yen900, price.Yen900, price.Yen599]);
        await sFBilling.assert_Billing_Billing_BillingDateIs2110Dec31_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIs2080Dec31_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array2();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array3();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array4();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array5();
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
        
    })

    test('Increase slot for associate course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen1499);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCreateOrder.select_2Slots_REQCourse();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_2SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true],[billingPeriod.period_2051_2080],[billingPeriod.ratio23]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen666]); // ((2000*2/3)-(100*2/3)) - ((1000*2/3)-((1000*2/3)*0.1))
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_2SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        await sFOrderDetail.assert_OrderDetail_Billing_Billing(
            [false, false], 
            [false, false], 
            [
              billingPeriod.period_2111_2140, 
              billingPeriod.period_2081_2110
            ], 
            [
              generalText.billingRatio, 
              generalText.billingRatio
            ]
          );
        await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
            [
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFOrderDetail.assert_OrderDetail_BillingStatus([status.cancelled, status.cancelled]);
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2110Dec31_Array0();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2080Dec31_Array1();
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen900, price.Yen900]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_1991Jan01_2050Dec31]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_TotalBillItem(6);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                false,
                false,
                true,
                false,
                false,
                false
            ], 
            [
                false,
                false,
                true,
                false,
                false,
                true 
            ], 
            [
                billingPeriod.period_2111_2140,
                billingPeriod.period_2081_2110,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2021_2050,
                billingPeriod.period_1991_2020,
            ], 
            [
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23,
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only',
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_2SLOT,
                FP.FP_REQ_2SLOT,
                FP.FP_REQ_2SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending, status.pending, status.pending, status.billed, status.billed]);
        await sFBilling.assert_Billing_Billing_Amount([price.Yen1900, price.Yen1900, price.Yen666, price.Yen900, price.Yen900, price.Yen599]);
        await sFBilling.assert_Billing_Billing_BillingDateIs2110Dec31_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIs2080Dec31_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array2();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array3();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array4();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array5();
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
        
    })

    test('Decrease slot for associate course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.select_2Slots_REQCourse()
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen2999);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCreateOrder.select_1Slot_REQCourse();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true],[billingPeriod.period_2051_2080],[billingPeriod.ratio23]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.minusYen600]); // ((1000*2/3)-(100*2/3)) - ((2000*2/3)-((2000*2/3)*0.1))
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        await sFOrderDetail.assert_OrderDetail_Billing_Billing(
            [false, false], 
            [false, false], 
            [
              billingPeriod.period_2111_2140, 
              billingPeriod.period_2081_2110
            ], 
            [
              generalText.billingRatio, 
              generalText.billingRatio
            ]
          );
        await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
            [
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_2SLOT,
                FP.FP_REQ_2SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFOrderDetail.assert_OrderDetail_BillingStatus([status.cancelled, status.cancelled]);
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2110Dec31_Array0();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2080Dec31_Array1();
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen1800, price.Yen1800]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_2SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_1991Jan01_2050Dec31]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_TotalBillItem(6);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                false,
                false,
                true,
                false,
                false,
                false
            ], 
            [
                false,
                false,
                true,
                false,
                false,
                true 
            ], 
            [
                billingPeriod.period_2111_2140,
                billingPeriod.period_2081_2110,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2021_2050,
                billingPeriod.period_1991_2020,
            ], 
            [
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23,
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only',
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_2SLOT,
                FP.FP_REQ_2SLOT,
                FP.FP_REQ_2SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending, status.pending, status.pending, status.billed, status.billed]);
        await sFBilling.assert_Billing_Billing_Amount([price.Yen900, price.Yen900, price.minusYen600, price.Yen1800, price.Yen1800, price.Yen1199]);
        await sFBilling.assert_Billing_Billing_BillingDateIs2110Dec31_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIs2080Dec31_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array2();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array3();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array4();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array5();
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
        
    })

    test('Update add associate course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen1499);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCreateOrder.select_Optional1Course();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require & optional1 courses'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true],[billingPeriod.period_2051_2080],[billingPeriod.ratio23]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen666]); // ((2000*2/3)-(100*2/3)) - ((1000*2/3)-((1000*2/3)*0.1))
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require & optional1 courses'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        await sFOrderDetail.assert_OrderDetail_Billing_Billing(
            [false, false], 
            [false, false], 
            [
              billingPeriod.period_2111_2140, 
              billingPeriod.period_2081_2110
            ], 
            [
              generalText.billingRatio, 
              generalText.billingRatio
            ]
          );
        await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
            [
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFOrderDetail.assert_OrderDetail_BillingStatus([status.cancelled, status.cancelled]);
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2110Dec31_Array0();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2080Dec31_Array1();
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen900, price.Yen900]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_1991Jan01_2050Dec31]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_TotalBillItem(6);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                false,
                false,
                true,
                false,
                false,
                false
            ], 
            [
                false,
                false,
                true,
                false,
                false,
                true 
            ], 
            [
                billingPeriod.period_2111_2140,
                billingPeriod.period_2081_2110,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2021_2050,
                billingPeriod.period_1991_2020,
            ], 
            [
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23,
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
            [
                'require & optional1 courses',
                'require & optional1 courses',
                'require & optional1 courses',
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending, status.pending, status.pending, status.billed, status.billed]);
        await sFBilling.assert_Billing_Billing_Amount([price.Yen1900, price.Yen1900, price.Yen666, price.Yen900, price.Yen900, price.Yen599]);
        await sFBilling.assert_Billing_Billing_BillingDateIs2110Dec31_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIs2080Dec31_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array2();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array3();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array4();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array5();
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
        
    })

    test('Update remove associate course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.select_Optional1Course()
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen2999);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCreateOrder.select_Optional1Course();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true],[billingPeriod.period_2051_2080],[billingPeriod.ratio23]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.minusYen600]); // ((1000*2/3)-(100*2/3)) - ((2000*2/3)-((2000*2/3)*0.1))
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        await sFOrderDetail.assert_OrderDetail_Billing_Billing(
            [false, false], 
            [false, false], 
            [
              billingPeriod.period_2111_2140, 
              billingPeriod.period_2081_2110
            ], 
            [
              generalText.billingRatio, 
              generalText.billingRatio
            ]
          );
        await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
            [
                'require & optional1 courses',
                'require & optional1 courses'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFOrderDetail.assert_OrderDetail_BillingStatus([status.cancelled, status.cancelled]);
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2110Dec31_Array0();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2080Dec31_Array1();
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen1800, price.Yen1800]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require & optional1 courses'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_1991Jan01_2050Dec31]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_TotalBillItem(6);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                false,
                false,
                true,
                false,
                false,
                false
            ], 
            [
                false,
                false,
                true,
                false,
                false,
                true 
            ], 
            [
                billingPeriod.period_2111_2140,
                billingPeriod.period_2081_2110,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2051_2080,
                billingPeriod.period_2021_2050,
                billingPeriod.period_1991_2020,
            ], 
            [
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23,
                generalText.billingRatio,
                generalText.billingRatio,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only',
                'require & optional1 courses',
                'require & optional1 courses',
                'require & optional1 courses'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending, status.pending, status.pending, status.billed, status.billed]);
        await sFBilling.assert_Billing_Billing_Amount([price.Yen900, price.Yen900, price.minusYen600, price.Yen1800, price.Yen1800, price.Yen1199]);
        await sFBilling.assert_Billing_Billing_BillingDateIs2110Dec31_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIs2080Dec31_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array2();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array3();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array4();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array5();
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
        
    })
})