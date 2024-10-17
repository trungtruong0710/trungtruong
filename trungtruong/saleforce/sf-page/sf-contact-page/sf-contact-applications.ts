import { expect, Page } from "@playwright/test";
import { sFCreateOrder, sFAssertBODAmount, sFAssertUpcomingBilling, sFCommonStep, sFApplications } from '../../sf-page/test-hook';
import sF_CommonStep from "../../sf-common-steps";
import sF_DateTime from "../../sf-date-time";
import price from "../../utils/price";

export default class sF_Applications {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE APPLICATIONS =========================================================
     */

    // Get enrollment application record
    public get ele_EnrollmentApplicationRecord() {
        const ele_EnrollmentApplicationRecord = this.page.locator('[aria-label="Enrollments"] [data-label="Application Number"] [data-label="Application Number"]')
        if(ele_EnrollmentApplicationRecord != null) {
            return ele_EnrollmentApplicationRecord;
        }else throw new Error('Cannot find ele_EnrollmentApplicationRecord')
    } 

    // Get withdrawal application record
    public get ele_WithdrawalApplicationRecord() {
        const ele_WithdrawalApplicationRecord = this.page.locator('[aria-label="Withdrawals"] [data-label="Application Number"] [data-label="Application Number"]')
        if(ele_WithdrawalApplicationRecord != null) {
            return ele_WithdrawalApplicationRecord;
        }else throw new Error('Cannot find ele_WithdrawalApplicationRecord')
    } 

    // Get loa application record
    public get ele_LOAApplicationRecord() {
        const ele_LOAApplicationRecord = this.page.locator('[aria-label="LOAs"] [data-label="Application Number"] [data-label="Application Number"]')
        if(ele_LOAApplicationRecord != null) {
            return ele_LOAApplicationRecord;
        }else throw new Error('Cannot find ele_LOAApplicationRecord')
    } 
    
    // Get new enrollment btn
    public get ele_NewEnrollment_Btn() {
        const ele_NewEnrollment_Btn = this.page.getByRole('article', { name: 'Enrollments' }).getByRole('button')
        if(ele_NewEnrollment_Btn != null) {
            return ele_NewEnrollment_Btn;
        }else throw new Error('Cannot find ele_NewEnrollment_Btn')
    }
    
    // Get new withdrawal btn
    public get ele_NewWithdrawal_Btn() {
        const ele_NewWithdrawal_Btn = this.page.getByRole('article', { name: 'Withdrawals' }).getByRole('button')
        if(ele_NewWithdrawal_Btn != null) {
            return ele_NewWithdrawal_Btn;
        }else throw new Error('Cannot find ele_NewWithdrawal_Btn')
    }
    
    // Get new withdrawal btn
    public get ele_NewLOA_Btn() {
        const ele_NewLOA_Btn = this.page.getByRole('article', { name: 'LOAs' }).getByRole('button')
        if(ele_NewLOA_Btn != null) {
            return ele_NewLOA_Btn;
        }else throw new Error('Cannot find ele_NewLOA_Btn')
    }

    // Get location
    public get ele_Location() {
        const ele_Location = this.page.getByPlaceholder('Search Accounts...')
        if(ele_Location != null) {
            return ele_Location;
        }else throw new Error('Cannot find ele_Location')
    }  
    
    // Get enrollment order btn
    public get ele_EnrollmentOrder_Btn() {
        const ele_EnrollmentOrder_Btn = this.page.locator('[data-component-id="MANAERP_ordersRelatedList"]').getByRole('button', { name: 'Enrollment Order' })
        if(ele_EnrollmentOrder_Btn != null) {
            return ele_EnrollmentOrder_Btn;
        }else throw new Error('Cannot find ele_EnrollmentOrder_Btn')
    }

    // Get enrollment status
    public ele_OrderStatus(position:number) {
        const ele_OrderStatus = this.page.locator('[data-label="Order Status"] [data-label="Order Status"]').nth(position)
        if(ele_OrderStatus != null) {
            return ele_OrderStatus;
        }else throw new Error('Cannot find ele_OrderStatus ' + position)
    }

