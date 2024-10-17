import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../sf-common-steps";
import sF_DateTime from "../../sf-date-time";

export default class sF_GeneralInfo {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE CREATE PRODUCT =========================================================
     */

    // Get Product Name
    public get ele_SF_ProductName() {
        const ele_SF_ProductName = this.page.locator('[name="Name"]')
        if(ele_SF_ProductName != null) {
            return ele_SF_ProductName;
        }else throw new Error('Cannot find ele_SF_ProductName')
    }

    // Get Product Type
    public get ele_SF_ProductType_Dropdown() {
        const ele_SF_ProductType_Dropdown = this.page.locator('[aria-label="Product Type - Current Selection: --None--"]')
        if(ele_SF_ProductType_Dropdown != null) {
            return ele_SF_ProductType_Dropdown;
        }else throw new Error('Cannot find ele_SF_ProductType_Dropdown')
    }

    // Get Product Type - Material
    public get ele_SF_ProductType_Material() {
        const ele_SF_ProductType_Material = this.page.getByText('Material', { exact: true })
        if(ele_SF_ProductType_Material != null) {
            return ele_SF_ProductType_Material;
        }else throw new Error('Cannot find ele_SF_ProductType_Material')
    }

    // Get Product Type - Fee
    public get ele_SF_ProductType_Fee() {
        const ele_SF_ProductType_Fee = this.page.getByText('Fee', { exact: true })
        if(ele_SF_ProductType_Fee != null) {
            return ele_SF_ProductType_Fee;
        }else throw new Error('Cannot find ele_SF_ProductType_Fee')
    }

    // Get Product Type - Package
    public get ele_SF_ProductType_Package() {
        const ele_SF_ProductType_Package = this.page.getByText('Package', { exact: true })
        if(ele_SF_ProductType_Package != null) {
            return ele_SF_ProductType_Package;
        }else throw new Error('Cannot find ele_SF_ProductType_Package')
    }

    // Get Available From
    public get ele_SF_AvailableFrom() {
        const ele_SF_AvailableFrom = this.page.locator('[name="MANAERP__Available_From__c"]')
        if(ele_SF_AvailableFrom != null) {
            return ele_SF_AvailableFrom;
        }else throw new Error('Cannot find ele_SF_AvailableFrom')
    }

    // Get Available Until
    public get ele_SF_AvailableUntil() {
        const ele_SF_AvailableUntil = this.page.locator('[name="MANAERP__Available_Until__c"]')
        if(ele_SF_AvailableUntil != null) {
            return ele_SF_AvailableUntil;
        }else throw new Error('Cannot find ele_SF_AvailableUntil')
    }

    // Get Available account
    public get ele_SF_AvailableAccount() {
        const ele_SF_AvailableAccount = this.page.locator('[placeholder="Search Accounts..."]')
        if(ele_SF_AvailableAccount != null) {
            return ele_SF_AvailableAccount;
        }else throw new Error('Cannot find ele_SF_AvailableAccount')
    } 

    // Get Available grade
    public get ele_SF_AvailableGrade() {
        const ele_SF_AvailableGrade = this.page.locator('[placeholder="Search Grades..."]')
        if(ele_SF_AvailableGrade != null) {
            return ele_SF_AvailableGrade;
        }else throw new Error('Cannot find ele_SF_AvailableGrade')
    } 

    // Get Academic year
    public get ele_SF_AcademicYear() {
        const ele_SF_AcademicYear = this.page.locator('[placeholder="Search Academic Years..."]')
        if(ele_SF_AcademicYear != null) {
            return ele_SF_AcademicYear;
        }else throw new Error('Cannot find ele_SF_AcademicYear')
    } 

    /**
     ======================================================= FILL INFORMATION IN CREATE PRODUCT SCREEN =========================================================
     */

    public async fill_OTM_ProductName() {

        const ele = this.ele_SF_ProductName
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.productName_OTM);

    }

    public async fill_OTF_ProductName() {

        const ele = this.ele_SF_ProductName
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.productName_OTF);

    }

    public async fill_RM_ProductName() {

        const ele = this.ele_SF_ProductName
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.productName_RM);

    }

    public async fill_RF_ProductName() {

        const ele = this.ele_SF_ProductName
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.productName_RF);

    }

    public async fill_OTP_ProductName() {

        const ele = this.ele_SF_ProductName
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.productName_OTP);

    }

    public async fill_SLOTBP_ProductName() {

        const ele = this.ele_SF_ProductName
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.productName_SLOTBP);

    }

    public async fill_SP_ProductName() {

        const ele = this.ele_SF_ProductName
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.productName_SP);

    }

    public async fill_FP_ProductName() {

        const ele = this.ele_SF_ProductName
        const common = new sF_CommonStep(this.page)
        await ele?.fill(common.productName_FP);

    }

    public async select_ProductType_Material() {

        const eleDropdown = this.ele_SF_ProductType_Dropdown
        const eleMaterial = this.ele_SF_ProductType_Material
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleMaterial?.click();

    }

    public async select_ProductType_Fee() {

        const eleDropdown = this.ele_SF_ProductType_Dropdown
        const eleFee = this.ele_SF_ProductType_Fee
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await eleFee?.click();

    }

    public async select_ProductType_Package() {

        const eleDropdown = this.ele_SF_ProductType_Dropdown
        const elePackage = this.ele_SF_ProductType_Package
        const common = new sF_CommonStep(this.page)
        await common.wait(200);
        await eleDropdown?.click();
        await elePackage?.click();

    }

    public async fill_AvailableFrom_1991Jan01() {

        const ele = this.ele_SF_AvailableFrom
        await ele?.fill(sF_DateTime.text_01Jan1991[0]);

    }

    public async fill_AvailableFrom_2021Jan01() {

        const ele = this.ele_SF_AvailableFrom
        await ele?.fill(sF_DateTime.text_01Jan2021[0]);

    }

    public async fill_AvailableUntil_2030Dec31() {

        const ele = this.ele_SF_AvailableUntil
        await ele?.fill(sF_DateTime.text_31Dec2030[0]);

    }

    public async fill_AvailableUntil_2140Dec31() {

        const ele = this.ele_SF_AvailableUntil
        await ele?.fill(sF_DateTime.text_31Dec2140[0]);

    }

    public async select_AvailableAccount_Trung01() {

        const ele = this.ele_SF_AvailableAccount
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill('trung brand 01 - location 01');
        await this.page.getByRole('option', { name: 'trung brand 01 - location 01' }).nth(1).click();

    }

    public async select_AvailableGrade_Old() {

        const ele = this.ele_SF_AvailableGrade
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill('Automation_Payment_01');
        await this.page.getByRole('option', { name: 'Automation_Payment_01' }).nth(1).click();

    }

    public async select_AcademicYear_2023() {

        const ele = this.ele_SF_AcademicYear
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill('trung 2023');
        await this.page.getByRole('option', { name: 'trung 2023' }).nth(1).click();

    }
}