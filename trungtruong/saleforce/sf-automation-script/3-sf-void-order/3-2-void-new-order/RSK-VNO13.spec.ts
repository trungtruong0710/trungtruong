import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import billingPeriod from '../../../utils/billing-period';
import discount from '../../../utils/discount';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import FP from '../../../utils/product-frequency-package';
import OTM from '../../../utils/product-one-time-material';
import RM from '../../../utils/product-recurring-material';
import productStatus from '../../../utils/product-status';
import status from '../../../utils/status';

test.describe('Cannot void order if at least 1 product has start date > 28 days', () => {

    test('Order with recurring product and one-time material product with custom billing date = null (payment status = successful)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO13:1 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createMultipleProductsOrder(
            {
                numberOfProduct: 2,
                location: environment.location,
                listProductInfor:
                    [
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: FP.FP7_T10,
                                startDate: sFCommonStep.date29DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                        {
                            productInfo: {
                                productType: 'one-time',
                                product: OTM.OTM1_T10,
                                startDate: null,
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                    ],
                isShowBilledAtOrder: true,
                totalPrice: price.Yen2700, 
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
                    paymentMethod: 'Cash- 現金',
                    dueDate: sFCommonStep.nextDate[0],
                    expiryDate: sFCommonStep.nextDate[0]
                },
                isCancelPayment: false,
                isRequestPayment: false,
                isApprovePayment: true,
                paymentDate: null
            }
        );
        await sFCommonStep.accessToUrl(orderDetailUrl);
        await sFOrderDetail.assertVoidIsDisable();

    })

    test.only('Order with 2 recurring products (payment status = pending)', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('RSK-VNO13:2 ', environment.gradeRSK);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createMultipleProductsOrder(
            {
                numberOfProduct: 2,
                location: environment.location,
                listProductInfor:
                    [
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: FP.FP7_T10,
                                startDate: sFCommonStep.date29DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                        {
                            productInfo: {
                                productType: 'recurring',
                                product: RM.RM3_T10,
                                startDate: sFCommonStep.date28DaysBefore[0],
                            },
                            discountInfo: {
                                isRemoveDiscount: false,
                                discountName: null,
                            }
                        },
                    ],
                isShowBilledAtOrder: true,
                totalPrice: price.Yen3600, 
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
                    paymentMethod: 'Cash- 現金',
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

})