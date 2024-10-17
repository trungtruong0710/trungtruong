import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import billingPeriod from '../../../utils/billing-period';
import discount from '../../../utils/discount';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import OTM from '../../../utils/product-one-time-material';
import RM from '../../../utils/product-recurring-material';
import productStatus from '../../../utils/product-status';
import status from '../../../utils/status';

test.describe('Void order with multiple product when start date all product within 28 days', () => {

    test('Order with recurring product and one-time material product with custom billing date = null (payment status = successful)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO12:1 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createMultipleProductsOrder(
            {
                numberOfProduct: 2,
                location: environment.location,
                listProductInfor:
                    [
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: FP.FP7_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                        {
                            productInfo: {
                                productType: 'one-time',
                                product: OTM.OTM1_T10,
                                startDate: null,
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                    ],
                isShowBilledAtOrder: true,
                totalPrice: price.Yen2700, 
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
                    paymentMethod: 'Cash- 現金',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: true,
                paymentDate: null
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
                    productName: OTM.OTM1_T10,
                    associateCourses: null,
                    discountLabel: discount.Percent10,
                    startDate: ['--']
                },{
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
            8,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
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
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
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
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                },{
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
        await sFBilling.assert_Billing_Billing_TotalBillItem(6);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
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
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
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
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.new,
                    orderStatus: status.voided
                }
            ]
        );

    })
    
    test('Order with recurring product and one-time material product with custom billing date = future date (payment status = successful)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO12:2 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createMultipleProductsOrder(
            {
                numberOfProduct: 2,
                location: environment.location,
                listProductInfor:
                    [
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: FP.FP7_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                        {
                            productInfo: {
                                productType: 'one-time',
                                product: OTM.OTM3_CBD2030Jan01,
                                startDate: null,
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                    ],
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
                    paymentMethod: 'Cash- 現金',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: true,
                paymentDate: null
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
                    productName: OTM.OTM3_CBD2030Jan01,
                    associateCourses: null,
                    discountLabel: discount.Percent10,
                    startDate: ['--']
                },{
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
            7,
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
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_01Jan2030,
                    billingAmount: price.Yen900
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
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                },{
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

    test('Order with 2 recurring products (payment status = successful)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO12:3 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createMultipleProductsOrder(
            {
                numberOfProduct: 2,
                location: environment.location,
                listProductInfor:
                    [
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: FP.FP7_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: RM.RM3_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                    ],
                isShowBilledAtOrder: true,
                totalPrice: price.Yen3600, 
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
                    paymentMethod: 'Cash- 現金',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: true,
                paymentDate: null
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
                    productName: RM.RM3_T10,
                    associateCourses: null,
                    discountLabel: discount.Percent10,
                    startDate: ['--']
                },{
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
            12,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
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
                    isPackage: false,
                    associateCourses: [],
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
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2101_2140,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
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
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                },{
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
        await sFBilling.assert_Billing_Billing_TotalBillItem(8);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
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
                    isPackage: false,
                    associateCourses: [],
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
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
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
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.new,
                    orderStatus: status.voided
                }
            ]
        );

    })

    test('Order with recurring product and one-time material product with custom billing date = null (payment status = pending)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO12:4 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createMultipleProductsOrder(
            {
                numberOfProduct: 2,
                location: environment.location,
                listProductInfor:
                    [
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: FP.FP7_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                        {
                            productInfo: {
                                productType: 'one-time',
                                product: OTM.OTM1_T10,
                                startDate: null,
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                    ],
                isShowBilledAtOrder: true,
                totalPrice: price.Yen2700, 
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
                    paymentMethod: 'Cash- 現金',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: false,
                paymentDate: null
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
                    productName: OTM.OTM1_T10,
                    associateCourses: null,
                    discountLabel: discount.Percent10,
                    startDate: ['--']
                },{
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
            8,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
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
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
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
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                },{
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
        await sFBilling.assert_Billing_Billing_TotalBillItem(6);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
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
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
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
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.new,
                    orderStatus: status.voided
                }
            ]
        );

    })
    
    test('Order with recurring product and one-time material product with custom billing date = future date (payment status = pending)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO12:5 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createMultipleProductsOrder(
            {
                numberOfProduct: 2,
                location: environment.location,
                listProductInfor:
                    [
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: FP.FP7_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                        {
                            productInfo: {
                                productType: 'one-time',
                                product: OTM.OTM3_CBD2030Jan01,
                                startDate: null,
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                    ],
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
                    paymentMethod: 'Cash- 現金',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: false,
                paymentDate: null
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
                    productName: OTM.OTM3_CBD2030Jan01,
                    associateCourses: null,
                    discountLabel: discount.Percent10,
                    startDate: ['--']
                },{
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
            7,
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
                    isRecurringProduct: false,
                    billingPeriod: null,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_01Jan2030,
                    billingAmount: price.Yen900
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
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                },{
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

    test('Order with 2 recurring products (payment status = pending)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO12:6 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createMultipleProductsOrder(
            {
                numberOfProduct: 2,
                location: environment.location,
                listProductInfor:
                    [
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: FP.FP7_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: RM.RM3_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                    ],
                isShowBilledAtOrder: true,
                totalPrice: price.Yen3600, 
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
                    paymentMethod: 'Cash- 現金',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: false,
                paymentDate: null
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
                    productName: RM.RM3_T10,
                    associateCourses: null,
                    discountLabel: discount.Percent10,
                    startDate: ['--']
                },{
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
            12,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
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
                    isPackage: false,
                    associateCourses: [],
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
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2101_2140,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
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
                    isPackage: false,
                    associateCourses: [],
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.cancelled,
                    durationIsCurrentDate: false,
                    duration: [''],
                    upcomingBillingDate: ['--']
                },{
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
        await sFBilling.assert_Billing_Billing_TotalBillItem(8);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2061_2100,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen900
                },{
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
                    isPackage: false,
                    associateCourses: [],
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
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2060,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio44,
                    isPackage: false,
                    associateCourses: [],
                    billingStatus: status.invoiced,
                    billingDate: sFCommonStep.currentDate,
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