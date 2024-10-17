import { test, login, sFCreateNewStudent } from './test-hook';
import environment from '../utils/environment';

test.describe('Auto create temporary status for student' + 'Create draft enrollment order for student', () => {

    test.only('Auto create temporary status for student' + 'Create draft enrollment order for student', async ({ page }) => {

        await login.adminSignIn();
        await sFCreateNewStudent.createStudentWithPaymentDetailOnlyATien(86, environment.gradeRSK);

    })
})