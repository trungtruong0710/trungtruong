import sF_DateTime from '../../../sf-date-time';
import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import FP from '../../../utils/product-frequency-package';
import OTM from '../../../utils/product-one-time-material';
import status from '../../../utils/status';

test.describe('Cannot void update frequency package order', () => {

    test('Cannot void update frequency package order', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VUO02:1 ', environment.grade);
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
                updateType: 'update',
                isRemoveDiscount: true,
                discount: null,
                effectiveDate: sFCommonStep.currentDate[0],
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
        await sFOrderDetail.assertVoidIsDisable();
        await sFCommonStep.accessToUrl(newOrderUrl);
        await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );
        await sFOrderDetail.assertVoidIsDisable();
    })

    test('Cannot void update cancel frequency package order with cancellation date is 29 days before', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VUO02:2 MANUAL ', environment.grade);
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
                isRemoveDiscount: false,
                discount: null,
                effectiveDate: sFCommonStep.currentDate[0],
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
})