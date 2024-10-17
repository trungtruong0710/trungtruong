import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateRM, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('Create recurring material order with billed at order and upcoming billing', () => {

    test('Create recurring material order with billed at order and upcoming billing without discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.click_RemoveDiscount();
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
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        // await sFOrderDetail.assert_OrderDetail_StartDateIs1991Jan01();
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_1991_2020_Ratio23IsShowed_Array1();
        // await sFOrderDetail.assert_OrderDetail_BillingStatusIsBilled_Array0();
        // await sFOrderDetail.assert_OrderDetail_BillingStatusIsBilled_Array1();
        // await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array0();
        // await sFOrderDetail.assert_OrderDetail_BillingDateIsCurrentDate_Array1();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen2000_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen666_Array1();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount(['--']);
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_Duration_1991Jan01_2140Dec31_Array0();
        await sFBilling.assert_Billing_ProductList_UpcomingBillingDate([billingDate.Dec205031]);
        await sFBilling.assert_Billing_Billing_BillingName_1991_2020_Ratio23_Array4();
        await sFBilling.assert_Billing_Billing_BillingStatus([status.pending, status.pending, status.pending]);
        await sFBilling.assert_Billing_Billing_BillingStatusIsBilled_Array3();
        await sFBilling.assert_Billing_Billing_BillingStatusIsBilled_Array4();
        await sFBilling.assert_Billing_Billing_AmountIsYen5000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen4000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen3000_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen666_Array4();
        await sFBilling.assert_Billing_Billing_BillingDateIs2110Dec31_Array0();
        await sFBilling.assert_Billing_Billing_BillingDateIs2080Dec31_Array1();
        await sFBilling.assert_Billing_Billing_BillingDateIs2050Dec31_Array2();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array3();
        await sFBilling.assert_Billing_Billing_BillingDateIsCurrentDate_Array4();
        await sFBilling.assert_Billing_Order_OrderTypeIsNew_Array0();
        await sFBilling.assert_Billing_Order_OrderStatusIsSubmitted_Array0();
    })

    test('Create recurring material order with billed at order and upcoming billing with 10% discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFAssertBODAmount.assert_BOD_Price_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_MinusYen67_Array0();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_MinusYen200_Array1();
        await sFAssertBODAmount.assert_BOD_Total(price.Yen2399);
        await sFAssertBODAmount.assert_BOD_Tax10_Yen218_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2700_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_10Percent_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10]);
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen1800_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen599_Array1();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Discount([discount.Percent10]);
        await sFBilling.assert_Billing_Billing_AmountIsYen4500_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen3600_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen2700_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen1800_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen599_Array4();
        
    })

    test('Create recurring material order with billed at order and upcoming billing with fixed amount discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_FixedAmountDiscount100_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100_MinusYen67_Array0();
        await sFAssertBODAmount.assert_BOD_DiscountFixedAmount100_MinusYen100_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen2499();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen227_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen2900_Array0();
        await sFAssertUpcomingBilling.assert_UB_Discount_FixedAmount100_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.fixedAmount100]);
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_DiscountFixedAmount100_Array0();
    })

    test('Create recurring material order with billed at order and upcoming billing recurring with valid duration of discount = 1', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_10Percent_RVD1_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen666_Array0();
        await sFAssertBODAmount.assert_BOD_Price_Yen2000_Array1();
        await sFAssertBODAmount.assert_BOD_Discount10Percent_RVD1_MinusYen67_Array0();
        await sFAssertBODAmount.assert_BOD_DiscountIsNotVisible_Array1();
        await sFAssertBODAmount.assert_BOD_Total_Yen2599();
        await sFAssertBODAmount.assert_BOD_Tax10_Yen236_Array0();
        await sFAssertUpcomingBilling.assert_UB_Price_Yen3000_Array0();
        await sFAssertUpcomingBilling.assert_UB_DiscountIsNotVisible_Array0();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_Discount([discount.Percent10_RVD1]);
        // await sFOrderDetail.assert_OrderDetail_TotalBillingItem(2);
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen2000_Array0();
        // await sFOrderDetail.assert_OrderDetail_AmountIsYen666_Array1();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductDetail_10PercentDiscount_RVD1_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen5000_Array0();
        await sFBilling.assert_Billing_Billing_AmountIsYen4000_Array1();
        await sFBilling.assert_Billing_Billing_AmountIsYen3000_Array2();
        await sFBilling.assert_Billing_Billing_AmountIsYen2000_Array3();
        await sFBilling.assert_Billing_Billing_AmountIsYen666_Array4();
        
    })
})