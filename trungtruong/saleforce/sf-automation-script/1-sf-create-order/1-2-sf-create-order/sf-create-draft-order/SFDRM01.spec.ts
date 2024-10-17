import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateRM, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('Create draft recurring material order with disable_prorating_flag = false (billed at order and upcoming billing)', () => {

    test('Create recurring material without discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFAssertBODBillItem.assert_BOD_BillItem_RM1_T10_Array0();
        await sFAssertBODBillItem.assert_BOD_BillItem_1991_2020_Ratio23_Array0();
        await sFAssertBODBillItem.assert_BOD_BillItem_RM1_T10_Array1();
        await sFAssertBODBillItem.assert_BOD_BillItem_2021_2050_Array1();
        await sFAssertBODAmount.assert_BOD_Price_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen2666();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen242_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItem_RM1_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillItem_2051_2080_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen3000_Array0();
        await sFAssertUpcomingBilling.assert_UB_BillingDate_2050Dec31_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
    })

    test('Create draft recurring material order with billed at order and upcoming billing with 10% discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFAssertBODAmount.assert_BOD_Price_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_MinusYen67_Array0();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_MinusYen200_Array1();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen2399);
        await sFAssertBODAmount.assert_BOD_Tax10_Yen218_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2700_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
        
    })

    test('Create draft recurring material order with billed at order and upcoming billing with fixed amount discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFAssertBODAmount.assert_BOD_Price_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100_MinusYen67_Array0();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100_MinusYen100_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen2499();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen227_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2900_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_FixedAmount100_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
    })

    test('Create draft recurring material order with billed at order and upcoming billing recurring with valid duration of discount = 1', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFAssertBODAmount.assert_BOD_Price_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_RVD1_MinusYen67_Array0();
        await sFAssertBODAmount.assert_BOD_DiscountIsNotVisible_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen2599();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen236_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen3000_Array0();
        await sFAssertUpcomingBilling.assert_UB_DiscountIsNotVisible_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
        
    })
})