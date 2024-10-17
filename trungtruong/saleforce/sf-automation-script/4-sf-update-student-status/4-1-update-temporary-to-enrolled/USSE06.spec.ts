import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFApplications, sFCommonStep } from '../../../sf-page/test-hook';
import enrollmentStatus from '../../../utils/enrollment-status';
import environment from '../../../utils/environment';
import price from '../../../utils/price';

test.describe('Not auto create enrolled status for student ', () => {

    test('Not auto create enrolled status for student ', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudentWithPaymentDetailOnly('USSE06:1 ', environment.gradeRSK);
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
        await sFApplications.submit_EnrollmentOrder(sFCommonStep.nextDate[0]);
        await sFApplications.assertCreateEnrollmentSuccess();
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.assert_ActiveEnrollment(
            [
                {
                    location: environment.location,
                    enrollmentStatus: enrollmentStatus.temporary,
                    startDate: sFCommonStep.currentDate,
                    isEndDateShow: true,
                    endDate: sFCommonStep.currentDate
                }
            ]
        )
        
    })
})