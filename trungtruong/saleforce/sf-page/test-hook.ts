import { test as base } from '@playwright/test';
import cmsLoginPage from '../../saleforce/sf-login-page'
// create student
import sF_CreateNewStudent_Dialog from '../sf-page/sf-contact-page/sf-create-new-contact/sf-create-new-student-contact/sf-create-new-student-dialog';
import sF_ContactDetail from '../sf-page/sf-contact-page/sf-contact-detail';
import sF_CreateEnrollment_Dialog from '../sf-page/sf-contact-page/sf-create-new-contact/sf-create-enrollment-dialog';
import sF_PaymentDetail from './sf-contact-page/sf-create-new-contact/sf-paymment-detail';
import sF_Applications from './sf-contact-page/sf-contact-applications';
// create order
import sF_CreateOrder_Dialog from '../sf-page/sf-contact-page/sf-create-order-dialog/sf-create-order-dialog';
import sF_CreateCustomBilling_Dialog from '../sf-page/sf-contact-page/sf-create-custom-billing-dialog/sf-create-custom-billing-dialog'
import sF_CreateOrder_OTM from '../sf-page/sf-contact-page/sf-create-order-dialog/sf-create-order-one-time-material';
import sF_CreateOrder_OTF from '../sf-page/sf-contact-page/sf-create-order-dialog/sf-create-order-one-time-fee';
import sF_CreateOrder_RM from '../sf-page/sf-contact-page/sf-create-order-dialog/sf-create-order-recurring-material';
import sF_CreateOrder_FP from '../sf-page/sf-contact-page/sf-create-order-dialog/sf-create-order-frequency-package';
import sF_AssertBillAtOrder_BillItem from "../sf-page/sf-contact-page/sf-create-order-dialog/sf-assert-billed-at-order-bill-item";
import sF_AssertBillAtOrder_Amount from "../sf-page/sf-contact-page/sf-create-order-dialog/sf-assert-billed-at-order-amount";
import sF_AssertUcomingBilling from "../sf-page/sf-contact-page/sf-create-order-dialog/sf-assert-upcoming-billing";
// update
import sF_AssertBillAtOrderAdjust_BillItem from './sf-update-order-dialog/sf-assert-adjustment-billed-at-order-bill-item';
import sF_AssertBillAtOrderAdjust_Amount from './sf-update-order-dialog/sf-assert-adjustment-billed-at-order-amount';
import sF_AssertAdjustmentUcomingBilling from "./sf-update-order-dialog/sf-assert-adjustment-upcoming-billing";
// order detail
import sF_OrderDetail from "../sf-page/sf-order-detail-after-submit/sf-order-detail";
// billing
import sF_Billing from "../sf-page/sf-contact-page/sf-contact-billing-tab";
import sF_CommonStep from '../sf-common-steps';
import environment from '../utils/environment';
import { logResultsToCSV } from '../sf-page/logger';
import * as path from 'path';

let login: cmsLoginPage;
let sFCreateNewStudent: sF_CreateNewStudent_Dialog;
let sFContactDetail: sF_ContactDetail;
let sFCreateEnrollment: sF_CreateEnrollment_Dialog;
let sFCreatePaymentMethod: sF_PaymentDetail
let sFApplications: sF_Applications
let sFCreateOrder: sF_CreateOrder_Dialog;
let sFCreateCustomBilling: sF_CreateCustomBilling_Dialog;
let sFCreateOTM: sF_CreateOrder_OTM;
let sFCreateOTF: sF_CreateOrder_OTF;
let sFCreateRM: sF_CreateOrder_RM;
let sFCreateFP: sF_CreateOrder_FP;
let sFAssertBODBillItem: sF_AssertBillAtOrder_BillItem;
let sFAssertBODAmount: sF_AssertBillAtOrder_Amount;
let sFAssertUpcomingBilling: sF_AssertUcomingBilling;
// update
let sFAssertBODAdjustBillItem: sF_AssertBillAtOrderAdjust_BillItem;
let sFAssertBODAdjustAmount: sF_AssertBillAtOrderAdjust_Amount;
let sFAssertAdjustmentUpcomingBilling: sF_AssertAdjustmentUcomingBilling;
let sFOrderDetail: sF_OrderDetail;
let sFBilling: sF_Billing;
let sFCommonStep: sF_CommonStep;

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto(environment.sFUrl);
    login = new cmsLoginPage(page);
    sFCreateNewStudent = new sF_CreateNewStudent_Dialog(page);
    sFContactDetail = new sF_ContactDetail(page);
    sFCreateEnrollment = new sF_CreateEnrollment_Dialog(page);
    sFCreatePaymentMethod = new sF_PaymentDetail(page);
    sFApplications = new sF_Applications(page);
    sFCreateOrder = new sF_CreateOrder_Dialog(page);
    sFCreateCustomBilling = new sF_CreateCustomBilling_Dialog(page);
    sFCreateOTM = new sF_CreateOrder_OTM(page);
    sFCreateOTF = new sF_CreateOrder_OTF(page);
    sFCreateRM = new sF_CreateOrder_RM(page);
    sFCreateFP = new sF_CreateOrder_FP(page);
    sFAssertBODBillItem = new sF_AssertBillAtOrder_BillItem(page);
    sFAssertBODAmount = new sF_AssertBillAtOrder_Amount(page);
    sFAssertUpcomingBilling = new sF_AssertUcomingBilling(page);
    sFAssertBODAdjustBillItem = new sF_AssertBillAtOrderAdjust_BillItem(page);
    sFAssertBODAdjustAmount = new sF_AssertBillAtOrderAdjust_Amount(page);
    sFAssertAdjustmentUpcomingBilling = new sF_AssertAdjustmentUcomingBilling(page);
    sFOrderDetail = new sF_OrderDetail(page);
    sFBilling = new sF_Billing(page);
    sFCommonStep = new sF_CommonStep(page);
    await use(page);
  },
});

test.afterEach(async ({ page }, testInfo) => {
  const status = testInfo.status === 'passed' ? 'Passed' : 'Failed';
  const fileName = path.basename(testInfo.file);
  const errorMessage = testInfo.error ? testInfo.error.message : '';
  logResultsToCSV(fileName, testInfo.title, status, errorMessage);
});

export { 
  test,
  login,
  sFCreateNewStudent,
  sFContactDetail,
  sFCreateEnrollment,
  sFCreatePaymentMethod,
  sFApplications,
  sFCreateOrder,
  sFCreateCustomBilling,
  sFCreateOTM,
  sFCreateOTF,
  sFCreateRM,
  sFCreateFP,
  sFAssertBODBillItem,
  sFAssertBODAmount,
  sFAssertUpcomingBilling,
  sFAssertBODAdjustBillItem,
  sFAssertBODAdjustAmount,
  sFAssertAdjustmentUpcomingBilling,
  sFCommonStep,
  sFOrderDetail,
  sFBilling
 };
