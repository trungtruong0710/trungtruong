import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateRM, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('Create draft recurring material order with disable_prorating_flag = false (upcoming billing only)', () => {

    test('Create recurring material without discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_BillItem_RM1_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItemPackage_BillingPeriodAndRatio([true],[billingPeriod.period_2051_2080],[billingPeriod.ratio23]);
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen2000]);
        await sFAssertUpcomingBilling.assert_UB_DiscountIsNotVisible_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
    })

    test('Create recurring material with percentage discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen1800]);
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
        
    })

    test('Create recurring material order with upcoming billing only and apply fixed amount discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen1933_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_FixedAmount100_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
    })

    test('Create recurring material order with upcoming billing only and apply recurring valid duration of discount = 1', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen1800]);
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_RVD1_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
        
    })
})