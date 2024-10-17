import { test, login, sFCreateNewStudent, sFContactDetail, sFApplications, sFBilling, sFCommonStep, sFOrderDetail } from '../../../sf-page/test-hook';
import sF_DateTime from '../../../sf-date-time';
import enrollmentStatus from '../../../utils/enrollment-status';
import orderType from '../../../utils/order-type';
import status from '../../../utils/status';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import discount from '../../../utils/discount';
import productStatus from '../../../utils/product-status';
import environment from '../../../utils/environment';
import generalText from '../../../utils/general-text';
import billingPeriod from '../../../utils/billing-period';

test.describe('Cannot void update frequency package order (frequency package create in enrollment order)', () => {

    test('Void update frequency package order', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VUEP03:1 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location, 
                startDate: sF_DateTime.startDate_1991Jan01[0],
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen2399, 
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen900]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.enrolled,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: false,
                    endDate: []
                }
            ]
        )
        // Access to student billing
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_1991Jan01_2140Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
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
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        const updateOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFCommonStep.accessToUrl(updateOrderUrl)
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.update
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
                    tagType: generalText.updateSchedule,
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_1991Jan01_2140Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(5);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: null,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: null,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_1991_2020,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
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
                    billingAmount: price.Yen599
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2111_2140,
                    isRatio: null,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: null,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderStatus: status.voided,
                    orderType: orderType.update
                },{
                    orderStatus: status.submitted,
                    orderType: orderType.enrollment
                }
            ]
        );

    })

    test('Void update cancel frequency package order', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VUEP03:2 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location, 
                startDate: sF_DateTime.startDate_1991Jan01[0],
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen2399, 
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen900]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.enrolled,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: false,
                    endDate: []
                }
            ]
        )
        // Access to student billing
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_1991Jan01_2140Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
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
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        const updateOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            null
        );
        await sFOrderDetail.clickVoid();
        await sFOrderDetail.assertVoidSuccess();
        await sFCommonStep.accessToUrl(updateOrderUrl)
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.voided,
                orderType: orderType.update
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
                    tagType: generalText.updateSchedule,
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_1991Jan01_2140Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(5);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: null,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: null,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_1991_2020,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
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
                    billingAmount: price.Yen599
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2111_2140,
                    isRatio: null,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: null,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderStatus: status.voided,
                    orderType: orderType.update
                },{
                    orderStatus: status.submitted,
                    orderType: orderType.enrollment
                }
            ]
        );

    })

})