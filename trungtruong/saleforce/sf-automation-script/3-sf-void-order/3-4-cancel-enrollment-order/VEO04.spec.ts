import { test, login, sFCreateNewStudent, sFAssertBODBillItem, sFAssertBODAmount, sFAssertUpcomingBilling, sFContactDetail, sFApplications, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
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

test.describe('Void enrollment order successfully after void withdrawal/loa order', () => {

    test('Void enrollment order incase user void withdrawal already', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VEO04:1 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        const enrollmentUrl = await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
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
        // create withdrawal application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createWithdrawalApplication(environment.location, environment.reason, sFCommonStep.currentDate[0]);
        const withdrawalUrl = await sFApplications.accessWithdrawalOrder();
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.minusYen1200);
        await sFCommonStep.click('Submit');
        await sFCommonStep.click('Confirm');
        await sFCommonStep.accessToUrl(withdrawalUrl);
        await sFApplications.cancelApplication('Cancel Withdrawal', null);
        await sFApplications.assertCancelWithdrawalSuccess();
        // access enrollment order
        await sFCommonStep.accessToUrl(enrollmentUrl);
        await sFApplications.cancelApplication('Cancel Enrollment', sFCommonStep.currentDate[0]);
        await sFApplications.assertCancelEnrollmentSuccess();
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.temporary,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: false,
                    endDate: []
                }
            ]
        )
        // Access contact detail
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
        await sFBilling.assert_Billing_Billing_TotalBillItem(0);
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.withdrawal,
                    orderStatus: status.voided
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.voided
                }
            ]
        );
    })

    test('Void enrollment order incase user void LOA already', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VEO04:2 ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        const enrollmentUrl = await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
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
        // create withdrawal application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createLOAApplication(environment.location, environment.reason, sFCommonStep.currentDate[0], sF_DateTime.startDate_2031Jan01[0]);
        const loaUrl = await sFApplications.accessLOAOrder();
        await sFAssertBODAmount.assertBilledAtOrderTotal(false, price.minusYen1200);
        await sFCommonStep.click('Submit');
        await sFCommonStep.click('Confirm');
        await sFCommonStep.accessToUrl(loaUrl);
        await sFApplications.cancelApplication('Cancel LOA', null);
        await sFApplications.assertCancelLOASuccess();
        // access enrollment order
        await sFCommonStep.accessToUrl(enrollmentUrl);
        await sFApplications.cancelApplication('Cancel Enrollment', sFCommonStep.currentDate[0]);
        await sFApplications.assertCancelEnrollmentSuccess();
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.temporary,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: false,
                    endDate: []
                }
            ]
        )
        // Access contact detail
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
        await sFBilling.assert_Billing_Billing_TotalBillItem(0);
        await sFBilling.assert_Billing_TotalOrder(2);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.loa,
                    orderStatus: status.voided
                },{
                    orderType: orderType.enrollment,
                    orderStatus: status.voided
                }
            ]
        );
    })

})