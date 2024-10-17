import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateRM, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';

test.describe('User is allow to update the same product (https://manabie.atlassian.net/browse/LT-58908)', () => {

    test('Not able to update the same product (update schedule)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2031Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_Update_PercentageDiscount10();
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_UpdateScheduleTag_Array1();
        await sFBilling.assert_Billing_ProductList_Tag([false], ['NoTag']);
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2031Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_Update_PercentageDiscount10();
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_UpdateScheduleTag_Array1();
    })

    test('Not able to update the same product (cancel)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.click_RemoveProduct_Array0();
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2031Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_UpdateScheduleTag_Array1();
        await sFBilling.assert_Billing_ProductList_Tag([false], ['NoTag']);
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2031Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_Update_PercentageDiscount10();
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_UpdateScheduleTag_Array1();
    })

    test('Not able to update the same product (void)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        // await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        // await sFOrderDetail.clickVoid();
        // await sFOrderDetail.assert_OrderDetail_OrderStatusIsVoided();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateRM.select_RM1();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_ProductStatus([productStatus.ordered]);
        await sFBilling.assert_Billing_ProductList_ProductStatus_Cancelled_Array1();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.fill_StartDate(sF_DateTime.startDate_2031Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCreateOrder.select_Update_PercentageDiscount10();
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList_Tag([true], [generalText.updateSchedule]);
        await sFBilling.assert_Billing_ProductList_ProductStatus_Cancelled_Array1();
    })
})