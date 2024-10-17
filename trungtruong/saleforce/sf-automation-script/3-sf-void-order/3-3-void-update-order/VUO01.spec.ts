import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import OTM from '../../../utils/product-one-time-material';
import status from '../../../utils/status';

test.describe('Cannot void update one-time material order', () => {

    test('Cannot void update one-time material order', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VUO01:1 ', environment.grade);
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
                updateType: 'update',
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

    test('Cannot void cancel update one-time material order with cancellation date is 29 days before', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VUO01:2 MANUAL ', environment.grade);
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
})