import { test, login, sFCreateNewStudent, sFContactDetail, sFCreateOrder, sFOrderDetail, sFBilling, sFCommonStep } from '../../../sf-page/test-hook';
import discount from '../../../utils/discount';
import environment from '../../../utils/environment';
import orderType from '../../../utils/order-type';
import price from '../../../utils/price';
import OTM from '../../../utils/product-one-time-material';
import productStatus from '../../../utils/product-status';
import status from '../../../utils/status';
import sF_DateTime from '../../../sf-date-time';
import { assert } from 'console';

test.describe('Void one-time product order', () => {

    test('Void one-time material order with custom_billing_date = null', async ({ page }) => {

        await login.adminSignIn();
        const studentUrl = await sFCreateNewStudent.createStudent('VNO10:1 MANUAL', environment.grade);
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
        const orderDetailUrl = await sFOrderDetail.assertOrderDetailProductList(
            {
                orderStatus: status.submitted,
                orderType: orderType.new
            },
            null
        );

    })
})