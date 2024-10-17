import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateFP, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('Create frequency package with disable_prorating flag = FALSE (generate billed at order and upcoming billing)', () => {

    test('Create frequency package order with required course only and without discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_FP1_T10_Array0();
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_1991_2020_Ratio23_Array0();
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_FP1_T10_Array1();
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_2021_2050_Array1();
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_FPREQCourse_1SlotWkOnly_Array01();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen1000_Array1();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen1666);
        await sFAssertBODAmount.assert_BOD_Tax10_Yen151_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_FP1_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([false],[billingPeriod.period_2051_2080],[generalText.billingRatio]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen1000]);
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        // await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        // await sFOrderDetail.assert_OrderDetail_StartDateIs1991Jan01();
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_1991_2020_Ratio23IsShowed_Array1();
        // await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
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
        // await sFOrderDetail.assert_OrderDetail_BillingStatusIsBilled_Array0();
        // await sFOrderDetail.assert_OrderDetail_BillingStatusIsBilled_Array1();
        // await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array0();
        // await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array1();
        // await sFOrderDetail.assert_OrderDetail_Amount([price.Yen1000]);
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen666_Array1();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Duration_1991Jan01_2140Dec31_Array0();
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_BillingName_1991_2020_Ratio23_Array4();
        await sFBilling.assert_Billing_Billing_BillingName_FPREQCourse_1SlotOnly_Array01234();
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending, status.pending]);
        await sFBilling.assert_Billing_Billing_BillingStatusIsBilled_Array3();
        await sFBilling.assert_Billing_Billing_BillingStatusIsBilled_Array4();
        await sFBilling.assert_Billing_Billing_Amount([price.Yen1000, price.Yen1000]);
        await sFBilling.assert_Billing_Billing_AmountIsYen1000_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen1000_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen666_Array4();
        await sFBilling.assert_Billing_Billing_BillingDateIs2110Dec31_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIs2080Dec31_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array2();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array3();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array4();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsSubmitted_Array0();
    })

    test('Create frequency package order with required course only and percentage discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen1000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10PercentPackage_MinusYen67_Array0();
        await sFAssertBODAmount.assert_BOD_Discount10PercentPackage_MinusYen100_Array1();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen1499);
        await sFAssertBODAmount.assert_BOD_Tax10_Yen136_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen900]);
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10]);
        // await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen900_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen599_Array1();
        // await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
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
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen599_Array4();
        
    })

    test('Create frequency package order with required and optional course and fixed amount discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.select_Optional1Course();
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen1333_Array0();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen2000_Array1();
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_FPREQCourse_FPOptional1_1SlotWk_Array01();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100Package_MinusYen67_Array0();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100Package_MinusYen100_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen3166();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen288_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require & optional1 courses'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk]);
        await sFAssertUpcomingBilling.assert_UB_Price_Yen1900_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_FixedAmount100_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen1900_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen1266_Array1();
        // await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
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
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_DiscountFixedAmount100_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen1900_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen1900_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen1900_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen1900_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen1266_Array4();
        await sFBilling.assert_Billing_Billing_BillingName_FPREQCourse_FPOptional1_1SlotWk_Array01234();
    })

    test('Create frequency package with required and optional course and discount recurring valid duration = 1', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.select_Optional1Course();
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_FPREQCourse_FPOptional1_1SlotWk_Array01();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen1333_Array0();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10PercentPackage_RVD1_MinusYen134_Array0();
        await sFAssertBODAmount.assert_BOD_PackageDiscountIsNotVisible_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen3199();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen291_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen2000]);
        await sFAssertUpcomingBilling.assert_UB_DiscountIsNotVisible_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require & optional1 courses'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk]);
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount(['--']);
        // await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
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
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen2000_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen1200_Array1();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen1200_Array4();
        await sFBilling.assert_Billing_Billing_BillingName_FPREQCourse_FPOptional1_1SlotWk_Array01234();
        
    })

    test('Create frequency package with 2 slots for require course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_2Slots_REQCourse();
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFAssertBODBillItem.assert_BOD_BillItemPackage_FPREQCourse_2SlotWkOnly_Array01();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen1333_Array0();
        await sFAssertBODAmount.assert_BOD_PricePackage_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10PercentPackage_RVD1_MinusYen134_Array0();
        await sFAssertBODAmount.assert_BOD_PackageDiscountIsNotVisible_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen3199();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen291_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen2000]);
        await sFAssertUpcomingBilling.assert_UB_DiscountIsNotVisible_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_2SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk]);
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount(['--']);
        // await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_2SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        // await sFOrderDetail.assert_OrderDetail_Billing_AssociateCourse(
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
                FP.FP_OPTIONAL1_1SLOT
            ],
            [
                FP.FP_OPTIONAL2_1SLOT,
                FP.FP_OPTIONAL2_1SLOT
            ]
        );
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen2000_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen1200_Array1();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen1200_Array4();
        await sFBilling.assert_Billing_Billing_BillingName_FPREQCourse_2SlotOnly_Array01234();
        
    })
})