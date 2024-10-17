import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import discount from '../../../utils/discount';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import OTM from '../../../utils/product-one-time-material';
import productStatus from '../../../utils/product-status';
import status from '../../../utils/status';
import sF_DateTime from '../../../sf-date-time';

test.describe('Void new order', () => {

    test('Brand Staff', async ({ page }) => {

        await login.signIn(environment.brandStaffCredentials.username, environment.brandStaffCredentials.password);
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-OMAC08:2 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createNotPackageOrder(
            {
                location: environment.location, 
                isRecurringProduct: false,
                startDate: null, 
                product: OTM.OTM1_T10,
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.new
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
            1,
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                }
            ]
        );
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
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(0);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.new,
                    orderStatus: status.voided
                }
            ]
        );

    })

    test('Center Staff', async ({ page }) => {

        await login.signIn(environment.centerStaffCredentials.username, environment.centerStaffCredentials.password);
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-OMAC08:3 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createNotPackageOrder(
            {
                location: environment.location, 
                isRecurringProduct: false,
                startDate: null, 
                product: OTM.OTM1_T10,
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.new
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
            1,
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                }
            ]
        );
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
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(0);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.new,
                    orderStatus: status.voided
                }
            ]
        );

    })

    test('Center Manager', async ({ page }) => {

        await login.signIn(environment.centerManagerCredentials.username, environment.centerManagerCredentials.password);
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-OMAC08:4 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createNotPackageOrder(
            {
                location: environment.location, 
                isRecurringProduct: false,
                startDate: null, 
                product: OTM.OTM1_T10,
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.new
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
            1,
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                }
            ]
        );
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
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(0);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.new,
                    orderStatus: status.voided
                }
            ]
        );

    })
})