import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateFP, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail, sFBilling, sFCommonStep, sFAssertBODAdjustBillItem, sFAssertBODAdjustAmount, sFAssertAdjustmentUpcomingBilling } from '../../../../sf-page/test-hook';

test.describe('Cannot order duplicate course', () => {

    test('Cannot create two frequency package orders with the same start date', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assert_Error_DuplicateCourse();
    })

    test('Cannot create two frequency package orders with the same start date, cancel the first order already', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.click_RemoveProduct_Array0();
        await sFCreateOrder.fill_StartDate(sFCommonStep.currentDate[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_StartDate(sFCommonStep.currentDate[0]);
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assert_Error_OverlapTimeRangeOfCourse();
    })

    test('Cannot create two frequency package orders with the different start date', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assert_Error_OverlapTimeRangeOfCourse();

    })

    test('Cannot create two frequency package orders with the different start date, cancel the first order already', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.click_UpdateProduct_Array0();
        await sFCreateOrder.click_RemoveProduct_Array0();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assert_OrderDetail_OrderStatus(status.submitted);
        await sFOrderDetail.assert_OrderDetail_OrderType(orderType.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateFP.select_FP1();
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_2051Jan01[0]);
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assert_Error_OverlapTimeRangeOfCourse();

    })
})