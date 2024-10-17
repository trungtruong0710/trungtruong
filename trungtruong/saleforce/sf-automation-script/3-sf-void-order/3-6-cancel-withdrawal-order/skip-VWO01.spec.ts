import { test, login, sFCreateNewStudent, sFAssertBODAmount, sFAssertUpcomingBilling, sFContactDetail, sFApplications, sFBilling, sFCommonStep, sFCreateOrder } from '../../../sf-page/test-hook';
import sF_DateTime from '../../../sf-date-time';
import enrollmentStatus from '../../../utils/enrollment-status';
import generalText from '../../../utils/general-text';
import orderType from '../../../utils/order-type';
import status from '../../../utils/status';
import billingPeriod from '../../../utils/billing-period';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import discount from '../../../utils/discount';
import productStatus from '../../../utils/product-status';
import environment from '../../../utils/environment';

test.describe('Void withdrawal order)', () => {

    test.skip('Void withdrawal order with withdrawal eff.date = first billing period (billing satus = billed)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VWO01:1 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2051Jan01[0],
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen599,
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
        );
        // create withdrawal application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createWithdrawalApplication(environment.location, environment.reason, sF_DateTime.startDate_2051Jan01[0]);
        const withdrawalUrl = await sFApplications.accessWithdrawalOrder();
        await sFCommonStep.wait(2000);
        await sFCommonStep.click('Submit');
        await sFCommonStep.click('Confirm');
        await sFCommonStep.wait(2000);
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.enrolled,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: true,
                    endDate: sF_DateTime.startDate_2051Jan01
                }
            ]
        )
        // Access student billing after create withdrawal
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
                    tagType: generalText.withdrawalSchedule,
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2051Jan01_2051Jan01,
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(2);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio13,
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
                    billingAmount: price.minusYen300
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
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
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.withdrawal,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        // Access withdrawal record to cancel
        await sFCommonStep.accessToUrl(withdrawalUrl);
        await sFApplications.cancelApplication('Cancel Withdrawal', null)
        await sFApplications.assertCancelWithdrawalSuccess();
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
        // Access student billing after cancel withdrawal
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2051Jan01_2140Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(3);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
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
                    orderType: orderType.withdrawal,
                    orderStatus: status.voided
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );

    })

    test.skip('Void withdrawal order with withdrawal eff.date = first billing period (billing satus = pending)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VWO01:2 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2081Jan01[0],
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: false,
                totalPrice: [],
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen599]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
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
        );
        // create withdrawal application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createWithdrawalApplication(environment.location, environment.reason, sF_DateTime.startDate_2081Jan01[0]);
        const withdrawalUrl = await sFApplications.accessWithdrawalOrder();
        await sFCommonStep.wait(2000);
        await sFCommonStep.click('Submit');
        await sFCommonStep.click('Confirm');
        await sFCommonStep.wait(2000);
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.enrolled,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: true,
                    endDate: sF_DateTime.startDate_2081Jan01
                }
            ]
        )
        // Access student billing after create withdrawal
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
                    tagType: generalText.withdrawalSchedule,
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2081Jan01_2081Jan01,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(2);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio13,
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
                    billingAmount: price.minusYen300
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen599
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.withdrawal,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        // Access withdrawal record to cancel
        await sFCommonStep.accessToUrl(withdrawalUrl);
        await sFApplications.cancelApplication('Cancel Withdrawal', null)
        await sFApplications.assertCancelWithdrawalSuccess();
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
        // Access student billing after cancel withdrawal
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2081Jan01_2140Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(2);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2111_2140,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen599
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.withdrawal,
                    orderStatus: status.voided
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );

    })

    test.skip('Void withdrawal order with withdrawal eff.date = second billing period (billing satus = billed)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VWO01:3 ', environment.grade);
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
        );
        // create withdrawal application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createWithdrawalApplication(environment.location, environment.reason, sFCommonStep.currentDate[0]);
        const withdrawalUrl = await sFApplications.accessWithdrawalOrder();
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.minusYen1200);
        await sFCommonStep.click('Submit');
        await sFCommonStep.click('Confirm');
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.enrolled,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: true,
                    endDate: sFCommonStep.currentDate
                }
            ]
        )
        // Access student billing after create withdrawal
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
                    tagType: generalText.withdrawalSchedule,
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_1991Jan01_CurrentDate,
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(5);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
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
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio13,
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
                    billingAmount: price.minusYen300
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
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
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.withdrawal,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        // Access withdrawal record to cancel
        await sFCommonStep.accessToUrl(withdrawalUrl);
        await sFApplications.cancelApplication('Cancel Withdrawal', null)
        await sFApplications.assertCancelWithdrawalSuccess();
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
        // Access student billing after cancel withdrawal
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
                    billingPeriod: billingPeriod.period_2111_2140,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
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
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
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
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.withdrawal,
                    orderStatus: status.voided
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );

    })

    test.skip('Void withdrawal order with withdrawal eff.date = second billing period (billing satus = pending)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VWO01:4 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2051Jan01[0],
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen599,
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
        );
        // create withdrawal application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createWithdrawalApplication(environment.location, environment.reason, sF_DateTime.startDate_2081Jan01[0]);
        const withdrawalUrl = await sFApplications.accessWithdrawalOrder();
        await sFCreateOrder.assert_BOD_NoInformation();
        await sFAssertUpcomingBilling.assert_UB_PackageBillItem(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio13,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    isShowDiscount: true,
                    discountLabel: discount.Percent10,
                    isProductPricePositive: false,
                    productPrice: price.minusYen300,
                    billingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
        await sFCommonStep.click('Submit');
        await sFCommonStep.click('Confirm');
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.enrolled,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: true,
                    endDate: sF_DateTime.startDate_2081Jan01
                }
            ]
        )
        // Access student billing after create withdrawal
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
                    tagType: generalText.withdrawalSchedule,
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2051Jan01_2081Jan01,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(3);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio13,
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
                    billingAmount: price.minusYen300
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
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
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.withdrawal,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        // Access withdrawal record to cancel
        await sFCommonStep.accessToUrl(withdrawalUrl);
        await sFApplications.cancelApplication('Cancel Withdrawal', null)
        await sFApplications.assertCancelWithdrawalSuccess();
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
        // Access student billing after cancel withdrawal
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
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2051Jan01_2140Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
                }
            ]
        );
        await sFBilling.assert_Billing_Billing_TotalBillItem(3);
        await sFBilling.assert_Billing_BillItem(
            [
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2111_2140,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
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
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen900
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
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
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.withdrawal,
                    orderStatus: status.voided
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );

    })

})