import { test, login, sFCreateNewStudent, sFContactDetail, sFApplications, sFBilling, sFCommonStep, sFCreateOrder } from '../../../sf-page/test-hook';
import sF_DateTime from '../../../sf-date-time';
import enrollmentStatus from '../../../utils/enrollment-status';
import generalText from '../../../utils/general-text';
import orderType from '../../../utils/order-type';
import status from '../../../utils/status';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import discount from '../../../utils/discount';
import productStatus from '../../../utils/product-status';
import environment from '../../../utils/environment';
import OTP from '../../../utils/product-one-time-package';
import SP from '../../../utils/product-schedule-package';

test.describe.skip('Create resume order successfully without product', () => {

    test('Resume without product (one-time product)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('USSR02:1 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithNotDefaultPackage(
            {
                location: environment.location, 
                isRecurringProduct: false,
                startDate: '', 
                product: OTP.OTP1_T10,
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen900, 
                isShowUpcomingBilling: false,
                upcomingBillingPrice: []
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
        // create loa application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createLOAApplication(environment.location, environment.reason, sFCommonStep.currentDate[0], sF_DateTime.startDate_2031Jan01[0]);
        await sFApplications.accessLOAOrder();
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
                    endDate: sFCommonStep.currentDate
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
                            courseName: SP.SP_OPTIONAL1_1SLOT,
                            isVisible: true,
                        },
                        {
                            courseName: SP.SP_OPTIONAL2_1SLOT,
                            isVisible: false,
                        }
                    ],
                    discountLabel: discount.Percent10,
                    productStatus: productStatus.ordered,
                    durationIsCurrentDate: false,
                    duration: sF_DateTime.duration_2024Jan01_2150Dec31,
                    upcomingBillingDate: ['--']
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.loa,
                    orderStatus: status.submitted
                },
                {
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
    })

    test('Resume without product (recurring product without is_paused tag)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('USSR02:2 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithNotDefaultPackage(
            {
                location: environment.location, 
                isRecurringProduct: true,
                startDate: sF_DateTime.startDate_2021Jan01[0], 
                product: FP.FP1_T10,
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
        )
        // create loa application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createLOAApplication(environment.location, environment.reason, sFCommonStep.currentDate[0], sF_DateTime.startDate_2031Jan01[0]);
        await sFApplications.accessLOAOrder();
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
                    endDate: sFCommonStep.currentDate
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
                        },{
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
                    duration: sF_DateTime.duration_2021Jan01_2140Dec31,
                    upcomingBillingDate: sF_DateTime.text_31Dec2050
                }
            ]
        );
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.loa,
                    orderStatus: status.submitted
                },
                {
                    orderType: orderType.enrollment,
                    orderStatus: status.submitted
                }
            ]
        );
    })

})