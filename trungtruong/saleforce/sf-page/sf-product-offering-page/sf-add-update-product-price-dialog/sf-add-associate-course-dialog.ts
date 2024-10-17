import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import amount from "../../../utils/amount";

export default class sF_AddAssociateCourse_Dialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE =========================================================
     */

    // Get Add Course title
    public get ele_PO_AddAssociateCourse_Dialog() {
        const ele_PO_AddAssociateCourse_Dialog = this.page.getByRole('heading', { name: 'Add Course' })
        if(ele_PO_AddAssociateCourse_Dialog != null) {
            return ele_PO_AddAssociateCourse_Dialog;
        }else throw new Error('Cannot find ele_PO_AddAssociateCourse_Dialog')
    }

    // Get academic year
    public get ele_PO_AcademicYear() {
        const ele_PO_AcademicYear = this.page.locator('[title="Search Academic Years"]')
        if(ele_PO_AcademicYear != null) {
            return ele_PO_AcademicYear;
        }else throw new Error('Cannot find ele_PO_AcademicYear')
    }

    // Get course weight
    public get ele_PO_CourseWeight() {
        const ele_PO_CourseWeight = this.page.getByLabel('Course Weight*', { exact: true })
        if(ele_PO_CourseWeight != null) {
            return ele_PO_CourseWeight;
        }else throw new Error('Cannot find ele_PO_CourseWeight')
    }

    // Get max slot per course
    public get ele_PO_MaxSlotPerCourse() {
        const ele_PO_MaxSlotPerCourse = this.page.getByLabel('Max Slots Per Course*', { exact: true })
        if(ele_PO_MaxSlotPerCourse != null) {
            return ele_PO_MaxSlotPerCourse;
        }else throw new Error('Cannot find ele_PO_MaxSlotPerCourse')
    }

    // Get course offering
    public get ele_PO_CourseOffering() {
        const ele_PO_CourseOffering = this.page.getByLabel('Course Offering*', { exact: true })
        if(ele_PO_CourseOffering != null) {
            return ele_PO_CourseOffering;
        }else throw new Error('Cannot find ele_PO_CourseOffering')
    }

    /**
     ======================================================= ACTION =========================================================
     */

    // assert add or update price dialog is open
     public async assert_AddAssociateCourse_DialogIsOpen() {

        const ele = this.ele_PO_AddAssociateCourse_Dialog
        const common = new sF_CommonStep(this.page)
        const eleString = await ele.innerText()
        expect(eleString).toContain('Add Course')
        await common.wait(500);
        await ele?.click();

    }

    public async select_AcademicYear_2023() {

        const ele = this.ele_PO_AcademicYear
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill('trung 2023');
	    await this.page.locator('[title="trung 2023  - Obsoleted"]').click();

    }

    // fill course weight = 1
    public async fill_CourseWeight_1() {

        const ele = this.ele_PO_CourseWeight
        await ele?.fill('1')

    }

    // fill max slot per course = 1
    public async fill_MaxSlotPerCourse_1() {

        const ele = this.ele_PO_MaxSlotPerCourse
        await ele?.fill('1')

    }

    // fill course offering
    public async fill_CourseOffering_Automation_Payment_Course_1W_CM1_CS1() {

        const ele = this.ele_PO_CourseOffering
        await ele?.fill('Automation_Payment_Course_1W_CM1_CS1')
	    await this.page.locator('[title="Automation_Payment_CourseMaster1_Subject1"]').click();

    }

    
}