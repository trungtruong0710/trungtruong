import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateOTF, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('Create one-time fee order', () => {

    test('Create one-time fee order without discount', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateOTF.select_OTF1();
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        // await sFOrderDetail.assert_OrderDetail_BillingStatusIsBilled_Array0();
        // await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array0();
        // await sFOrderDetail.assert_OrderDetail_Amount([price.Yen1000]);
    })

    test('Create one-time fee order with 10% discount', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateOTF.select_OTF1();
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.assert_BillingDate_Array0_IsCurrentDate();
        await sFAssertBODBillItem.assert_BOD_BillItem_OTF1_T10_Array0();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_MinusYen100_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen1000_Array0();
        await sFAssertBODAmount.assert_BOD_Total_Yen900();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen82_Array0();
        await sFAssertUpcomingBilling.assert_UB_NoInformation();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10]);
        // await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        // await sFOrderDetail.assert_OrderDetail_BillingStatusIsBilled_Array0();
        // await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen900_Array0();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_DurationIsNull_Array0();
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate(['noDate']);
        await sFBilling.assert_Billing_Billing_BillingStatusIsBilled_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen900_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array0();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsSubmitted_Array0();
    })

    test('Create one-time fee order with fixed amount discount', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateOTF.select_OTF1();
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFCreateOrder.assert_BillingDate_Array0_IsCurrentDate();
        await sFAssertBODBillItem.assert_BOD_BillItem_OTF1_T10_Array0();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100_MinusYen100_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen1000_Array0();
        await sFAssertBODAmount.assert_BOD_Total_Yen900();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen82_Array0();
        await sFAssertUpcomingBilling.assert_UB_NoInformation();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        // await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        // await sFOrderDetail.assert_OrderDetail_BillingStatusIsBilled_Array0();
        // await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen900_Array0();
    })
})