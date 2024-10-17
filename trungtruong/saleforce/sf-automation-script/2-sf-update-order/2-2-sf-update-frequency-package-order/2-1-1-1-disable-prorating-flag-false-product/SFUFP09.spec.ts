import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateFP, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep, sFAssertBODAdjustBillItem, sFAssertBODAdjustAmount, sFAssertAdjustmentUpcomingBilling } from '../../../../sf-page/test-hook';
import sF_DateTime from '../../../../sf-date-time';
import billingDate from '../../../../utils/billing-date';
import billingPeriod from '../../../../utils/billing-period';
import generalText from '../../../../utils/general-text';
import orderType from '../../../../utils/order-type';
import price from '../../../../utils/price';
import FP from '../../../../utils/product-frequency-package';
import productStatus from '../../../../utils/product-status';
import status from '../../../../utils/status';

test.describe('Cancel frequency package product (Disable_prorating_flag = false)', () => {

    test('Cancel product with disable_prorating_flag = false, origin order has billed at order and upcoming billing, eff.date = billing ratio x/y', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen1666);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.click_RemoveProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sFCommonStep.currentDate[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAdjustBillItem.assert_BOD_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_BillingPeriod([billingPeriod.period_2021_2050]);
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_Ratio([billingPeriod.ratio13]);
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOTWk],[FP.FP_OPTIONAL1_1SLOTWk],[FP.FP_OPTIONAL2_1SLOTWk]);
        await sFAssertBODAdjustAmount.assert_BOD_AdjustPricePackage_MinusYen333_Array0(); // -(1000/3)
        await sFAssertBODAdjustAmount.assert_BOD_AdjustTax10_MinusYen30();
        await sFAssertBODAdjustAmount.assert_BOD_AdjustTotal_MinusYen333();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([false],[billingPeriod.period_2051_2080],[generalText.billingRatio]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.minusYen1000]);
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_Discount(['--']);
        await sFOrderDetail.assert_OrderDetail_StartDate([sFCommonStep.currentDate[0]]);
        await sFOrderDetail.assert_OrderDetail_TotalBillingItem(4);
        await sFOrderDetail.assert_OrderDetail_Billing_Billing(
            [
                true,
                false,
                false,
                false
            ],
            [
                true,
                false,
                false,
                false
            ],
            [
                billingPeriod.period_2021_2050,
                billingPeriod.period_2111_2140,
                billingPeriod.period_2081_2110,
                billingPeriod.period_2051_2080,
            ],
            [
                billingPeriod.ratio13,
                generalText.billingRatio,
                generalText.billingRatio,
                generalText.billingRatio
            ]
        );
        await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFOrderDetail.assert_OrderDetail_BillingStatus([status.billed, status.cancelled, status.cancelled, status.cancelled]);
        await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array0();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2110Dec31_Array1();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2080Dec31_Array2();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2050Dec31_Array3();
        await sFOrderDetail.assert_OrderDetail_Amount([price.minusYen333, price.Yen1000, price.Yen1000, price.Yen1000]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.cancelled]);
        await sFBilling.assert_Billing_ProductList_Tag([false], ['noTag']);
        await sFBilling.assert_Billing_ProductList_Duration([true], [['currentDate']]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate(['noDate']);
        await sFBilling.assert_Billing_Billing_TotalBillItem(3);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                true,
                false,
                false
            ],
            [
                true,
                false,
                true
            ],
            [
                billingPeriod.period_2021_2050,
                billingPeriod.period_2021_2050,
                billingPeriod.period_1991_2020
            ],
            [
                billingPeriod.ratio13,
                generalText.billingRatio,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingStatus([status.billed, status.billed, status.billed]);
        await sFBilling.assert_Billing_Billing_Amount([price.minusYen333, price.Yen1000, price.Yen666]);
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array2();
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
    })

    test('Cancel product with disable_prorating_flag = false, origin order has billed at order and upcoming billing, eff.date = billing ratio 0/y', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen1666);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.click_RemoveProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2031Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAdjustBillItem.assert_BOD_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_BillingPeriod([billingPeriod.period_2021_2050]);
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_Ratio([billingPeriod.ratio03]);
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOTWk],[FP.FP_OPTIONAL1_1SLOTWk],[FP.FP_OPTIONAL2_1SLOTWk]);
        await sFAssertBODAmount.assert_BOD_PackagePrice([price.Yen0]);
        await sFAssertBODAmount.assert_BOD_Tax10PercentAmount(price.Yen0);
        await sFAssertBODAmount.assert_BOD_Total(price.Yen0);
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([false],[billingPeriod.period_2051_2080],[generalText.billingRatio]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.minusYen1000]);
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_Discount(['--']);
        await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2031Jan01);
        await sFOrderDetail.assert_OrderDetail_TotalBillingItem(4);
        await sFOrderDetail.assert_OrderDetail_Billing_Billing(
            [
                true,
                false,
                false,
                false
            ],
            [
                true,
                false,
                false,
                false
            ],
            [
                billingPeriod.period_2021_2050,
                billingPeriod.period_2111_2140,
                billingPeriod.period_2081_2110,
                billingPeriod.period_2051_2080,
            ],
            [
                billingPeriod.ratio03,
                generalText.billingRatio,
                generalText.billingRatio,
                generalText.billingRatio
            ]
        );
        await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFOrderDetail.assert_OrderDetail_BillingStatus([status.billed, status.cancelled, status.cancelled, status.cancelled]);
        await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array0();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2110Dec31_Array1();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2080Dec31_Array2();
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2050Dec31_Array3();
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen0, price.Yen1000, price.Yen1000, price.Yen1000]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_1991Jan01_2030Dec31]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate(['noDate']);
        await sFBilling.assert_Billing_Billing_TotalBillItem(3);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                true,
                false,
                false
            ],
            [
                true,
                false,
                true
            ],
            [
                billingPeriod.period_2021_2050,
                billingPeriod.period_2021_2050,
                billingPeriod.period_1991_2020
            ],
            [
                billingPeriod.ratio03,
                generalText.billingRatio,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingStatus([status.billed, status.billed, status.billed]);
        await sFBilling.assert_Billing_Billing_Amount([price.Yen0, price.Yen1000, price.Yen666]);
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array2();
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
    })

    test('Cancel product with disable_prorating_flag = false, origin order has upcoming billing only, eff.date = billing ratio 0/y', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen666]);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.click_RemoveProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2061Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true], [billingPeriod.period_2051_2080], [billingPeriod.ratio03]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen0]);
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_StartDate([sF_DateTime.startDate_2061Jan01[0]]);
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
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen1000, price.Yen1000]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_2051Jan01_2060Dec31]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_TotalBillItem(2);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                true,
                false
            ],
            [
                true,
                true
            ],
            [
                billingPeriod.period_2051_2080,
                billingPeriod.period_2051_2080
            ],
            [
                billingPeriod.ratio03,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
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
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending]);
        await sFBilling.assert_Billing_Billing_Amount([price.Yen0, price.Yen666]);
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
        
    })

    test('Cancel product with disable_prorating_flag = false, origin order has upcoming billing only, eff.date = start date', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen666]);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.click_RemoveProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true], [billingPeriod.period_2051_2080], [billingPeriod.ratio13]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_Price([price.minusYen333]);
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
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
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen1000, price.Yen1000]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.cancelled]);
        await sFBilling.assert_Billing_ProductList_Tag([false], ['NoTag']);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_2051Jan01_2051Jan01]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate(['noDate']);
        await sFBilling.assert_Billing_Billing_TotalBillItem(2);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                true,
                false
            ],
            [
                true,
                true
            ],
            [
                billingPeriod.period_2051_2080,
                billingPeriod.period_2051_2080
            ],
            [
                billingPeriod.ratio13,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
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
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending]);
        await sFBilling.assert_Billing_Billing_Amount([price.minusYen333, price.Yen666]);
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
        
    })

    test('Cancel product with disable_prorating_flag = false, origin order has upcoming billing only, eff.date = start date of next billing', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen666]);
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.click_RemoveProduct_Array0();
        await sFCreateOrder.fill_EffectiveDate(sF_DateTime.startDate_2081Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertAdjustmentUpcomingBilling.assert_UB_AdjustmentBillItem([FP.FP1_T10]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true], [billingPeriod.period_2081_2110], [billingPeriod.ratio13]);
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_Price([price.minusYen333]);
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2080Dec31_Array0();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFOrderDetail.assert_OrderDetail_ProductList_ProductName([FP.FP1_T10]);
        await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_StartDate([sF_DateTime.startDate_2081Jan01[0]])
        await sFOrderDetail.assert_OrderDetail_TotalBillingItem(1);
        await sFOrderDetail.assert_OrderDetail_Billing_Billing([false], [false], [billingPeriod.period_2111_2140], [generalText.billingRatio]);
        await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFOrderDetail.assert_OrderDetail_BillingStatus([status.cancelled]);
        await sFOrderDetail.assert_OrderDetail_BillingDateIsIs2110Dec31_Array0();
        await sFOrderDetail.assert_OrderDetail_Amount([price.Yen1000]);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_Duration([false], [sF_DateTime.duration_2051Jan01_2080Dec31]);
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_TotalBillItem(3);
        await sFBilling.assert_Billing_Billing_Billing(
            [
                true,
                false,
                false
            ],
            [
                true,
                false,
                true
            ],
            [
                billingPeriod.period_2081_2110,
                billingPeriod.period_2081_2110,
                billingPeriod.period_2051_2080
            ],
            [
                billingPeriod.ratio13,
                generalText.billingRatio,
                billingPeriod.ratio23
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingName_AssociateCourse(
            [
                'require course only',
                'require course only',
                'require course only'
            ],
            [
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT,
                FP.FP_REQ_1SLOT
            ],
            [
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT,
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending, status.pending]);
        await sFBilling.assert_Billing_Billing_Amount([price.minusYen333, price.Yen1000, price.Yen666]);
        await sFBilling.assert_Billing_Order_OrderType([orderType.update, orderType.new]);
        
    })
})