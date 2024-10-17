import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateRM, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('Create draft recurring material order with disable_prorating_flag = false (billed at order and upcoming billing)', () => {

    test('Create recurring material without discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM2_T5_TFLAG();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFAssertBODBillItem.assert_BOD_BillItem_RM2_T5_TFLAG_Array0();
        await sFAssertBODBillItem.assert_BOD_BillItem_WithoutRatio_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen1000_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen3000();
        await sFAssertBODAmount.assert_BOD_Tax5_Yen143_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen3000_Array0();
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
        await sFCreateRM.select_RM2_T5_TFLAG();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFAssertBODAmount.assert_BOD_Price_Yen1000_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_MinusYen100_Array0();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_MinusYen200_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen2700();
        await sFAssertBODAmount.assert_BOD_Tax5_Yen129_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2700_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_Array0();
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
        await sFCreateRM.select_RM2_T5_TFLAG();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCommonStep.click_SubmitDraftEnrollment();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsDraft();
        await sFAssertBODAmount.assert_BOD_Price_Yen1000_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100_MinusYen100_Array0();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100_MinusYen100_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen2800();
        await sFAssertBODAmount.assert_BOD_Tax5_Yen133_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2900_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_FixedAmount100_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductItemIsNotVisible();
        await sFBilling.assert_Billing_Billing_BillingItemIsNotVisible();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsDraft_Array0();
    })

    test('Create recurring material with disable_prorating_flag = TRUE order with billed at order and upcoming billing recurring with valid duration of discount = 1', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM2_T5_TFLAG();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen1000_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_RVD1_MinusYen100_Array0();
        await sFAssertBODAmount.assert_BOD_DiscountIsNotVisible_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen2900();
        await sFAssertBODAmount.assert_BOD_Tax5_Yen138_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen3000_Array0();
        await sFAssertUpcomingBilling.assert_UB_DiscountIsNotVisible_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10_RVD1]);
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_BillingItemWithoutRatio_Array1();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen2000_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen900_Array1();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_10PercentDiscount_RVD1_Array0();
        await sFBilling.assert_Billing_Billing_BillingName_WithoutRatio_Array4();
        await sFBilling.assert_Billing_Billing_AmountIsYen5000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen4000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen3000_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array4();
        
    })
})