    // Get payment method
    public get elePaymentMethod() {
        const elePaymentMethod = this.page.locator('[name="Payment_Method"]')
        if(elePaymentMethod != null) {
            return elePaymentMethod;
        }else throw new Error('Cannot find elePaymentMethod')
    }

    // Get payment date
    public get elePaymentDate() {
        const elePaymentDate = this.page.locator('[name="Payment_Date"]')
        if(elePaymentDate != null) {
            return elePaymentDate;
        }else throw new Error('Cannot find elePaymentDate')
    }

    // Get due date
    public get eleDueDate() {
        const eleDueDate = this.page.locator('[name="Due_Date"]')
        if(eleDueDate != null) {
            return eleDueDate;
        }else throw new Error('Cannot find eleDueDate')
    }

    // Get expiry date
    public get eleExpiryDate() {
        const eleExpiryDate = this.page.locator('[name="Expiry_Date"]')
        if(eleExpiryDate != null) {
            return eleExpiryDate;
        }else throw new Error('Cannot find eleExpiryDate')
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async click_NewEnrollment() {

        const ele = this.ele_NewEnrollment_Btn
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await this.page.getByText('Enrollment', { exact: true }).click();
        await common.click('Next');

    }

    public async click_NewWithdrawal() {

        const ele = this.ele_NewWithdrawal_Btn
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await this.page.getByText('Withdrawal', { exact: true }).click();
        await common.click('Next');

    }

    public async click_NewLOA() {

        const ele = this.ele_NewLOA_Btn
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await this.page.getByText('LOA', { exact: true }).click();
        await common.click('Next');

    }

    public async selectLocation(location: string, requestType: string) {

        const ele = this.ele_Location
        const common = new sF_CommonStep(this.page)
        await ele?.click();
        await common.wait(200);
        await ele?.fill(location);
        await common.wait(200);
        if (requestType == 'Enrollment') {
            // await this.page.getByLabel('New Application: Enrollment').locator('span').filter({ hasText: new RegExp(`^${location}$`) }).click();
            await this.page.getByRole('option', { name: 'Centre 2A', exact: true }).locator('span').nth(2).click();
        } else if (requestType == 'Withdrawal') {
            // await this.page.getByLabel('New Application: Withdrawal').locator('span').filter({ hasText: new RegExp(`^${location}$`) }).click();
            await this.page.getByRole('option', { name: 'Centre 2A', exact: true }).locator('span').nth(2).click();
        } else if (requestType == 'LOA') {
            // await this.page.getByLabel('New Application: LOA').locator('span').filter({ hasText: new RegExp(`^${location}$`) }).click();
            await this.page.getByRole('option', { name: 'Centre 2A', exact: true }).locator('span').nth(2).click();
        }

    }

    public async access_EnrollmentApplication(location: string) {

        const eleApplicationNumber= this.ele_EnrollmentApplicationRecord
        const common = new sF_CommonStep(this.page)
        await this.click_NewEnrollment();
        await this.selectLocation(location, 'Enrollment');
        await common.click('Save');
        // get application number and extract to find link and click
        const StringApplicationNumber = await eleApplicationNumber.innerText()
        const startIndex = StringApplicationNumber.indexOf('Application-')
        const endIndex = StringApplicationNumber.indexOf('\n' + 'Open')
        const StringApplicationNumber_Extract = StringApplicationNumber.slice(startIndex,endIndex)
        console.log(StringApplicationNumber_Extract)
        await this.page.getByRole('rowheader', { name: StringApplicationNumber_Extract + ' Open' }).getByRole('link').click()
        await common.wait(5000);
        const enrollmentOrderUrl = sFCommonStep.getStudentUrl();
        return enrollmentOrderUrl

    }

    public async click_EnrollmentOrder(location: string) {

        const ele = this.ele_EnrollmentOrder_Btn
        const common = new sF_CommonStep(this.page)
        const enrollmentUrl = await this.access_EnrollmentApplication(location);
        await sFCommonStep.accessToUrl(enrollmentUrl);
        await ele?.click();
        await common.wait(5000);
        return enrollmentUrl


    }

    public async fill_ApplicationStartDate(date: string) {

        const common = new sF_CommonStep(this.page)
        await common.click('Edit Start Date')
        await common.wait(200);
        await this.page.getByLabel('Start Date').fill(date)
        await common.wait(200);
        await common.click('Save');
        await common.wait(1000);
    }

    public async submit_DraftEnrollmentOrder_WithPackageOnly_Percent10_StartDateIs1991Jan01(location: string) {

        const common = new sF_CommonStep(this.page)
        await this.click_EnrollmentOrder(location);
        await sFCreateOrder.fill_Comment();
        await common.wait(4000);
        await sFCreateOrder.fill_PackageStartDate(sF_DateTime.startDate_1991Jan01[0]);
        await sFAssertBODAmount.assert_BOD_Total(price.Yen2399);
        await sFAssertUpcomingBilling.assert_UB_Price([price.Yen900]);
        await sFCommonStep.click('Next');
        await sFCommonStep.click_SubmitDraftEnrollment();
        await common.wait(2000)

    }

    public async submit_DraftEnrollmentOrder_WithDefaultPackage(orderInfor: {
        location: string, 
        startDate: string,
        isRemoveDiscount: boolean,
        discountName: string | null,
        updatePackage: {
            courseName: string,
            isSelect: boolean
        }[] | null,
        numberOfSlot: number | null
        isShowBilledAtOrder: boolean,
        totalPrice: string[], 
        isShowUpcomingBilling: boolean,
        upcomingBillingPrice: string[][]
    }
    ) {

        let i = 0
        const common = new sF_CommonStep(this.page)
        const {location, startDate, isRemoveDiscount, discountName, updatePackage, numberOfSlot, isShowBilledAtOrder, totalPrice, isShowUpcomingBilling, upcomingBillingPrice} = orderInfor
        const enrollmentUrl = await this.click_EnrollmentOrder(location);
        await sFCreateOrder.fill_Comment();
        await common.wait(4000);
        await sFCreateOrder.fill_PackageStartDate(startDate);

        if (isRemoveDiscount) {
            await sFCreateOrder.removeDiscount(i);
            if (discountName != null) {
                await sFCreateOrder.selectDiscount(i, discountName);
            }
        }

        if (updatePackage) {
            await sFCreateOrder.selectAssociateCourse(3,updatePackage)
        }

        if (numberOfSlot != null) {
            await sFCreateOrder.selectSlotForRequireCourse(i, numberOfSlot);
        }
        
        if (isShowBilledAtOrder) {
            await sFAssertBODAmount.assert_BOD_Total(totalPrice);
        } else {
            await sFCreateOrder.assert_BOD_NoInformation();
        }
        
        if (isShowUpcomingBilling) {
            await sFAssertUpcomingBilling.assert_UB_Price(upcomingBillingPrice);
        } else {
            await sFAssertUpcomingBilling.assert_UB_NoInformation();
        }
        
        await sFCommonStep.click('Next');
        await sFCommonStep.click_SubmitDraftEnrollment();
        await common.wait(2000)
        return enrollmentUrl
    }

    public async submit_DraftEnrollmentOrder_WithNotDefaultPackage(orderInfor: {
        location: string, 
        isRecurringProduct: boolean,
        startDate: string, 
        product: string,
        isRemoveDiscount: boolean,
        discountName: string | null,
        updatePackage: {
            courseName: string,
            isSelect: boolean
        }[] | null,
        numberOfSlot: number | null,
        isShowBilledAtOrder: boolean,
        totalPrice: string[], 
        isShowUpcomingBilling: boolean,
        upcomingBillingPrice: string[][]
    }
    ) {

        let i = 0
        const common = new sF_CommonStep(this.page)
        const {location, isRecurringProduct, startDate, product, isRemoveDiscount, discountName, updatePackage, numberOfSlot, isShowBilledAtOrder, totalPrice, isShowUpcomingBilling, upcomingBillingPrice} = orderInfor
        const enrollmentUrl = await this.click_EnrollmentOrder(location);

        for (let j = i; j < 1; j++) {
            const eleAdd = sFCreateOrder.eleAddProduct
            const eleRemove = sFCreateOrder.eleRemoveProduct(j)
            const eleProduct = sFCreateOrder.eleProduct(j)
            await sFCommonStep.wait(5000);
            await eleAdd?.click();
            await sFCommonStep.wait(200);
            await eleRemove?.click();
            await sFCommonStep.wait(200);
            await eleProduct?.fill(product)
            await this.page.getByRole('option', { name: product, exact: true }).click();
        }

        await sFCreateOrder.fill_Comment();
        await common.wait(4000);

        if (isRemoveDiscount) {
            await sFCreateOrder.removeDiscount(i);
            if (discountName != null) {
                await sFCreateOrder.selectDiscount(i, discountName);
            }
        }

        if (updatePackage) {
            await sFCreateOrder.selectAssociateCourse(3,updatePackage)
        }

        if (numberOfSlot != null) {
            await sFCreateOrder.selectSlotForRequireCourse(i, numberOfSlot);
        }

        if (isRecurringProduct) {
            await sFCreateOrder.fill_PackageStartDate(startDate);
        }
        
        if (isShowBilledAtOrder) {
            await sFAssertBODAmount.assert_BOD_Total(totalPrice);
        } else {
            await sFCreateOrder.assert_BOD_NoInformation();
        }
        
        if (isShowUpcomingBilling) {
            await sFAssertUpcomingBilling.assert_UB_Price(upcomingBillingPrice);
        } else {
            await sFAssertUpcomingBilling.assert_UB_NoInformation();
        }
        
        await sFCommonStep.click('Next');
        await sFCommonStep.click_SubmitDraftEnrollment();
        await common.wait(2000)

        return enrollmentUrl
    }

    public async submitDraftEnrollmentOrderWithMultipleProduct(
        numberOfProduct: number,
        location: string,
        startDate: string | null,
        orderInfor: {
            product: string | null,
            isRemoveDiscount: boolean,
            discountName: string | null,
            updatePackage: {
                courseName: string,
                isSelect: boolean
            }[] | null,
            numberOfSlot: number | null,
    }[],
        isShowBilledAtOrder: boolean,
        totalPrice: string[]
    ) {

        const common = new sF_CommonStep(this.page)
        const enrollmentUrl = await this.click_EnrollmentOrder(location);
        
        // Fill comment
        await sFCreateOrder.fill_Comment();
        await common.wait(4000);

        // Add product
        for ( let numberOfProductIndex = 0; numberOfProductIndex < numberOfProduct - 1; numberOfProductIndex++) {
            try {
                await sFCommonStep.wait(500)
                await sFCreateOrder.eleAddProduct.click()
                await sFCommonStep.wait(500)
            } catch(error) {
                throw new Error(`Cannot click add product`)
            }
        }

        for (let i = 0; i < orderInfor.length; i++ ) {

            const {product, isRemoveDiscount, discountName, updatePackage, numberOfSlot} = orderInfor[i]

            // Select product
            if (product != null) {
                try {
                    await sFCreateOrder.eleProduct(i).fill(product)
                    await this.page.getByRole('option', { name: product, exact: true }).click();
                } catch(error) {
                    throw new Error(`Cannot select product name [${i}]`)
                }
            }

            if (isRemoveDiscount) {
                try {
                    await sFCreateOrder.removeDiscount(i);
                } catch(error) {
                    throw new Error(`Cannot remove discount of product [${i}]`)
                }
                if (discountName != null) {
                    try {
                        await sFCreateOrder.selectDiscount(i, discountName);
                    } catch(error) {
                        throw new Error(`Cannot select discount of product [${i}]`)
                    }
                }
            }

            if (updatePackage != null) {
                if (updatePackage) {
                    try {
                        await sFCreateOrder.selectAssociateCourse(3,updatePackage)
                    } catch(error) {
                        throw new Error(`Cannot select associate course of package`)
                    }
                }
            }

            if (numberOfSlot != null) {
                try {
                    await sFCreateOrder.selectSlotForRequireCourse(i, numberOfSlot);
                } catch(error) {
                    throw new Error(`Cannot select number of slot of associate course`)
                }
            }           
        }

        // Fill default start date
        if (startDate != null) {
            try {
                await sFCreateOrder.ele_DefaultStartDate.fill(startDate);
                await sFCommonStep.wait(200)
                await sFCommonStep.click('Confirm')
            } catch(error) {
                throw new Error(`Cannot add default start date for product`)
            }
        }

        // Fill comment
        await sFCreateOrder.fill_Comment();
        await common.wait(4000);

        let subTotal: string | undefined;
        let total: string | undefined;

        if (isShowBilledAtOrder) {
            try {
                subTotal = await sFCreateOrder.ele_SubTotal.innerText();
                total = await sFCreateOrder.ele_Total.innerText();
                await sFAssertBODAmount.assert_BOD_Total(totalPrice);
            } catch (error) {
                throw new Error(`In order screen: Total should show '${totalPrice}', but got '${subTotal}' and '${total}'`);
            }
        } else {
            try {
                await sFCreateOrder.assert_BOD_NoInformation();
            } catch (error) {
                throw new Error(`In order screen: Billed at order is expected to show no information, but got '${subTotal}' and '${total}'`);
            }
        }
        
        await sFCommonStep.click('Next');
        await sFCommonStep.click_SubmitDraftEnrollment();
        await common.wait(2000)
        return enrollmentUrl
    }

    public async submit_EnrollmentOrder(date: string) {

        await this.fill_ApplicationStartDate(date);
        await this.page.locator('records-highlights2').getByRole('button', { name: 'Show more actions' }).click();
        await this.page.getByRole('menuitem', { name: 'Submit Enrollment' }).click();
        // await sFCommonStep.click('Submit Enrollment');
        await sFCommonStep.wait(200);
        await sFCommonStep.click('Confirm');
    }

    public async createWithdrawalApplication(
        location: string,
        reason: string,
        lastAttendanceDate: string,
    ) {

        await this.click_NewWithdrawal();
        await this.selectLocation(location, 'Withdrawal');
        await sFCommonStep.wait(200);
        await this.page.getByRole('option', { name: reason, exact: true }).click();
        await sFCommonStep.click('Move to Chosen')
        await sFCommonStep.wait(200);
        await this.page.getByLabel('*Last Attendance Day').fill(lastAttendanceDate);
        await sFCommonStep.click('Save')
    }

    public async createLOAApplication(
        location: string,
        reason: string,
        lastAttendanceDate: string,
        loaEndDate: string
    ) {

        await this.click_NewLOA();
        await this.selectLocation(location, 'LOA');
        await sFCommonStep.wait(200);
        await this.page.getByRole('option', { name: reason, exact: true }).click();
        await sFCommonStep.click('Move to Chosen')
        await sFCommonStep.wait(200);
        await this.page.getByLabel('*Last Attendance Day').fill(lastAttendanceDate);
        await sFCommonStep.wait(200);
        await this.page.getByLabel('*Scheduled Resume Date').fill(loaEndDate);
        await sFCommonStep.click('Save')
    }

    public async accessWithdrawalOrder() {

        const eleApplicationNumber= this.ele_WithdrawalApplicationRecord
        // get application number and extract to find link and click
        const StringApplicationNumber = await eleApplicationNumber.innerText()
        const startIndex = StringApplicationNumber.indexOf('Application-')
        const endIndex = StringApplicationNumber.indexOf('\n' + 'Open')
        const StringApplicationNumber_Extract = StringApplicationNumber.slice(startIndex,endIndex)
        console.log(StringApplicationNumber_Extract)
        await this.page.getByRole('rowheader', { name: StringApplicationNumber_Extract + ' Open' }).getByRole('link').click()
        await sFCommonStep.wait(5000);
        await sFCommonStep.click('Submit');
        await sFCommonStep.wait(500);
        await sFCommonStep.click('Next');
        const url = await sFCommonStep.getStudentUrl();
        return url
    }

    public async accessLOAOrder() {

        const eleApplicationNumber= this.ele_LOAApplicationRecord
        // get application number and extract to find link and click
        const StringApplicationNumber = await eleApplicationNumber.innerText()
        const startIndex = StringApplicationNumber.indexOf('Application-')
        const endIndex = StringApplicationNumber.indexOf('\n' + 'Open')
        const StringApplicationNumber_Extract = StringApplicationNumber.slice(startIndex,endIndex)
        console.log(StringApplicationNumber_Extract)
        await this.page.getByRole('rowheader', { name: StringApplicationNumber_Extract + ' Open' }).getByRole('link').click()
        await sFCommonStep.wait(5000);
        await sFCommonStep.click('Submit LOA');
        await sFCommonStep.wait(500);
        await sFCommonStep.click('Next');
        const url = await sFCommonStep.getStudentUrl();
        return url

    }

    public async cancelApplication(cancelBtnName: string, date: string | null) {
        await sFCommonStep.wait(3000);
        await sFCommonStep.click(cancelBtnName);
    
        switch (cancelBtnName) {
            case 'Cancel Enrollment':
                if (date !== null) {
                    await this.page.getByLabel('*Cancellation Date').fill(date);
                }
                await sFCommonStep.click('Save');
                break;
    
            case 'Cancel Withdrawal':
            case 'Cancel LOA':
                await sFCommonStep.click('Void');
                break;
    
            default:
                throw new Error(`Unknown cancel button name: ${cancelBtnName}`);
        }

        await sFCommonStep.wait(2000);
    }    

    public async createInvoiceForEnrollmentOrder(
        invoiceInfo: {
            isDraftOnly: boolean,
            paymentInfo: {
                paymentMethod: string | null,
                dueDate: string | null,
                expiryDate: string | null
            } | null,
            isCancelPayment: boolean,
            isRequestPayment: boolean,
            isApprovePayment: boolean,
            paymentDate: string | null
        }
    ) {
    
        const {isDraftOnly, paymentInfo, isCancelPayment, isRequestPayment, isApprovePayment, paymentDate} = invoiceInfo;
    
        // create invoice
        try {
            await sFCommonStep.click('Create Invoice');
            await sFCommonStep.click('Save');
            await sFCommonStep.click('Finish');
            await sFCommonStep.wait(2000);
            const invoiceUrl = this.page.url();
    
            // Check payment method info to decide whether to continue or not
            if (!isDraftOnly && paymentInfo?.paymentMethod) {

                await sFCommonStep.click('Issue Invoice')
                await sFCommonStep.wait(500)

                switch (paymentInfo.paymentMethod) {
                    case 'Bank Transfer':
                    case 'Cash':
                    case 'Convenience Store':
                        await this.elePaymentMethod.selectOption(paymentInfo.paymentMethod);
                        if (paymentInfo?.dueDate && paymentInfo?.expiryDate) {
                            await this.eleDueDate.fill(paymentInfo.dueDate);
                            await this.eleExpiryDate.fill(paymentInfo.expiryDate);
                        }
                        break;

                    case 'Direct Debit':
                    case 'GMO Convenience Store':
                        await this.elePaymentMethod.selectOption(paymentInfo.paymentMethod);
                        if (paymentInfo?.dueDate) {
                            await this.eleDueDate.fill(paymentInfo.dueDate);
                        }
                        break;

                    case 'GMO Credit Card':
                        await this.elePaymentMethod.selectOption(paymentInfo.paymentMethod);
                        break;

                    default:
                        throw new Error(`Cannot select payment method`);
                }

                // Save payment method
                await sFCommonStep.click('Confirm')
                await sFCommonStep.click('Finish')
            }

            // Check request payment
            if (isRequestPayment) {
                try {
                    await sFCommonStep.click('Request Payment')
                    await sFCommonStep.click('Confirm')
                    await sFCommonStep.click('Finish')
                } catch(error) {
                    throw new Error(`Cannot request payment`)
                }
            }

            // Check cancel payment
            if (isCancelPayment) {
                try {
                    await sFCommonStep.click('Cancel Payment')
                    await sFCommonStep.click('Confirm')
                    await sFCommonStep.click('Finish')
                } catch(error) {
                    throw new Error(`Cannot cancel payment`)
                }
            }

            // Check and approve payment
            if (isApprovePayment && paymentDate != null) {
                try {
                    await sFCommonStep.click('Approve Payment')
                    await this.elePaymentDate.fill(paymentDate)
                    await sFCommonStep.click('Confirm')
                    await sFCommonStep.click('Finish')
                } catch(error) {
                    throw new Error(`Cannot approve payment`)
                }
            }
    
            return invoiceUrl;
    
        } catch (error) {
            throw new Error(`Cannot create invoice for enrollment order`);
        }
    }

    public async assertCreateEnrollmentSuccess() {

        const ele = this.page.locator('text=You have successfully Submitted the Enrollment application')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('You have successfully Submitted the Enrollment application')
        } catch(error) {
            throw new Error(`Not show success msg 'You have successfully Submitted the Enrollment application'`)
        }
    }
    
