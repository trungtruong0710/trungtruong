import { test, login, sFContactDetail, sFCreateNewStudent, sFCreateCustomBilling, sFOrderDetail, sFCommonStep, sFCreateEnrollment, sFCreateOrder, sFBilling } from '../../../sf-page/test-hook';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import status from '../../../utils/status';

test.describe('Create custom billing order', () => {

    test('Create custom billing order with price = 1000', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFCB01:1 ', environment.grade)
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateCustomBilling.createCustomBilling(
            environment.location,
            [
                {
                    description: 'Positive Product',
                    tax: null,
                    price: '1000'
                }
            ]
        )
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assertCreateCustomBillingOrderSuccess();
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.customBilling
            },
            null
        );
        await sFOrderDetail.assertOrderDetailBilling(
            1,
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_Billing_TotalBillItem(1);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(1);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.customBilling,
                    orderStatus: status.submitted
                }
            ]
        );
    })

    test('Create custom billing order with price = 0', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFCB01:2 ', environment.grade)
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateCustomBilling.createCustomBilling(
            environment.location,
            [
                {
                    description: 'Zero Product',
                    tax: null,
                    price: '0'
                }
            ]
        )
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assertCreateCustomBillingOrderSuccess();
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.customBilling
            },
            null
        );
        await sFOrderDetail.assertOrderDetailBilling(
            1,
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen0
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_Billing_TotalBillItem(1);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen0
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(1);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.customBilling,
                    orderStatus: status.submitted
                }
            ]
        );
    })

    test('Create custom billing order with negative price', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFCB01:3 ', environment.grade)
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateCustomBilling();
        await sFCreateCustomBilling.createCustomBilling(
            environment.location,
            [
                {
                    description: 'Negative Product',
                    tax: null,
                    price: '-1000'
                }
            ]
        )
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assertCreateCustomBillingOrderSuccess();
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.customBilling
            },
            null
        );
        await sFOrderDetail.assertOrderDetailBilling(
            1,
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen1000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_Billing_TotalBillItem(1);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen1000
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(1);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.customBilling,
                    orderStatus: status.submitted
                }
            ]
        );
    })

    test('Create custom billing order with price = text', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFCB01:3 ', environment.grade)
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateCustomBilling();
        await sFCreateCustomBilling.createCustomBilling(
            environment.location,
            [
                {
                    description: 'Text Product',
                    tax: null,
                    price: 'abc'
                }
            ]
        )
        await sFCommonStep.click('Submit');
        await sFCommonStep.assert_Err_EnterAValiddValue()
    })

    test('Create custom billing order with multiple product', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFCB01:4 ', environment.grade)
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateCustomBilling();
        await sFCreateCustomBilling.createCustomBilling(
            environment.location,
            [
                {
                    description: 'Positive Product',
                    tax: null,
                    price: '1000'
                },{
                    description: 'Zero Product',
                    tax: null,
                    price: '0'
                },{
                    description: 'Negative Product',
                    tax: null,
                    price: '-1000'
                }
            ]
        )
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assertCreateCustomBillingOrderSuccess();
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.customBilling
            },
            null
        );
        await sFOrderDetail.assertOrderDetailBilling(
            3,
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen1000
                },{
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen0
                },{
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_Billing_TotalBillItem(3);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen1000
                },{
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen0
                },{
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(1);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.customBilling,
                    orderStatus: status.submitted
                }
            ]
        );
    })
})