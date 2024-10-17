import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../../sf-common-steps";
import sF_ContactDetail from "../../sf-contact-detail";
import sF_CreateEnrollment_Dialog from "../sf-create-enrollment-dialog";
import sF_PaymentDetail from "../sf-paymment-detail";
import { sFCommonStep, sFContactDetail, sFCreateEnrollment, sFCreatePaymentMethod } from "../../../test-hook";
import environment from "../../../../utils/environment";

export default class sF_CreateNewStudent_Dialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE CREATE NEW STUDENT DIALOG =========================================================
     */

    // Get first name
    public get ele_FirstName() {
        const ele_FirstName = this.page.locator('[name="firstName"]')
        if(ele_FirstName != null) {
            return ele_FirstName;
        }else throw new Error('Cannot find ele_FirstName')
    }

    // Get last name
    public get ele_LastName() {
        const ele_LastName = this.page.locator('[name="lastName"]')
        if(ele_LastName != null) {
            return ele_LastName;
        }else throw new Error('Cannot find ele_LastName')
    }

    // Get Available grade
    public get ele_SF_AvailableGrade() {
        const ele_SF_AvailableGrade = this.page.locator('[placeholder="Search Grades..."]')
        if(ele_SF_AvailableGrade != null) {
            return ele_SF_AvailableGrade;
        }else throw new Error('Cannot find ele_SF_AvailableGrade')
    } 

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async fill_FirstName(nameType: string) {

        const ele = this.ele_FirstName
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill(common.firstName + ' ' + nameType);

    }

    public async fill_LastName() {

        const ele = this.ele_LastName
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill(common.lastName);

    }

    public async fill_FirstNameATien(position: number) {

        const ele = this.ele_FirstName
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill(position.toString());

    }

    public async fill_LastNameATien() {

        const ele = this.ele_LastName
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill('tp.test');

    }

    public async select_AvailableGrade(grade: string) {

        const ele = this.ele_SF_AvailableGrade
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await ele?.click();
        await common.wait(200);
        await ele?.fill(grade);
        await common.wait(500);
        const gradeOption = this.page.getByRole('option', { name: grade }).nth(1)
        const isGradeOptionVisible = await gradeOption?.isVisible()
        if (!isGradeOptionVisible) {
            await ele?.click()
            await common.wait(500)
        }
        await gradeOption?.click()

    }

    public async select_AvailableGrade_Old() {

        const ele = this.ele_SF_AvailableGrade
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await ele?.click();
        await common.wait(200);
        await ele?.fill(environment.grade);
        await common.wait(500);
        const gradeOption = this.page.getByRole('option', { name: environment.grade }).nth(1)
        const isGradeOptionVisible = await gradeOption?.isVisible()
        if (!isGradeOptionVisible) {
            await ele?.click()
            await common.wait(500)
        }
        await gradeOption?.click()

    }

    /**
     ================================================= CREATE STUDENT =========================================================
     */

     public async createStudentWithPaymentDetailOnly(nameType: string, grade: string) {

        const common = new sF_CommonStep(this.page)
        await common.access_CreateNewStudentContactUrl();
        await this.fill_FirstName(nameType);
        await this.fill_LastName();
        await this.select_AvailableGrade(grade);
        // input email
        await this.page.locator('[name="Email"]').click()
        await this.page.locator('[name="Email"]').fill('khoChiuVoCung' + sFCommonStep.randomNumber + '@metmoi.com')
        // select studetn as a Payer
        await this.page.locator('[name="MANAERP__Use_Student_as_Payer__c"]').click()
        // select default payment method
        await this.page.locator('[placeholder="Search Payment Method Configurations..."]').click()
        await this.page.locator('[placeholder="Search Payment Method Configurations..."]').fill('GMO Convenience Store')
        const defaultPaymentMethod = this.page.getByRole('option', { name: 'GMO Convenience Store', exact: true })
        const isDefaultPaymetnMethodVisible = await defaultPaymentMethod?.isVisible()
        if (!isDefaultPaymetnMethodVisible) {
            await this.page.locator('[placeholder="Search Payment Method Configurations..."]')?.click
            await common.wait(500)
        }
        await defaultPaymentMethod?.click()
        await common.click('Save');
        await sFContactDetail.clickBtn_DetailsTab();
        const studentUrl = common.getStudentUrl()
        // await sFContactDetail.access_PaymentDetail();
        // await sFCreatePaymentMethod.Edit_PaymentMethod();
        // await sFContactDetail.assert_ContactSyncLogHasRecord();
        return studentUrl

    }
    
    public async createStudentWithPaymentDetailOnly_Old(nameType: string) {

        const common = new sF_CommonStep(this.page)
        await common.access_CreateNewStudentContactUrl();
        await this.fill_FirstName(nameType);
        await this.fill_LastName();
        await this.select_AvailableGrade_Old();
        await common.click('Save');
        await sFContactDetail.clickBtn_DetailsTab();
        const studentUrl = common.getStudentUrl()
        await sFContactDetail.access_PaymentDetail();
        await sFCreatePaymentMethod.Edit_PaymentMethod();
        // await sFContactDetail.assert_ContactSyncLogHasRecord();
        return studentUrl

    }

    public async createStudent(nameType: string, grade: string) {

        const common = new sF_CommonStep(this.page)
        await common.access_CreateNewStudentContactUrl();
        await this.fill_FirstName(nameType);
        await this.fill_LastName();
        await this.select_AvailableGrade(grade);
        // input email
        await this.page.locator('[name="Email"]').click()
        await this.page.locator('[name="Email"]').fill('khoChiuVoCung' + sFCommonStep.randomNumber + '@metmoi.com')
        // select studetn as a Payer
        await this.page.locator('[name="MANAERP__Use_Student_as_Payer__c"]').click()
        // select default payment method
        await this.page.locator('[placeholder="Search Payment Method Configurations..."]').click()
        // await this.page.locator('[placeholder="Search Payment Method Configurations..."]').fill('GMO Convenience Store')
        // const defaultPaymentMethod = this.page.getByRole('option', { name: 'GMO Convenience Store', exact: true })
        await this.page.locator('[placeholder="Search Payment Method Configurations..."]').fill('GMO')
        const defaultPaymentMethod = this.page.getByRole('option', { name: 'GMO', exact: true })
        const isDefaultPaymetnMethodVisible = await defaultPaymentMethod?.isVisible()
        if (!isDefaultPaymetnMethodVisible) {
            await this.page.locator('[placeholder="Search Payment Method Configurations..."]')?.click
            await common.wait(500)
        }
        await defaultPaymentMethod?.click()
        await common.click('Save');
        await sFContactDetail.clickBtn_CreateEnrollment();
        await sFCreateEnrollment.select_PotentialStatus();
        await sFCreateEnrollment.select_Location();
        await sFCreateEnrollment.click_SaveEnrollmentStatus();
        await sFContactDetail.clickBtn_DetailsTab();
        const studentUrl = common.getStudentUrl()
        // await sFContactDetail.access_PaymentDetail();
        // await sFCreatePaymentMethod.Edit_PaymentMethod();
        // await sFContactDetail.assert_ContactSyncLogHasRecord();
        return studentUrl

    }

    public async create_PotentialStudent(nameType: string) {

        const common = new sF_CommonStep(this.page)
        await common.access_CreateNewStudentContactUrl();
        await this.fill_FirstName(nameType);
        await this.fill_LastName();
        await this.select_AvailableGrade_Old();
        // input email
        await this.page.locator('[name="Email"]').click()
        await this.page.locator('[name="Email"]').fill('khoChiuVoCung' + sFCommonStep.randomNumber + '@metmoi.com')
        // select studetn as a Payer
        await this.page.locator('[name="MANAERP__Use_Student_as_Payer__c"]').click()
        // select default payment method
        await this.page.locator('[placeholder="Search Payment Method Configurations..."]').click()
        await this.page.locator('[placeholder="Search Payment Method Configurations..."]').fill('GMO Convenience Store')
        const defaultPaymentMethod = this.page.getByRole('option', { name: 'GMO Convenience Store', exact: true })
        const isDefaultPaymetnMethodVisible = await defaultPaymentMethod?.isVisible()
        if (!isDefaultPaymetnMethodVisible) {
            await this.page.locator('[placeholder="Search Payment Method Configurations..."]')?.click
            await common.wait(500)
        }
        await defaultPaymentMethod?.click()
        await common.click('Save');
        await sFContactDetail.clickBtn_CreateEnrollment();
        await sFCreateEnrollment.select_PotentialStatus();
        await sFCreateEnrollment.select_Location();
        await sFCreateEnrollment.click_SaveEnrollmentStatus();
        await sFContactDetail.clickBtn_DetailsTab();
        const studentUrl = common.getStudentUrl()
        // await sFContactDetail.access_PaymentDetail();
        // await sFCreatePaymentMethod.Edit_PaymentMethod();
        // await sFContactDetail.assert_ContactSyncLogHasRecord();
        return studentUrl

    }

    public async createStudentWithPaymentDetailOnlyATien(position: number, grade: string) {

        for (let i = position; i < 119; i++) {
        
            await sFCommonStep.access_CreateNewStudentContactUrl();
            await this.fill_FirstNameATien(i);
            await this.fill_LastNameATien();
            await this.select_AvailableGrade(grade);
            await sFCommonStep.click('Save');
            await sFContactDetail.clickBtn_DetailsTab();
            // const studentUrl = sFCommonStep.getStudentUrl()
            await sFContactDetail.access_PaymentDetail();
            await sFCreatePaymentMethod.Edit_PaymentMethodATien();
            // await sFContactDetail.assert_ContactSyncLogHasRecord();
            // return studentUrl
        }
   }

}