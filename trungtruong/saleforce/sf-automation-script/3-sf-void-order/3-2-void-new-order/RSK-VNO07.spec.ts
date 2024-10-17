import { test, login, sFCreateNewStudent, sFCreateOrder, sFOrderDetail, sFCommonStep } from '../../../sf-page/test-hook';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import status from '../../../utils/status';

test.describe('Cannot void recurring product order incase invoice order successfully and payment status is sucessful (disable_prorating_flag = false)', () => {

    test('Cannot void order with payment status = Successful (Cash)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO07:1 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'recurring',
                    product: FP.FP7_T10,
                    startDate: sFCommonStep.date29DaysBefore[0],
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1800, 
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen900]
            }
        );
        await sFCommonStep.click('Submit');
        const orderDetailUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.createInvoice(
            {
                isDraftOnly: false,
                paymentInfo: {
                    paymentMethod: 'Cash',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: true,
                paymentDate: sFCommonStep.nextDate[0]
            }
        );
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.assertVoidIsDisable();

    })

    test('Void order with payment status = Successful (Bank Transfer)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO07:2 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createOrder(
            {
                location: environment.location,
                productInfo: {
                    productType: 'recurring',
                    product: FP.FP7_T10,
                    startDate: sFCommonStep.date29DaysBefore[0],
                    packageInfo: null,
                    numberOfSlot: null,
                },
                discountInfo: null,
                isShowBilledAtOrder: true,
                totalPrice: price.Yen1800, 
                isShowUpcomingBilling: true,
                upcomingBillingPrice: [price.Yen900]
            }
        );
        await sFCommonStep.click('Submit');
        const orderDetailUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
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
                paymentDate: sFCommonStep.nextDate[0]
            }
        );
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.assertVoidIsDisable();

    })

})