    public async assertCancelEnrollmentSuccess() {

        const ele = this.page.locator('text=You have successfully Cancelled the Enrollment application')
        const eleString = await ele?.innerText()
        try {
            sFCommonStep.wait(1000)
            expect(eleString).toContain('You have successfully Cancelled the Enrollment application')
            console.log('Cancel Enrollment succeed')
        } catch(error) {
            throw new Error(`Not show success msg 'You have successfully Cancelled the Enrollment application'`)
        }
    }
    
    public async assertCancelWithdrawalSuccess() {

        const ele = this.page.locator('text=You have successfully cancelled the withdrawal application.')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('You have successfully cancelled the withdrawal application.')
            console.log('Cancel Withdrawal succeed')
        } catch(error) {
            throw new Error(`Not show success msg 'You have successfully cancelled the withdrawal application.'`)
        }
    }
    
    public async assertCancelLOASuccess() {

        const ele = this.page.locator('text=You have successfully cancelled the LOA application')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('You have successfully cancelled the LOA application')
            console.log('Cancel LOA succeed')
        } catch(error) {
            throw new Error(`Not show success msg 'You have successfully cancelled the LOA application'`)
        }
    }

    public async assertCancelEnrollmentFailCancelDateMustBeLater() {

        const ele = this.page.locator('text=Value must be ' + sFCommonStep.nextDate[0].toString() + ' or later')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('Value must be ' + sFCommonStep.nextDate[0].toString() + ' or later')
        } catch(error) {
            throw new Error(`Not show msg Value must be ${sFCommonStep.nextDate[0].toString()} or later`)
        }
    }

    public async assertCancelEnrollmentIsNotValidForScheduledUpdate() {

        const ele = this.page.locator('text=You cannot cancel the enrollment because there is a scheduled update order. Please void the update order first.')
        const eleString = await ele?.innerText()
        try {
            expect(eleString).toContain('You cannot cancel the enrollment because there is a scheduled update order. Please void the update order first.')
        } catch(error) {
            throw new Error(`Not show msg: 'You cannot cancel the enrollment because there is a scheduled update order. Please void the update order first.'`)
        }
    }

}