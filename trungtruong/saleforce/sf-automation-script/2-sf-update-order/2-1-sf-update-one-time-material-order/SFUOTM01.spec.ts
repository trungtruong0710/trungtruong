import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateOTM, sFAssertBODAmount, sFAssertBODAdjustAmount, sFAssertBODAdjustBillItem, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import discount from '../../../utils/discount';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import OTM from '../../../utils/product-one-time-material';
import productStatus from '../../../utils/product-status';
import status from '../../../utils/status';

test.describe('Update discount for one-time material product with custom_billing_date = null ', () => {

    test('Update discount in case not select discount before', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFUOTM01:1 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'one-time',
                    product: OTM.OTM1_T10,
                    startDate: null,
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: {
                    isRemoveDiscount: true,
                    discountName: null,
                },
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1000, 
                isShowUpcomingBilling: false,
                upcomingBillingPrice: []
            }
        );
        await sFCommonStep.click('Submit');
        // access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProduct(
            {
                productElement: 0,
                updateOptions: {
                    updateType: 'update',
                    isRemoveDiscount: null,
                    discount: discount.Percent10,
                    effectiveDate: null,
                    updatePackage: null,
                    numberOfSlot: null
                }
            }
        );
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            [
                {
                    productName: OTM.OTM1_T10,
                    associateCourses: null,
                    discountLabel: discount.Percent10,
                    startDate: null
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            2,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                }
            ]
        );
        // access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: false,
                    tagType: null,
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(1);
        await sFBilling.assert_Billing_BillItem(
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
                    billingAmount: price.Yen900
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.update,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.new,
                    orderStatus: status.submitted
                }
            ]
        );

    })

    test('Update discount in case select different amount discount before', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFUOTM01:2 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'one-time',
                    product: OTM.OTM1_T10,
                    startDate: null,
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen900, 
                isShowUpcomingBilling: false,
                upcomingBillingPrice: []
            }
        );
        await sFCommonStep.click('Submit');
        // access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProduct(
            {
                productElement: 0,
                updateOptions: {
                    updateType: 'update',
                    isRemoveDiscount: null,
                    discount: discount.fixedAmount100,
                    effectiveDate: null,
                    updatePackage: null,
                    numberOfSlot: null
                }
            }
        );
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            [
                {
                    productName: OTM.OTM1_T10,
                    associateCourses: null,
                    discountLabel: discount.fixedAmount100,
                    startDate: null
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            2,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                }
            ]
        );
        // access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: false,
                    tagType: null,
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.fixedAmount100,
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(1);
        await sFBilling.assert_Billing_BillItem(
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
                    billingAmount: price.Yen900
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.update,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.new,
                    orderStatus: status.submitted
                }
            ]
        );

    })

    test('Update discount has the same value with previous discount', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFUOTM01:3 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'one-time',
                    product: OTM.OTM1_T10,
                    startDate: null,
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen900, 
                isShowUpcomingBilling: false,
                upcomingBillingPrice: []
            }
        );
        await sFCommonStep.click('Submit');
        // access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProduct(
            {
                productElement: 0,
                updateOptions: {
                    updateType: 'update',
                    isRemoveDiscount: null,
                    discount: discount.Percent10_RVD1,
                    effectiveDate: null,
                    updatePackage: null,
                    numberOfSlot: null
                }
            }
        );
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            [
                {
                    productName: OTM.OTM1_T10,
                    associateCourses: null,
                    discountLabel: discount.Percent10_RVD1,
                    startDate: null
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            2,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                }
            ]
        );
        // access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: false,
                    tagType: null,
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.Percent10_RVD1,
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(1);
        await sFBilling.assert_Billing_BillItem(
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
                    billingAmount: price.Yen900
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.update,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.new,
                    orderStatus: status.submitted
                }
            ]
        );

    })

    test('Remove discount product', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFUOTM01:4 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'one-time',
                    product: OTM.OTM1_T10,
                    startDate: null,
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen900, 
                isShowUpcomingBilling: false,
                upcomingBillingPrice: []
            }
        );
        await sFCommonStep.click('Submit');
        // access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProduct(
            {
                productElement: 0,
                updateOptions: {
                    updateType: 'update',
                    isRemoveDiscount: true,
                    discount: null,
                    effectiveDate: null,
                    updatePackage: null,
                    numberOfSlot: null
                }
            }
        );
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            [
                {
                    productName: OTM.OTM1_T10,
                    associateCourses: null,
                    discountLabel: null,
                    startDate: null
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            2,
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
                },{
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                }
            ]
        );
        // access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: false,
                    tagType: null,
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: '--',
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(1);
        await sFBilling.assert_Billing_BillItem(
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
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.update,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.new,
                    orderStatus: status.submitted
                }
            ]
        );

    })
})