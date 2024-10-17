import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../sf-common-steps";
import sF_DateTime from "../../sf-date-time";

export default class sF_ProductDetail {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE PRODUCT DETAIL =========================================================
     */

     // Get Material type
    public get ele_SF_MaterialType_Dropdown() {
        const ele_SF_MaterialType_Dropdown = this.page.locator('[aria-label="Material Type - Current Selection: --None--"]')
        if(ele_SF_MaterialType_Dropdown != null) {
            return ele_SF_MaterialType_Dropdown;
        }else throw new Error('Cannot find ele_SF_MaterialType_Dropdown')
    } 

    // Get Fee type
    public get ele_SF_FeeType_Dropdown() {
        const ele_SF_FeeType_Dropdown = this.page.locator('[aria-label="Fee Type - Current Selection: --None--"]')
        if(ele_SF_FeeType_Dropdown != null) {
            return ele_SF_FeeType_Dropdown;
        }else throw new Error('Cannot find ele_SF_Materiele_SF_FeeType_DropdownalType_Dropdown')
    } 

    // Get Package type
    public get ele_SF_PackageType_Dropdown() {
        const ele_SF_PackageType_Dropdown = this.page.locator('[aria-label="Package Type - Current Selection: --None--"]')
        if(ele_SF_PackageType_Dropdown != null) {
            return ele_SF_PackageType_Dropdown;
        }else throw new Error('Cannot find ele_SF_PackageType_Dropdown')
    } 

    // Get Material Type - OTM
    public get ele_SF_MaterialType_OTM() {
        const ele_SF_MaterialType_OTM = this.page.getByText('MATERIAL_TYPE_ONE_TIME', { exact: true })
        if(ele_SF_MaterialType_OTM != null) {
            return ele_SF_MaterialType_OTM;
        }else throw new Error('Cannot find ele_SF_MaterialType_OTM')
    }

    // Get Fee Type - OTF
    public get ele_SF_FeeType_OTF() {
        const ele_SF_FeeType_OTF = this.page.getByText('FEE_TYPE_ONE_TIME', { exact: true })
        if(ele_SF_FeeType_OTF != null) {
            return ele_SF_FeeType_OTF;
        }else throw new Error('Cannot find ele_SF_FeeType_OTF')
    }

    // Get Material Type - RM
    public get ele_SF_MaterialType_RM() {
        const ele_SF_MaterialType_RM = this.page.getByText('MATERIAL_TYPE_RECURRING', { exact: true })
        if(ele_SF_MaterialType_RM != null) {
            return ele_SF_MaterialType_RM;
        }else throw new Error('Cannot find ele_SF_MaterialType_RM')
    }

    // Get Material Type - RF
    public get ele_SF_MaterialType_RF() {
        const ele_SF_MaterialType_RF = this.page.getByText('FEE_TYPE_RECURRING', { exact: true })
        if(ele_SF_MaterialType_RF != null) {
            return ele_SF_MaterialType_RF;
        }else throw new Error('Cannot find ele_SF_MaterialType_RF')
    }

    // Get Package Type - OTP
    public get ele_SF_PackageType_OTP() {
        const ele_SF_PackageType_OTP = this.page.getByText('PACKAGE_TYPE_ONE_TIME', { exact: true })
        if(ele_SF_PackageType_OTP != null) {
            return ele_SF_PackageType_OTP;
        }else throw new Error('Cannot find ele_SF_PackageType_OTP')
    }

    // Get Package Type - SLOTBP
    public get ele_SF_PackageType_SLOTBP() {
        const ele_SF_PackageType_SLOTBP = this.page.getByText('PACKAGE_TYPE_SLOT_BASED', { exact: true })
        if(ele_SF_PackageType_SLOTBP != null) {
            return ele_SF_PackageType_SLOTBP;
        }else throw new Error('Cannot find ele_SF_PackageType_SLOTBP')
    }

    // Get Package Type - SP
    public get ele_SF_PackageType_SP() {
        const ele_SF_PackageType_SP = this.page.getByText('PACKAGE_TYPE_SCHEDULED', { exact: true })
        if(ele_SF_PackageType_SP != null) {
            return ele_SF_PackageType_SP;
        }else throw new Error('Cannot find ele_SF_PackageType_SP')
    }

    // Get Package Type - FP
    public get ele_SF_PackageType_FP() {
        const ele_SF_PackageType_FP = this.page.getByText('PACKAGE_TYPE_FREQUENCY', { exact: true })
        if(ele_SF_PackageType_FP != null) {
            return ele_SF_PackageType_FP;
        }else throw new Error('Cannot find ele_SF_PackageType_FP')
    }

    // Get Custom billing date
    public get ele_SF_CustomBillingDate() {
        const ele_SF_CustomBillingDate = this.page.locator('[name="MANAERP__Custom_Billing_Date__c"]')
        if(ele_SF_CustomBillingDate != null) {
            return ele_SF_CustomBillingDate;
        }else throw new Error('Cannot find ele_SF_CustomBillingDate')
    }

