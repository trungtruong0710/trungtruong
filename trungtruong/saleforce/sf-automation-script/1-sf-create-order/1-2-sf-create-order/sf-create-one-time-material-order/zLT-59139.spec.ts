import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateOTM, sFAssertBODAmount, sFAssertBODAdjustAmount, sFAssertBODAdjustBillItem, sFOrderDetail, sFBilling, sFCommonStep } from '../../../../sf-page/test-hook';

test.describe('User is not able to submit order with product "not define price"', () => {

    test('User is not able to submit order with product "not define price"', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.create_PotentialStudent(generalText.update);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateOrder();
        await sFCreateOrder.select_Location();
        await sFCreateOTM.select_OTM4_PriceNotDefine();
        await sFCreateOrder.fill_Comment();
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assert_Error_PriceNotDefine();
    })
})