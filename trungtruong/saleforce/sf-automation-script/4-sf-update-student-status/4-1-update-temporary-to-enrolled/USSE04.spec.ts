import { test, login, sFCreateNewStudent, sFContactDetail, sFApplications, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
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

test.describe('Auto create enrolled status for student', () => {

    test('Auto create enrolled status for student', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('USSE04:1 ', environment.gradeRSK);
        // await sFCommonStep.access_ContactDetail(studentUrl);
        // // create enrollment application
        // await sFContactDetail.clickBtn_BillingTab();
        // await sFContactDetail.clickBtn_ApplicationsTab();
        // await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
        //     {
        //         location: environment.location,
        //         startDate: sF_DateTime.startDate_2021Jan01[0],
        //         isRemoveDiscount: false,
        //         discountName: null,
        //         updatePackage: null,
        //         numberOfSlot: null,
        //         isShowBilledAtOrder: true,
        //         totalPrice: price.Yen1800,
        //         isShowUpcomingBilling: true,
        //         upcomingBillingPrice: [price.Yen900]
        //     }
        // );
        // await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        // await sFApplications.assertCreateEnrollmentSuccess();
        // // Access contact detail
        // await sFCommonStep.access_ContactDetail(studentUrl);
        // await sFContactDetail.assert_ActiveEnrollment(
        //     [
        //         {
        //             location: environment.location,
        //             enrollmentStatus: enrollmentStatus.enrolled,
        //             startDate: sFCommonStep.currentDate,
        //             isEndDateShow: false,
        //             endDate: []
        //         }
        //     ]
        // )
        // // Access to student billing
        // await sFContactDetail.clickBtn_BillingTab();
        // await sFBilling.assert_Billing_ProductList(
        //     [
        //         {
        //             isShowTag: false,
        //             tagType: null,
        //             isPackage: true,
        //             associateCourses: [
        //                 {
        //                     courseName: FP.FP_REQ_1SLOT,
        //                     isVisible: true,
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL1_1SLOT,
        //                     isVisible: false,
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL2_1SLOT,
        //                     isVisible: false,
        //                 }
        //             ],
        //             discountLabel: discount.Percent10,
        //             productStatus: productStatus.ordered,
        //             durationIsCurrentDate: false,
        //             duration: sF_DateTime.duration_2021Jan01_2180Dec31,
        //             upcomingBillingDate: sF_DateTime.text_31Dec2080
        //         }
        //     ]
        // );
        // await sFBilling.assert_Billing_Billing_TotalBillItem(4);
        // await sFBilling.assert_Billing_BillItem(
        //     [
        //         {
        //             isAdjustment: false,
        //             isRecurringProduct: true,
        //             billingPeriod: billingPeriod.period_2061_2100,
        //             isRatio: false,
        //             billingRatio: null,
        //             isPackage: true,
        //             associateCourses: [
        //                 {
        //                     courseName: FP.FP_REQ_1SLOT,
        //                     isVisible: true
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL1_1SLOT,
        //                     isVisible: false
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL2_1SLOT,
        //                     isVisible: false
        //                 }
        //             ],
        //             billingStatus: status.billed,
        //             billingDate: sFCommonStep.currentDate,
        //             billingAmount: price.Yen900
        //         },
        //         {
        //             isAdjustment: false,
        //             isRecurringProduct: true,
        //             billingPeriod: billingPeriod.period_2021_2060,
        //             isRatio: true,
        //             billingRatio: billingPeriod.ratio44,
        //             isPackage: true,
        //             associateCourses: [
        //                 {
        //                     courseName: FP.FP_REQ_1SLOT,
        //                     isVisible: true
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL1_1SLOT,
        //                     isVisible: false
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL2_1SLOT,
        //                     isVisible: false
        //                 }
        //             ],
        //             billingStatus: status.billed,
        //             billingDate: sFCommonStep.currentDate,
        //             billingAmount: price.Yen900
        //         },{
        //             isAdjustment: false,
        //             isRecurringProduct: true,
        //             billingPeriod: billingPeriod.period_2141_2180,
        //             isRatio: false,
        //             billingRatio: generalText.billingRatio,
        //             isPackage: true,
        //             associateCourses: [
        //                 {
        //                     courseName: FP.FP_REQ_1SLOT,
        //                     isVisible: true
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL1_1SLOT,
        //                     isVisible: false
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL2_1SLOT,
        //                     isVisible: false
        //                 }
        //             ],
        //             billingStatus: status.pending,
        //             billingDate: sF_DateTime.text_31Dec2110,
        //             billingAmount: price.Yen900
        //         },
        //         {
        //             isAdjustment: false,
        //             isRecurringProduct: true,
        //             billingPeriod: billingPeriod.period_2101_2140,
        //             isRatio: false,
        //             billingRatio: generalText.billingRatio,
        //             isPackage: true,
        //             associateCourses: [
        //                 {
        //                     courseName: FP.FP_REQ_1SLOT,
        //                     isVisible: true
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL1_1SLOT,
        //                     isVisible: false
        //                 },
        //                 {
        //                     courseName: FP.FP_OPTIONAL2_1SLOT,
        //                     isVisible: false
        //                 }
        //             ],
        //             billingStatus: status.pending,
        //             billingDate: sF_DateTime.text_31Dec2080,
        //             billingAmount: price.Yen900
        //         }
        //     ]
        // );
        // await sFBilling.assert_Billing_TotalOrder(1);
        // await sFBilling.assert_Billing_Order(
        //     [
        //         {
        //             orderType: orderType.enrollment,
        //             orderStatus: status.submitted
        //         }
        //     ]
        // );
        
    })

})