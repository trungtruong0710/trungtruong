import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import FP from '../../../utils/product-frequency-package';
import OTM from '../../../utils/product-one-time-material';
import status from '../../../utils/status';

test.describe('Void cancel order successfully within 28 days from cancellation date', () => {

    test('Void cancel one-time material order successfully', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VUO04:1 MANUAL ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createNotPackageOrder(
            {
                location: environment.location, 
                isRecurringProduct: false,
                startDate: null, 
                product: OTM.OTM1_T10,
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Submit');
        const newOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        // Access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'cancel',
                isRemoveDiscount: true,
                discount: null,
                effectiveDate: null,
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Next')
        await sFCommonStep.click('Submit')
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            null
        );
    })

    test('Void cancel frequency package order successfully', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VUO04:2 MANUAL ', environment.grade);
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFCreateOrder.createNotPackageOrder(
            {
                location: environment.location, 
                isRecurringProduct: true,
                startDate: sF_DateTime.startDate_1991Jan01[0], 
                product: FP.FP1_T10,
                isRemoveDiscount: false,
                discountName: null,
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Submit');
        const newOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        // Access student billing
        await sFCommonStep.access_ContactDetail(studentUrl);
        await sFContactDetail.clickBtn_BillingTab();
        await sFBilling.updateProductOld(
            0,
            {
                updateType: 'cancel',
                isRemoveDiscount: null,
                discount: null,
                effectiveDate: sFCommonStep.currentDate[0],
                updatePackage: null,
                numberOfSlot: null
            }
        );
        await sFCommonStep.click('Next')
        await sFCommonStep.click('Submit')
        const updateOrderUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.update
            },
            null
        );
    })
})