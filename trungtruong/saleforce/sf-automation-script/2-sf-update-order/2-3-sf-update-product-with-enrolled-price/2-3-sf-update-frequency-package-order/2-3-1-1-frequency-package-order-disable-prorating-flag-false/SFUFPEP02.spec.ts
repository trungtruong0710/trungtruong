import { test, login, sFCreateNewStudent, sFContactDetail, sFApplications, sFBilling, sFCommonStep, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFOrderDetail } from '../../../../../sf-page/test-hook';
import sF_DateTime from '../../../../../sf-date-time';
import generalText from '../../../../../utils/general-text';
import orderType from '../../../../../utils/order-type';
import status from '../../../../../utils/status';
import billingPeriod from '../../../../../utils/billing-period';
import price from '../../../../../utils/price';
import FP from '../../../../../utils/product-frequency-package';
import discount from '../../../../../utils/discount';
import productStatus from '../../../../../utils/product-status';
import environment from '../../../../../utils/environment';

test.describe('Update frequency package product (eff.date belong to next billing schedule period)', () => {

    test('Update discount', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly_Old('SFUFPEP02:1 ');
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2021Jan01[0],
                isRemoveDiscount: true,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1666,
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen1000]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access to student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'update',
                isRemoveDiscount: false,
                discount: discount.Percent10,
                effectiveDate: sF_DateTime.startDate_2051Jan01[0],
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFAssertBODBillItem.assertBilledAtOrderPackageType(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    numberOfDiscount: 0,
                    isShowDiscount: false,
                    discountLabel: null,
                    isProductPricePositive: false,
                    productPrice: price.minusYen67
                }
            ]
        );
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.minusYen67);
        await sFAssertUpcomingBilling.assert_UB_PackageBillItem(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: false,
                    billingRatio: generalText.billingRatio,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    isShowDiscount: true,
                    discountLabel: discount.Percent10,
                    isProductPricePositive: false,
                    productPrice: price.minusYen100,
                    billingDate: sF_DateTime.text_31Dec2080
                }
            ]
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
                    productName: FP.FP3_T10,
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
                    startDate: sF_DateTime.startDate_2051Jan01
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            3,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen67
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen1000
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen1000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
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
                    discountLabel: '--',
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2021Jan01_2050Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
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
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen67
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                },
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen666
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
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
                    orderType: orderType.update,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        
    })

    test('Update discount with recurring_valid_duration = 1', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly_Old('SFUFPEP02:2 ');
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2021Jan01[0],
                isRemoveDiscount: true,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1666,
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen1000]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access to student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'update',
                isRemoveDiscount: false,
                discount: discount.Percent10_RVD1,
                effectiveDate: sF_DateTime.startDate_2051Jan01[0],
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFAssertBODBillItem.assertBilledAtOrderPackageType(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    numberOfDiscount: 0,
                    isShowDiscount: false,
                    discountLabel: null,
                    isProductPricePositive: false,
                    productPrice: price.minusYen67
                }
            ]
        );
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.minusYen67);
        await sFAssertUpcomingBilling.assert_UB_PackageBillItem(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: false,
                    billingRatio: generalText.billingRatio,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    isShowDiscount: true,
                    discountLabel: discount.Percent10_RVD1,
                    isProductPricePositive: false,
                    productPrice: price.Yen0,
                    billingDate: sF_DateTime.text_31Dec2080
                }
            ]
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
                    productName: FP.FP3_T10,
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
                    discountLabel: discount.Percent10_RVD1,
                    startDate: sF_DateTime.startDate_2051Jan01
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            3,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen67
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen1000
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen1000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
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
                    discountLabel: '--',
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2021Jan01_2050Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
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
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen67
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                },
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen666
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen1000
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
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
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        
    })

    test('Increase slot for associate course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly_Old('SFUFPEP02:3 ');
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2021Jan01[0],
                isRemoveDiscount: true,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1666,
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen1000]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access to student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'update',
                isRemoveDiscount: false,
                discount: discount.Percent10,
                effectiveDate: sF_DateTime.startDate_2051Jan01[0],
                updatePackage: null,
                numberOfSlot: 2
            }
        );
        await sFAssertBODBillItem.assertBilledAtOrderPackageType(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    numberOfDiscount: 0,
                    isShowDiscount: false,
                    discountLabel: null,
                    isProductPricePositive: true,
                    productPrice: price.Yen532
                }
            ]
        );
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.Yen532);
        await sFAssertUpcomingBilling.assert_UB_PackageBillItem(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: false,
                    billingRatio: generalText.billingRatio,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    isShowDiscount: true,
                    discountLabel: discount.Percent10,
                    isProductPricePositive: true,
                    productPrice: price.Yen800,
                    billingDate: sF_DateTime.text_31Dec2080
                }
            ]
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
                    productName: FP.FP3_T10,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
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
                    startDate: sF_DateTime.startDate_2051Jan01
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            3,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen532
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen1000
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen1000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
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
                    discountLabel: '--',
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2021Jan01_2050Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
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
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen532
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                },
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen666
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2111_2140,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen1800
                },
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen1800
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
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        
    })

    test('Decrease slot for associate course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly_Old('SFUFPEP02:4 ');
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2021Jan01[0],
                isRemoveDiscount: true,
                discountName: null,
                updatePackage: null,
                numberOfSlot: 2,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen3333,
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen2000]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access to student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'update',
                isRemoveDiscount: false,
                discount: discount.Percent10,
                effectiveDate: sF_DateTime.startDate_2051Jan01[0],
                updatePackage: null,
                numberOfSlot: 1
            }
        );
        await sFAssertBODBillItem.assertBilledAtOrderPackageType(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    numberOfDiscount: 0,
                    isShowDiscount: false,
                    discountLabel: null,
                    isProductPricePositive: false,
                    productPrice: price.minusYen734
                }
            ]
        );
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.minusYen734);
        await sFAssertUpcomingBilling.assert_UB_PackageBillItem(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: false,
                    billingRatio: generalText.billingRatio,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    isShowDiscount: true,
                    discountLabel: discount.Percent10,
                    isProductPricePositive: false,
                    productPrice: price.minusYen1100,
                    billingDate: sF_DateTime.text_31Dec2080
                }
            ]
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
                    productName: FP.FP3_T10,
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
                    startDate: sF_DateTime.startDate_2051Jan01
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            3,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen734
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2111_2140,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen2000
                },{
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen2000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
                    tagType: generalText.updateSchedule,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
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
                    discountLabel: '--',
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2021Jan01_2050Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
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
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen734
                },
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: false,
                    billingRatio: null,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen2000
                },
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_2SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1333
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
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
                    orderType: orderType.update,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        
    })

    test('Update add associate course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly_Old('SFUFPEP02:5 ');
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2021Jan01[0],
                isRemoveDiscount: true,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1666,
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen1000]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access to student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'update',
                isRemoveDiscount: false,
                discount: discount.Percent10,
                effectiveDate: sF_DateTime.startDate_2051Jan01[0],
                updatePackage: [
                    {
                        courseName: FP.FP_OPTIONAL1_1SLOT,
                        isSelect: true
                    }
                ],
                numberOfSlot: null
            }
        );
        await sFAssertBODBillItem.assertBilledAtOrderPackageType(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    numberOfDiscount: 0,
                    isShowDiscount: false,
                    discountLabel: null,
                    isProductPricePositive: true,
                    productPrice: price.Yen532
                }
            ]
        );
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.Yen532);
        await sFAssertUpcomingBilling.assert_UB_PackageBillItem(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: false,
                    billingRatio: generalText.billingRatio,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    isShowDiscount: true,
                    discountLabel: discount.Percent10,
                    isProductPricePositive: true,
                    productPrice: price.Yen800,
                    billingDate: sF_DateTime.text_31Dec2080
                }
            ]
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
                    productName: FP.FP3_T10,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    discountLabel: discount.Percent10,
                    startDate: sF_DateTime.startDate_2051Jan01
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            3,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen532
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen1000
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen1000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
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
                    discountLabel: '--',
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2021Jan01_2050Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
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
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen532
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1000
                },
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen666
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen1800
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen1800
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
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        
    })

    test('Update remove associate course', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly_Old('SFUFPEP02:6 ');
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2021Jan01[0],
                isRemoveDiscount: true,
                discountName: null,
                updatePackage: [
                    {
                        courseName: FP.FP_OPTIONAL1_1SLOT,
                        isSelect: true
                    }
                ],
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen3333,
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen2000]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access to student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'update',
                isRemoveDiscount: false,
                discount: discount.Percent10,
                effectiveDate: sF_DateTime.startDate_2051Jan01[0],
                updatePackage: [
                    {
                        courseName: FP.FP_OPTIONAL1_1SLOT,
                        isSelect: true
                    }
                ],
                numberOfSlot: null
            }
        );
        await sFAssertBODBillItem.assertBilledAtOrderPackageType(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    numberOfDiscount: 0,
                    isShowDiscount: false,
                    discountLabel: null,
                    isProductPricePositive: false,
                    productPrice: price.minusYen734
                }
            ]
        );
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.minusYen734);
        await sFAssertUpcomingBilling.assert_UB_PackageBillItem(
            [
                {
                    productName: FP.FP3_T10,
                    isAdjustment: true,
                    billingPeriod: billingPeriod.period_2081_2110,
                    isRatio: false,
                    billingRatio: generalText.billingRatio,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOTWk,
                            isVisible: true
                        },{
                            courseName: FP.FP_OPTIONAL1_1SLOTWk,
                            isVisible: false
                        },{
                            courseName: FP.FP_OPTIONAL2_1SLOTWk,
                            isVisible: false
                        }
                    ],
                    isShowDiscount: true,
                    discountLabel: discount.Percent10,
                    isProductPricePositive: false,
                    productPrice: price.minusYen1100,
                    billingDate: sF_DateTime.text_31Dec2080
                }
            ]
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
                    productName: FP.FP3_T10,
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
                    startDate: sF_DateTime.startDate_2051Jan01
                }
            ]
        );
        await sFOrderDetail.assertOrderDetailBilling(
            3,
            [
                {
                    isAdjustment: true,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2051_2080,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen734
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen2000
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.cancelled,
                    billingDate: sF_DateTime.text_31Dec2080,
                    billingAmount: price.Yen2000
                }
            ]
        );
        // Access stundet billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_ProductList(
            [
                {
                    isShowTag: true,
                    tagType: generalText.updateSchedule,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true,
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true,
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false,
                        }
                    ],
                    discountLabel: '--',
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2021Jan01_2050Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2080
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
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.minusYen734
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen2000
                },
                {
                    isAdjustment: false,
                    isRecurringProduct: true,
                    billingPeriod: billingPeriod.period_2021_2050,
                    isRatio: true,
                    billingRatio: billingPeriod.ratio23,
                    isPackage: true,
                    associateCourses: [
                        {
                            courseName: FP.FP_REQ_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: true
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.billed,
                    billingDate: sFCommonStep.currentDate,
                    billingAmount: price.Yen1333
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
                            courseName: FP.FP_OPTIONAL2_1SLOT,
                            isVisible: false
                        }
                    ],
                    billingStatus: status.pending,
                    billingDate: sF_DateTime.text_31Dec2110,
                    billingAmount: price.Yen900
                },
                {
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
                        },
                        {
                            courseName: FP.FP_OPTIONAL1_1SLOT,
                            isVisible: false
                        },
                        {
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
                    orderType: orderType.update,
                    orderStatus: status.submitted
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
        
    })

})