    // Get Package max slot
    public get ele_SF_MaxSlot() {
        const ele_SF_MaxSlot = this.page.locator('[name="Max_Slot"]')
        if(ele_SF_MaxSlot != null) {
            return ele_SF_MaxSlot;
        }else throw new Error('Cannot find ele_SF_MaxSlot')
    }

    // Get Package Start date
    public get ele_SF_PackageStartDate() {
        const ele_SF_PackageStartDate = this.page.locator('[name="MANAERP__Package_Start_Date__c"]')
        if(ele_SF_PackageStartDate != null) {
            return ele_SF_PackageStartDate;
        }else throw new Error('Cannot find ele_SF_PackageStartDate')
    }

    // Get Package Start date
    public get ele_SF_PackageEndDate() {
        const ele_SF_PackageEndDate = this.page.locator('[name="MANAERP__Package_End_Date__c"]')
        if(ele_SF_PackageEndDate != null) {
            return ele_SF_PackageEndDate;
        }else throw new Error('Cannot find ele_SF_PackageEndDate')
    }

    // Get Billing Master
    public get ele_SF_BillingMaster() {
        const ele_SF_BillingMaster = this.page.locator('[placeholder="Search Billing Masters..."]')
        if(ele_SF_BillingMaster != null) {
            return ele_SF_BillingMaster;
        }else throw new Error('Cannot find ele_SF_BillingMaster')
    } 

    // Get Tax
    public get ele_SF_Tax() {
        const ele_SF_Tax = this.page.locator('[placeholder="Search Taxes..."]')
        if(ele_SF_Tax != null) {
            return ele_SF_Tax;
        }else throw new Error('Cannot find ele_SF_Tax')
    } 

    // Get Discount
    public get ele_SF_Discount() {
        const ele_SF_Discount = this.page.locator('[placeholder="Search Discounts..."]')
        if(ele_SF_Discount != null) {
            return ele_SF_Discount;
        }else throw new Error('Cannot find ele_SF_Discount')
    } 

    /**
     ======================================================= FILL INFORMATION IN PRODUCT DETAIL =========================================================
     */

    public async select_MaterialType_OTM() {

        const eleDropdown = this.ele_SF_MaterialType_Dropdown
        const eleOTM = this.ele_SF_MaterialType_OTM
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleOTM?.click();

    }

    public async select_FeeType_OTF() {

        const eleDropdown = this.ele_SF_FeeType_Dropdown
        const eleOTF = this.ele_SF_FeeType_OTF
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleOTF?.click();

    }

    public async select_MaterialType_RM() {

        const eleDropdown = this.ele_SF_MaterialType_Dropdown
        const eleRM = this.ele_SF_MaterialType_RM
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleRM?.click();

    }

    public async select_FeeType_RF() {

        const eleDropdown = this.ele_SF_FeeType_Dropdown
        const eleRF = this.ele_SF_MaterialType_RF
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleRF?.click();

    }

    public async select_PackageType_OTP() {

        const eleDropdown = this.ele_SF_PackageType_Dropdown
        const eleOTP = this.ele_SF_PackageType_OTP
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleOTP?.click();

    }

    public async select_PackageType_SLOTBP() {

        const eleDropdown = this.ele_SF_PackageType_Dropdown
        const eleSLOTBP = this.ele_SF_PackageType_SLOTBP
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleSLOTBP?.click();

    }

    public async select_PackageType_SP() {

        const eleDropdown = this.ele_SF_PackageType_Dropdown
        const eleSP = this.ele_SF_PackageType_SP
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleSP?.click();

    }

    public async select_PackageType_FP() {

        const eleDropdown = this.ele_SF_PackageType_Dropdown
        const eleFP = this.ele_SF_PackageType_FP
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleFP?.click();

    }

    public async fill_CustomBillingDate_2021Jan01() {

        const ele = this.ele_SF_CustomBillingDate
        await ele?.fill(sF_DateTime.text_01Jan2021);

    }

    public async fill_MaxSlot_1() {

        const ele = this.ele_SF_MaxSlot
        await ele?.fill('1');

    }

    public async fill_PackageStartDate_2021Jan01() {

        const ele = this.ele_SF_PackageStartDate
        await ele?.fill(sF_DateTime.text_01Jan2021);

    }

    public async fill_PackageEndDate_2030Dec31() {

        const ele = this.ele_SF_PackageEndDate
        await ele?.fill(sF_DateTime.text_31Dec2030);

    }

    public async select_BillingMaster_AutomationPayment() {

        const ele = this.ele_SF_BillingMaster
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill('Automation - Payment');
        await this.page.getByRole('option', { name: 'Automation - Payment' }).nth(1).click();

    }

    public async select_Tax_10Percent_Array0() {

        const ele = this.ele_SF_Tax
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill('Automation_Payment_Tax_10%');
        await this.page.getByRole('option', { name: 'Automation_Payment_Tax_10%' }).nth(1).click();

    }

    public async select_Discount_10Percent() {

        const ele = this.ele_SF_Discount
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill('Automation_Payment_Discount_10%');
        await this.page.getByRole('option', { name: 'Automation_Payment_Discount_10%' }).nth(1).click();

    }
}