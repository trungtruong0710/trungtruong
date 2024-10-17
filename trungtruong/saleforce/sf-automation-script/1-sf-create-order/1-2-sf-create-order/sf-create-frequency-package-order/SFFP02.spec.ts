import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateFP, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('Create frequency package with disable_prorating flag = flase (generate upcoming billing only)', () => {

    test('Create frequency package order with required course only and without discount', async ({ page }) => {

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
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_FP1_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true],[billingPeriod.period_2051_2080],[billingPeriod.ratio23]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen666]);
        await sFAssertUpcomingBilling.assert_UB_DiscountIsNotVisible_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_1SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk])
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount(['--']);
        // await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'],[FP.FP_REQ_1SLOT],[FP.FP_OPTIONAL1_1SLOT],[FP.FP_OPTIONAL2_1SLOT]);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        // await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_Billing_Amount([price.Yen1000, price.Yen1000]);
        await sFBilling.assert_Billing_Billing_AmountIsYen666_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_2051_2080_Ratio23_Array2();
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
        
    })

    test('Create frequency package order with required course only and percentage discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen599]);
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10]);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        // await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen599_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_2051_2080_Ratio23_Array2();
        
    })

    test('Create frequency package order with required and optional course and fixed amount discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen599]);
        await sFAssertUpcomingBilling.assert_UB_Discount_FixedAmount100_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        // await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_DiscountFixedAmount100_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen599_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_2051_2080_Ratio23_Array2();
        
    })

    test('Create frequency package with required and optional course and discount recurring valid duration = 1', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.select_Optional1Course();
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen1199]);
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_RVD1_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10_RVD1]);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        // await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_10PercentDiscount_RVD1_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen1199_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_2051_2080_Ratio23_Array2();
        
    })

    test('Create frequency package with 2 slots for require course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_2Slots_REQCourse();
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen1199]);
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_RVD1_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_AssociateCourse(['require course only'], [FP.FP_REQ_2SLOTWk], [FP.FP_OPTIONAL1_1SLOTWk], [FP.FP_OPTIONAL2_1SLOTWk]);
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10_RVD1]);
        // await sFOrderDetail.assert_OrderDetail_ProductList_AssociateCourse(['require course only'], [FP.FP_REQ_2SLOT], [FP.FP_OPTIONAL1_1SLOT], [FP.FP_OPTIONAL2_1SLOT]);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_10PercentDiscount_RVD1_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen1199_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_2051_2080_Ratio23_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_FPREQCourse_2SlotOnly_Array012();
        
    })
})