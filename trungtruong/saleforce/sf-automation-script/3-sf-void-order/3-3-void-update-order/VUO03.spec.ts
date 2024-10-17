import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import discount from '../../../utils/discount';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import FP from '../../../utils/product-frequency-package';
import productStatus from '../../../utils/product-status';
import status from '../../../utils/status';

test.describe('Void update frequency package order', () => {

    test('Void update frequency package order', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VUO03:1 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createNotPackageOrder(
            {
                location: environment.location, 
                isRecurringProduct: true,
                startDate: sF_DateTime.startDate_1991Jan01[0], 
                product: FP.FP1_T10,
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Submit');
        const newOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        // Access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'update',
                isRemoveDiscount: true,
                discount: null,
                effectiveDate: sFCommonStep.nextDate[0],
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Next')
        await sFCommonStep.click('Submit')
        const updateOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFCommonStep.accessToUrl(updateOrderUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.update
            },
            null
        );
        await sFCommonStep.accessToUrl(newOrderUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFCommonStep.accessToUrl(newOrderUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.new
            },
            null
        );
        // Access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: false,
                    tagType: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true,
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false,
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false,
                        }
                    ],
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
                    orderStatus: status.voided,
                    orderType: orderType.update
                },{
                    orderStatus: status.voided,
                    orderType: orderType.new
                }
            ]
        )
    })

    test('Void update cancel frequency package order', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VUO03:2 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createNotPackageOrder(
            {
                location: environment.location, 
                isRecurringProduct: true,
                startDate: sF_DateTime.startDate_1991Jan01[0], 
                product: FP.FP1_T10,
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Submit');
        const newOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        // Access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'cancel',
                isRemoveDiscount: null,
                discount: null,
                effectiveDate: sFCommonStep.currentDate[0],
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Next')
        await sFCommonStep.click('Submit')
        const updateOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFCommonStep.accessToUrl(updateOrderUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.update
            },
            null
        );
        await sFCommonStep.accessToUrl(newOrderUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFCommonStep.accessToUrl(newOrderUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.new
            },
            null
        );
        // Access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: false,
                    tagType: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true,
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false,
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false,
                        }
                    ],
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
                    orderStatus: status.voided,
                    orderType: orderType.update
                },{
                    orderStatus: status.voided,
                    orderType: orderType.new
                }
            ]
        )
    })
})