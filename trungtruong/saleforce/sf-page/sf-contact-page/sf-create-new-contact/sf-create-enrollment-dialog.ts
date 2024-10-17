import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import environment from "../../../utils/environment";

export default class sF_CreateEnrollment_Dialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE CREATE NEW STUDENT DIALOG =========================================================
     */

    // Get create enrollment iframe
    public get iFrame_CreateEnrollment() {
        const iFrame_CreateEnrollment = this.page.frameLocator('iframe[title="accessibility title"]')
        if(iFrame_CreateEnrollment != null) {
            return iFrame_CreateEnrollment;
        }else throw new Error('Cannot find iFrame_CreateEnrollment')
    }

    // Get create enrollment iframe enrollment status
    public get iFrame_CreateEnrollment_EnrollmentStatus() {
        const iFrame_CreateEnrollment_EnrollmentStatus = this.page.frameLocator('iframe[title="accessibility title"]').locator('[name="Enrollment_Status_Picklist"]')
        if(iFrame_CreateEnrollment_EnrollmentStatus != null) {
            return iFrame_CreateEnrollment_EnrollmentStatus;
        }else throw new Error('Cannot find iFrame_CreateEnrollment_EnrollmentStatus')
    }
    
    // Get create enrollment iframe location
    public get iFrame_CreateEnrollment_Location() {
        const iFrame_CreateEnrollment_Location = this.page.frameLocator('iframe[title="accessibility title"]').locator('[placeholder="Select Location"]')
        if(iFrame_CreateEnrollment_Location != null) {
            return iFrame_CreateEnrollment_Location;
        }else throw new Error('Cannot find iFrame_CreateEnrollment_Location')
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async select_PotentialStatus() {

        const ele = this.iFrame_CreateEnrollment_EnrollmentStatus
        await ele?.selectOption('Choice_Temporary'); //Enrollment_Status_Choice.Potential

    }

    public async select_Location() {

        const ele = this.iFrame_CreateEnrollment_Location
        const iFrame_ele = this.iFrame_CreateEnrollment
        const common = new sF_CommonStep(this.page)
        await ele?.click()
        await ele?.fill(environment.location)
        await common.wait(500);
        const locationRegex = new RegExp(`^${environment.location}$`);
        await iFrame_ele?.locator('span').filter({ hasText: locationRegex }).click();

    }

    public async click_SaveEnrollmentStatus() {

        const iFrame_ele = this.iFrame_CreateEnrollment
        await iFrame_ele?.getByRole('button', { name: 'Save' }).click();

    }
}