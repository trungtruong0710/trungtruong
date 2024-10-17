import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFCreateOTM, sFAssertBODAmount, sFAssertBODAdjustAmount, sFAssertBODAdjustBillItem, sFOrderDetail, sFBilling, sFCommonStep, sFAssertUpcomingBilling, sFAssertAdjustmentUpcomingBilling } from '../../../sf-page/test-hook';
import discount from '../../../utils/discount';
import environment from '../../../utils/environment';
import generalText from '../../../utils/general-text';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import OTM from '../../../utils/product-one-time-material';
import productStatus from '../../../utils/product-status';
import status from '../../../utils/status';

test.describe('Cancel one-time material product', () => {

    test('Cancel one-time material product successfully, with custom_billing_date = null', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFUOTM04:1 ', environment.grade);
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
                    updateType: 'cancel',
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
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(0);
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

    test('Cancel one-time material product successfully, with custom_billing_date = future date', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('SFUOTM04:1 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'one-time',
                    product: OTM.OTM3_CBD2030Jan01,
                    startDate: null,
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: null,
                isShowBilledAtOrder: false,
                totalPrice: [], 
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen900]
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
                    updateType: 'cancel',
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
                    productName: OTM.OTM3_CBD2030Jan01,
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
                    isRatio: null,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_01Jan2030,
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
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(0);
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