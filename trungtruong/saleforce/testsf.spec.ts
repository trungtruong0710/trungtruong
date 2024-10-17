import { test, chromium } from "@playwright/test";
import cmsLoginPage from "./sf-login-page";
import sF_CommonStep from "./sf-common-steps";
// product offering
import sF_GeneralInfo from "./sf-page/sf-create-product-page/sf-general-info";
import sF_ProductDetail from "./sf-page/sf-create-product-page/sf-product-detail";
import sF_ProductOffering from "./sf-page/sf-product-offering-page/sf-product-offering";
import sF_AddOrUpdatePrice_Dialog from "./sf-page/sf-product-offering-page/sf-add-update-product-price-dialog/sf-add-update-product-price-dialog";
import sF_AddAssociateCourse_Dialog from "./sf-page/sf-product-offering-page/sf-add-update-product-price-dialog/sf-add-associate-course-dialog";
import environment from "./utils/environment";

test.describe('Create frequency package product', () => {

    let login: cmsLoginPage;
    let sFCommonStep: sF_CommonStep;
    let sFGeneralInfo: sF_GeneralInfo;
    let sFProductDetail: sF_ProductDetail;
    let sFProductOffering: sF_ProductOffering;
    let sFAddOrUpdatePriceDialog: sF_AddOrUpdatePrice_Dialog;
    let sFAddAssociateCourseDialog: sF_AddAssociateCourse_Dialog;

    test.beforeEach(async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext({ignoreHTTPSErrors: true });
        const page = await context.newPage();
        await page.goto(environment.sFUrl);
        login = new cmsLoginPage(page);
        sFCommonStep = new sF_CommonStep(page);
        sFGeneralInfo = new sF_GeneralInfo(page);
        sFProductDetail = new sF_ProductDetail(page);
        sFProductOffering = new sF_ProductOffering(page);
        sFAddOrUpdatePriceDialog = new sF_AddOrUpdatePrice_Dialog(page);
        sFAddAssociateCourseDialog = new sF_AddAssociateCourse_Dialog(page);
    })

    test.afterEach(async () => {
        const browser = await chromium.launch();
        await browser.close();
    })

    test('Create frequency package product', async () => {
        await login.adminSignIn();
        await sFCommonStep.access_ProductOffering_Url();
        await sFGeneralInfo.fill_FP_ProductName();
        await sFGeneralInfo.select_ProductType_Package();
        await sFGeneralInfo.fill_AvailableFrom_1991Jan01();
        await sFGeneralInfo.fill_AvailableUntil_2140Dec31();
        await sFGeneralInfo.select_AvailableAccount_Trung01();
        await sFGeneralInfo.select_AvailableGrade_Old();
        await sFGeneralInfo.select_AcademicYear_2023();
        await sFProductDetail.select_PackageType_FP();
        await sFProductDetail.select_BillingMaster_AutomationPayment();
        await sFProductDetail.fill_MaxSlot_1();
        await sFProductDetail.select_Tax_10Percent_Array0();
        await sFProductDetail.select_Discount_10Percent();
        await sFCommonStep.click('Submit');
        await sFProductOffering.clickBtn_PO_AddAssociateCourse();
        await sFAddAssociateCourseDialog.assert_AddAssociateCourse_DialogIsOpen();
        await sFAddAssociateCourseDialog.select_AcademicYear_2023();
        await sFAddAssociateCourseDialog.fill_CourseWeight_1();
        await sFAddAssociateCourseDialog.fill_MaxSlotPerCourse_1();
        await sFAddAssociateCourseDialog.fill_CourseOffering_Automation_Payment_Course_1W_CM1_CS1();
        await sFCommonStep.click_Save();
        await sFProductOffering.clickBtn_PO_AddOrUpdatePrice();
        await sFAddOrUpdatePriceDialog.select_PriceType_Enrolled();
        await sFAddOrUpdatePriceDialog.fill_MasterPriceAmount5000();
        await sFCommonStep.click('Submit');
    })
})