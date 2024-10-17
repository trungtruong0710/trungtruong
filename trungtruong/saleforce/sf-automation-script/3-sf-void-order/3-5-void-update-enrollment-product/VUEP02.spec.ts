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

test.describe('Cannot void update frequency package order (frequency package create in enrollment order)', () => {

    test('Cannot void update frequency package order', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VUEP02:1 ', environment.grade);
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
                effectiveDate: sFCommonStep.currentDate[0],
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            null
        );
        await sFOrderDetail.assertVoidIsDisable();
    })

    test('Cannot void update cancel frequency package order', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VUEP02:2 MANUAL ', environment.grade);
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
                isRemoveDiscount: true,
                discount: null,
                effectiveDate: sFCommonStep.currentDate[0],
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            null
        );
    })

})