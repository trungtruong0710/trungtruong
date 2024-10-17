import { test, login, sFContactDetail, sFCreateNewStudent, sFCreateCustomBilling, sFOrderDetail, sFCommonStep, sFCreateEnrollment, sFCreateOrder, sFBilling } from '../../../sf-page/test-hook';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import status from '../../../utils/status';

test.describe('Create custom billings', () => {

    test('Brand Staff', async ({ page }) => {
        await login.signIn(environment.brandStaffCredentials.username, environment.brandStaffCredentials.password);
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-OMAC05:2 ', environment.grade)
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

    test('Center Staff', async ({ page }) => {
        await login.signIn(environment.centerStaffCredentials.username, environment.centerStaffCredentials.password);
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-OMAC05:2 ', environment.grade)
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

    test('Center Manager', async ({ page }) => {
        await login.signIn(environment.centerManagerCredentials.username, environment.centerManagerCredentials.password);
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-OMAC05:2 ', environment.grade)
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