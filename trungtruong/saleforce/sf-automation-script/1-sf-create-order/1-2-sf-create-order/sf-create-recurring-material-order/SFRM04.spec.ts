import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateRM, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('Create recurring material with disable_prorating_flag = TRUE order with upcoming billing only', () => {

    test('Create recurring material with disable_prorating_flag = TRUE order with upcoming billing only and not apply discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM2_T5_TFLAG();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([false],[billingPeriod.period_2051_2080],[generalText.billingRatio]);
        await sFAssertUpcomingBilling.assert_UB_Price_Yen3000_Array0();
        await sFAssertUpcomingBilling.assert_UB_DiscountIsNotVisible_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount(['--']);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        // await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_Billing_AmountIsYen5000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen4000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen3000_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_2051_2080_WithoutRatio_Array2();
        
    })

    test('Create recurring material with disable_prorating_flag = TRUE order with upcoming billing only and apply percentage discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM2_T5_TFLAG();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_BillItem_WithoutRatio_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2700_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10]);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        // await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_Billing_AmountIsYen4500_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen3600_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen1800_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_2051_2080_Ratio23_Array2();
        
    })

    test('Create recurring material with disable_prorating_flag = TRUE order with upcoming billing only and apply fixed amount discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM2_T5_TFLAG();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2900_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_FixedAmount100_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        // await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_DiscountFixedAmount100_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen4900_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen3900_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen2900_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_WithoutRatio_Array2();
        
    })

    test('Create recurring material with disable_prorating_flag = TRUE order with upcoming billing only and apply recurring valid duration of discount = 1', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM2_T5_TFLAG();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2700_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_RVD1_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10_RVD1]);
        // await sFOrderDetail.assert_OrderDetail_BillingItemIsNull();
        // await sFOrderDetail.assert_OrderDetail_StartDate(sF_DateTime.startDate_2051Jan01);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_10PercentDiscount_RVD1_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen5000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen4000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen2700_Array2();
        await sFBilling.assert_Billing_Billing_BillingName_WithoutRatio_Array2();
        
    })
})