import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import billingPeriod from '../../../utils/billing-period';
import discount from '../../../utils/discount';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import productStatus from '../../../utils/product-status';
import status from '../../../utils/status';

test.describe('Void recurring product order incase invoice order successfully and payment status is sucessful (disable_prorating_flag = false)', () => {

    test('Void order with payment status = Successful (Cash)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO04:1 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'recurring',
                    product: FP.FP7_T10,
                    startDate: sFCommonStep.date28DaysBefore[0],
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1800, 
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen900]
            }
        );
        await sFCommonStep.click('Submit');
        const orderDetailUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.createInvoice(
            {
                isDraftOnly: false,
                paymentInfo: {
                    paymentMethod: 'Cash',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: true,
                paymentDate: sFCommonStep.nextDate[0]
            }
        );
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.new
            },
            [
                {
                    productName: FP.FP7_T10,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    discountLabel: discount.Percent10,
                    startDate: ['--']
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            6,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2141_2180,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2101_2140,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.invoiced,
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
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
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
        await sFBilling.assert_Billing_Billing_TotalBillItem(4);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                }
            ]
        );
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.new,
                    orderStatus: status.voided
                }
            ]
        );

    })

    test('Void order with payment status = Successful (Bank Transfer)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO04:2 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'recurring',
                    product: FP.FP7_T10,
                    startDate: sFCommonStep.date28DaysBefore[0],
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1800, 
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen900]
            }
        );
        await sFCommonStep.click('Submit');
        const orderDetailUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.createInvoice(
            {
                isDraftOnly: false,
                paymentInfo: {
                    paymentMethod: 'Bank Transfer',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: true,
                paymentDate: sFCommonStep.nextDate[0]
            }
        );
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.new
            },
            [
                {
                    productName: FP.FP7_T10,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    discountLabel: discount.Percent10,
                    startDate: ['--']
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            6,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2141_2180,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2101_2140,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.invoiced,
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
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
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
        await sFBilling.assert_Billing_Billing_TotalBillItem(4);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                }
            ]
        );
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