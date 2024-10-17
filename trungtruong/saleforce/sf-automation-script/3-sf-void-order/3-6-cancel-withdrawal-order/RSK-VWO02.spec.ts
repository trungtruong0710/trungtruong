import { test, login, sFCreateNewStudent, sFAssertBODAmount, sFAssertUpcomingBilling, sFContactDetail, sFApplications, sFBilling, sFCommonStep, sFCreateOrder } from '../../../sf-page/test-hook';
import sF_DateTime from '../../../sf-date-time';
import price from '../../../utils/price';
import environment from '../../../utils/environment';

test.describe('Void withdrawal order successfully within 28 days from withdrawal date', () => {

    test('Void withdrawal order successfully within 28 days from withdrawal date', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('VWO02:1 MANUAL ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create enrollment application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.submit_DraftEnrollmentOrder_WithDefaultPackage(
            {
                location: environment.location,
                startDate: sF_DateTime.startDate_2021Jan01[0],
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1800,
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen900]
            }
        );
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.currentDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        // Access contact detail
        await sFCommonStep.access_ContactDetail(studentUrl);
        // create withdrawal application
        await sFContactDetail.clickBtn_BillingTab();
        await sFContactDetail.clickBtn_ApplicationsTab();
        await sFApplications.createWithdrawalApplication(environment.location, environment.reason, sFCommonStep.currentDate[0]);
        const withdrawalUrl = await sFApplications.accessWithdrawalOrder();
        await sFCommonStep.click('Submit');
        await sFCommonStep.click('Confirm');

    })

})