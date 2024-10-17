import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../sf-common-steps";
import { sFCommonStep } from "../test-hook";

export default class sF_ContactDetail {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE PRODUCT OFFERING =========================================================
     */

    // Get contact sync log
    public get ele_ContactSyncLog() {
        const ele_ContactSyncLog = this.page.locator('[aria-label="Contact Sync Logs"] [title="Contact Sync Logs"]')
        if(ele_ContactSyncLog != null) {
            return ele_ContactSyncLog;
        }else throw new Error('Cannot find ele_ContactSyncLog')
    } 

    // Get Show more action btn
    public get ele_C_ShowMoreAction() {
        const ele_C_ShowMoreAction = this.page.getByRole('button', { name: 'Show more actions' })
        if(ele_C_ShowMoreAction != null) {
            return ele_C_ShowMoreAction;
        }else throw new Error('Cannot find ele_C_ShowMoreAction')
    }

    // Get create custom billing btn
    public get ele_C_CreateCustomBilling() {
        const ele_C_CreateCustomBilling = this.page.getByRole('menuitem', { name: 'Create Custom Billing' })
        if(ele_C_CreateCustomBilling != null) {
            return ele_C_CreateCustomBilling;
        }else throw new Error('Cannot find ele_C_CreateCustomBilling')
    }

    // Get create new order btn
    public get ele_C_CreateOrder() {
        const ele_C_CreateOrder = this.page.locator('[name="Contact.MANAERP__Create_New_Order_Aura"]')
        if(ele_C_CreateOrder != null) {
            return ele_C_CreateOrder;
        }else throw new Error('Cannot find ele_C_CreateOrder')
    }

    // Get Detail tab
    public get ele_DetailsTab() {
        const ele_DetailsTab = this.page.getByRole('tab', { name: 'Details' })
        if(ele_DetailsTab != null) {
            return ele_DetailsTab;
        }else throw new Error('Cannot find ele_DetailsTab')
    }

    // Get payment detail tab
    public get ele_PaymentDetailTab() {
        const ele_PaymentDetailTab = this.page.getByRole('tab', { name: 'Payment Detail' })
        if(ele_PaymentDetailTab != null) {
            return ele_PaymentDetailTab;
        }else throw new Error('Cannot find ele_PaymentDetailTab')
    }

    // Get create enrollment btn
    public get ele_Enrollment() {
        const ele_Enrollment = this.page.getByRole('button', { name: 'Create Temporary Enrollment', exact: true })
        if(ele_Enrollment != null) {
            return ele_Enrollment;
        }else throw new Error('Cannot find ele_Enrollment')
    }

    // Get create enrollment btn
    public get ele_PaymentDetailID() {
        const ele_PaymentDetailID = this.page.locator('[data-label="Payment Detail Number"] [data-label="Payment Detail Number"]')
        if(ele_PaymentDetailID != null) {
            return ele_PaymentDetailID;
        }else throw new Error('Cannot find ele_PaymentDetailID')
    }

    // Get More
    public get ele_More() {
        const ele_More = this.page.getByRole('button', { name: 'More Tabs', exact: true })
        if(ele_More != null) {
            return ele_More;
        }else throw new Error('Cannot find ele_More')
    }

    // Get student billing
    public get ele_BillingTab() {
        const ele_BillingTab = this.page.getByRole('tab', { name: 'Billing' , exact: true })
        if(ele_BillingTab != null) {
            return ele_BillingTab;
        }else throw new Error('Cannot find ele_BillingTab')
    }
    
    // Get application
    public get ele_ApplicationsTab() {
        const ele_ApplicationsTab = this.page.getByRole('menuitem', { name: 'Applications' })
        if(ele_ApplicationsTab != null) {
            return ele_ApplicationsTab;
        }else throw new Error('Cannot find ele_ApplicationsTab')
    }
    
    // Get active location
    public ele_ActiveEnrollment_Location(position: number) {
        const ele_ActiveEnrollment_Location = this.page.locator('[data-col-key-value="MANAERP__Location__r.Name-forceLookup-1"] [data-label="Location"]').nth(position)
        if(ele_ActiveEnrollment_Location != null) {
            return ele_ActiveEnrollment_Location;
        }else throw new Error('Cannot find ele_ActiveEnrollment_Location ' + position)
    }
    
    // Get active enrollment status
    public ele_ActiveEnrollment_EnrollmentStatus(position: number) {
        const ele_ActiveEnrollment_EnrollmentStatus = this.page.locator('[aria-label="Active Enrollments"] [data-label="Enrollment Status"] [data-label="Enrollment Status"]').nth(position)
        if(ele_ActiveEnrollment_EnrollmentStatus != null) {
            return ele_ActiveEnrollment_EnrollmentStatus;
        }else throw new Error('Cannot find ele_ActiveEnrollment_EnrollmentStatus ' + position)
    }
    
    // Get active enrollment start date
    public ele_ActiveEnrollment_EnrollmentStartDate(position: number) {
        const ele_ActiveEnrollment_EnrollmentStartDate = this.page.locator('[aria-label="Active Enrollments"] [data-label="Enrollment Start Date"] [data-label="Enrollment Start Date"]').nth(position)
        if(ele_ActiveEnrollment_EnrollmentStartDate != null) {
            return ele_ActiveEnrollment_EnrollmentStartDate;
        }else throw new Error('Cannot find ele_ActiveEnrollment_EnrollmentStartDate ' + position)
    }
    
