import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config';
import { authToken } from '../token';
import { v4 as uuidv4 } from 'uuid';
import { waitForDebugger } from 'inspector';

test.describe('API Testing', () => {
  test.beforeEach(async ({ request }) => {
    // Gen UUID for orderId
    const orderId = uuidv4();
    test.info().annotations.push({ type: 'orderId', description: orderId });
  });

  test('Create new order', async ({ request }) => {
    const orderId = test.info().annotations.find(a => a.type === 'orderId')?.description;
    const response = await request.post(`${BASE_URL}/create_external_order`, {
    headers: {
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json',
        },
      data: {
        studentId: "003J20000022396IAA",
        locationId: "01HSAYP1JJBVT5DEKY2H3WYYXW",
        orderComment: "Sói Con Cô Độc tạo bằng API",
        orderType: "ORDER_TYPE_NEW",
        orderId: orderId,
        orderItems: [
          {
            productId: "a0rJ2000000btzWIAQ",
            startDate: "2021-01-01T17:00:00Z",
            orderItemCourse: [],
            billItems: [
              {
                finalPrice: 1333,
                adjustmentPrice: 0,
                price: 1333,
                periodId: "a095h00000jZ5yTAAS",
                startDate: "2020-12-31T17:00:00Z",
                endDate: "2050-12-31T16:59:59Z",
                billingDate: "2020-12-30T17:00:00Z",
                ratioNumerator: 2,
                ratioDenominator: 3,
                taxInfo: {
                  taxId: "a13J2000000fy2HIAQ",
                  taxPercentage: 10,
                  taxCategory: "TAX_CATEGORY_INCLUSIVE",
                  taxAmount: 121.18181610107422
                }
              },
              {
                finalPrice: 3000,
                adjustmentPrice: 0,
                price: 3000,
                periodId: "a095h00000jZ5yUAAS",
                startDate: "2050-12-31T17:00:00Z",
                endDate: "2080-12-31T16:59:59Z",
                billingDate: "2050-12-30T17:00:00Z",
                taxInfo: {
                  taxId: "a13J2000000fy2HIAQ",
                  taxPercentage: 10,
                  taxCategory: "TAX_CATEGORY_INCLUSIVE",
                  taxAmount: 272.7272644042969
                }
              },
              {
                finalPrice: 4000,
                adjustmentPrice: 0,
                price: 4000,
                periodId: "a095h00000jZ5yiAAC",
                startDate: "2080-12-31T17:00:00Z",
                endDate: "2110-12-31T16:59:59Z",
                billingDate: "2080-12-30T17:00:00Z",
                taxInfo: {
                  taxId: "a13J2000000fy2HIAQ",
                  taxPercentage: 10,
                  taxCategory: "TAX_CATEGORY_INCLUSIVE",
                  taxAmount: 363.6363525390625
                }
              },
              {
                finalPrice: 5000,
                adjustmentPrice: 0,
                price: 5000,
                periodId: "a095h00000jZ5yFAAS",
                startDate: "2110-12-31T17:00:00Z",
                endDate: "2140-12-31T16:59:59Z",
                billingDate: "2110-12-30T17:00:00Z",
                taxInfo: {
                  taxId: "a13J2000000fy2HIAQ",
                  taxPercentage: 10,
                  taxCategory: "TAX_CATEGORY_INCLUSIVE",
                  taxAmount: 454.5454406738281
                }
              }
            ],
            productAssociations: [],
            studentProductVersionNumber: 0,
            isCancelItem: false,
            productName: "E2E-PAYMENT-RM1-10%"
          }
        ],
        isDraftOrder: false,
        timezone: 7,
        leavingReasonIds: []
      }
    });

    // expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody)
    console.log(orderId)
  });
});
