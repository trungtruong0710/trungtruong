import { test, login, sFCreateNewStudent, sFCreateOrder, sFOrderDetail, sFCommonStep } from '../../../sf-page/test-hook';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import status from '../../../utils/status';

test.describe('Cannot void recurring product order incase invoice order successfully and payment status is NOT sucessful', () => {

    test('Cannot void order with payment status = Pending', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO06:1 ', environment.gradeRSK);
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
                isApprovePayment: false,
                paymentDate: null
            }
        );
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.assertVoidIsDisable();

    })

    test('Cannot void order with payment status = Canceled', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO06:2 ', environment.gradeRSK);
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
                isCancelPayment: true,
                isRequestPayment: false,
                isApprovePayment: false,
                paymentDate: null
            }
        );
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.assertVoidIsDisable();

    })

    // https://manabie.slack.com/archives/D03L3RB68DC/p1726635561322639
    test.skip('Cannot void order with payment status = Queued', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO06:3 ', environment.gradeRSK);
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
                    paymentMethod: 'GMO Credit Card',
                    dueDate: null,
                    expiryDate: null
                },
                isCancelPayment: false,
                isRequestPayment: true,
                isApprovePayment: false,
                paymentDate: null
            }
        );
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.assertVoidIsDisable();

    })

})