    // Get end enrollment start date
    public ele_ActiveEnrollment_EnrollmentEndDate(position: number) {
        const ele_ActiveEnrollment_EnrollmentEndDate = this.page.locator('[aria-label="Active Enrollments"] [data-label="Enrollment End Date"] [data-label="Enrollment End Date"]').nth(position)
        if(ele_ActiveEnrollment_EnrollmentEndDate != null) {
            return ele_ActiveEnrollment_EnrollmentEndDate;
        }else throw new Error('Cannot find ele_ActiveEnrollment_EnrollmentEndDate ' + position)
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

     public async assert_ContactSyncLogHasRecord() {

        const ele = this.ele_ContactSyncLog
        const eleString = await ele.innerText()
        try {
            expect(eleString).not.toContain('(0)')            
        } catch(error) {
            throw new Error(`Contact is not sync to BO, got '${eleString}'`)
        }

    }

    public async clickBtn_ShowMoreAction() {

        const ele = this.ele_C_ShowMoreAction
        const common = new sF_CommonStep(this.page)
        await common.wait(500);
        await ele?.click();

    }

    public async clickBtn_CreateCustomBilling() {

        const ele = this.ele_C_CreateCustomBilling
        const common = new sF_CommonStep(this.page)
        await this.clickBtn_ShowMoreAction();
        await common.wait(200);
        await ele?.click();

    }

    public async clickBtn_CreateOrder() {

        const ele = this.ele_C_CreateOrder
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await ele?.click();

    }

    public async clickBtn_DetailsTab() {

        const ele = this.ele_DetailsTab
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await ele?.click();

    }

    public async clickBtn_CreateEnrollment() {

        const ele = this.ele_Enrollment
        const common = new sF_CommonStep(this.page)
        await this.clickBtn_DetailsTab()
        await common.press_End()
        await ele?.click();

    }

    public async access_PaymentDetail() {

        const elePaymentDetailTab = this.ele_PaymentDetailTab
        const elePaymentDetailID= this.ele_PaymentDetailID
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await elePaymentDetailTab?.click();
        const StringPaymentDetailID = await elePaymentDetailID.innerText()
        const start = StringPaymentDetailID.indexOf("Open") + "Open".length;
        const end = StringPaymentDetailID.indexOf("Preview");
        const StringPaymentDetailID_Extract = StringPaymentDetailID.substring(start, end).trim();
        console.log(StringPaymentDetailID_Extract);
        await this.page.getByRole('link', { name: StringPaymentDetailID_Extract }).click();
    }

    public async clickBtn_BillingTab() {

        const ele = this.ele_BillingTab
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await ele?.click();
        await common.wait(2000);

    }
    
    public async clickBtn_ApplicationsTab() {

        const eleMore = this.ele_More
        const eleApplication = this.ele_ApplicationsTab
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleMore?.click();
        await common.wait(200);
        await eleApplication?.click();
        await common.wait(2000);

    }
    

    public async assert_ActiveEnrollment(activeEnrollmentRows: {
        location: string, enrollmentStatus: string, startDate: string[], isEndDateShow: boolean, endDate: string[]
    }[]) {
        
        // focus and move to table
        await this.clickBtn_DetailsTab()
        await sFCommonStep.press_End()

        // for (let i = 0; i < activeEnrollmentRows.length; i++) {
        //     const { location, enrollmentStatus, startDate, isEndDateShow, endDate } = activeEnrollmentRows[i];
        //     const eleLocation = await this.ele_ActiveEnrollment_Location(i).innerText();
        //     const eleEnrollmentStatus = await this.ele_ActiveEnrollment_EnrollmentStatus(i).innerText();
        //     const eleStartDate = await this.ele_ActiveEnrollment_EnrollmentStartDate(i).innerText();
        //     const eleEndDate = await this.ele_ActiveEnrollment_EnrollmentEndDate(i).innerText();
    
        //     try {
        //         expect(eleLocation).toContain(location);
        //     } catch (error) {
        //         throw new Error(`In contact detail, Mismatch in location at row ${i}: expected ${location}, but got ${eleLocation}`);
        //     }
    
        //     try {
        //         expect(eleEnrollmentStatus).toContain(enrollmentStatus);
        //     } catch (error) {
        //         throw new Error(`In contact detail, Mismatch in enrollment status at row ${i}: expected ${enrollmentStatus}, but got ${eleEnrollmentStatus}`);
        //     }
    
        //     try {
        //         const isStartDateValid = startDate.some(date => eleStartDate.includes(date));
        //         expect(isStartDateValid).toBe(true);
        //     } catch (error) {
        //         throw new Error(`In contact detail, Mismatch in start date at row ${i}: expected ${startDate}, but got ${eleStartDate}`);
        //     }

        //     if (isEndDateShow) {
        //         try {
        //             const isEndDateValid = endDate.some(date => eleEndDate.includes(date));
        //             expect(isEndDateValid).toBe(true);
        //         } catch (error) {
        //             throw new Error(`In contact detail, Mismatch in end date at row ${i}: expected ${endDate}, but got ${eleEndDate}`);
        //         }
        //     } else {
        //         try {
        //             expect(eleEndDate).toBe('');
        //         } catch (error) {
        //             throw new Error(`In contact detail, Mismatch in end date at row ${i} is null, but got ${eleEndDate}`);
        //         }
        //     }
        // }
    }
    
}