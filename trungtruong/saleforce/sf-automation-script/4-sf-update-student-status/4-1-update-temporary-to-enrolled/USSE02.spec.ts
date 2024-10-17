import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFApplications, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import enrollmentStatus from '../../../utils/enrollment-status';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import status from '../../../utils/status';

test.describe('Auto create temporary status for student' + 'Create draft enrollment order for student', () => {

    test('Auto create temporary status for student' + 'Create draft enrollment order for student', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('USSE02:1 ', environment.gradeRSK);
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
        // Access to student billing to check draft order
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.assert_Billing_TotalOrder(1);
        await sFBilling.assert_Billing_Order(
            [
                {
                    orderType: orderType.enrollment,
                    orderStatus: status.draft
                }
            ]
        );

    })
})