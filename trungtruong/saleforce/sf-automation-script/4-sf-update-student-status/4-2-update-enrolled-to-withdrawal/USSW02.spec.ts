import { test, login, sFCreateNewStudent, sFContactDetail, sFApplications, sFBilling, sFCommonStep, sFCreateOrder } from '../../../sf-page/test-hook';
import sF_DateTime from '../../../sf-date-time';
import enrollmentStatus from '../../../utils/enrollment-status';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import environment from '../../../utils/environment';

test.describe.skip('Not able to create withdrawal order with enrollment status is enrolled', () => {

    test('Cannot create withdrawal order with Update schedule tag and last attendance date < eff.date', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('USSW02:6 ', environment.grade);
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
        // update product
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
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        // create withdrawal application
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createWithdrawalApplication(environment.location, environment.reason, sFCommonStep.currentDate[0]);
        await sFApplications.accessWithdrawalOrder();
        await sFCreateOrder.assertErrorUpdateScheduled();
    })

    test('Cannot create withdrawal order with Update schedule tag and last attendance date > eff.date', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('USSW02:7 ', environment.grade);
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
        // update product
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
        await sFCommonStep.click('Next');
        await sFCommonStep.click('Submit');
        // create withdrawal application
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createWithdrawalApplication(environment.location, environment.reason, sF_DateTime.startDate_2031Jan01[0]);
        await sFApplications.accessWithdrawalOrder();
        await sFCreateOrder.assertErrorUpdateScheduled();
    })

})