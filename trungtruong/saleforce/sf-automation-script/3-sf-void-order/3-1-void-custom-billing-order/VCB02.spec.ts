import { test, login, sFContactDetail, sFCreateNewStudent, sFCreateCustomBilling, sFOrderDetail, sFCommonStep, sFCreateOrder, sFBilling } from '../../../sf-page/test-hook';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import status from '../../../utils/status';

test.describe('Cannot void custom billing order', () => {

    test('Not able to void custom billing with "Invoice" billing status', async ({ page }) => {
        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VCB02:1 ', environment.grade)
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_CreateCustomBilling();
        await sFCreateCustomBilling.createCustomBilling(
            environment.location,
            [
                {
                    description: 'Positive Product',
                    tax: null,
                    price: '2000'
                },{
                    description: 'Zero Product',
                    tax: null,
                    price: '0'
                },{
                    description: 'Negative Product',
                    tax: null,
                    price: '-1000'
                }
            ]
        )
        await sFCommonStep.click('Submit');
        await sFCreateOrder.assertCreateCustomBillingOrderSuccess();
        const orderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.customBilling
            },
            null
        );
        await sFOrderDetail.createInvoice(
            {
                isDraftOnly: false,
                paymentInfo: {
                    paymentMethod: 'Bank Transfer',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: true,
                paymentDate: sFCommonStep.currentDate[0]
            }
        );
        // Access order detail
        await sFCommonStep.accessToUrl(orderUrl)
        await sFOrderDetail.assertVoidIsDisable();
    })
})