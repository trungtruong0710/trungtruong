import { expect, Page } from "@playwright/test";
import sF_CommonStep from "../../../sf-common-steps";
import { sFCommonStep } from "../../test-hook";

export default class sF_CreateCustomBilling_Dialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     ======================================================= GET ELE CREATE CUSTOM BILLING DIALOG =========================================================
     */

    // Get product name
    public eleDescription(position: number) {
        const eleDescription = this.page.getByLabel('*Name').nth(position)
        if(eleDescription != null) {
            return eleDescription;
        }else throw new Error('Cannot find eleDescription ' + position)
    }

    // Get tax
    public eleTax(position: number) {
        const eleTax = this.page.getByLabel('Tax').nth(position)
        if(eleTax != null) {
            return eleTax;
        }else throw new Error('Cannot find eleTax ' + position)
    }

    // Get price
    public elePrice(position: number) {
        const elePrice = this.page.getByLabel('*Price').nth(position)
        if(elePrice != null) {
            return elePrice;
        }else throw new Error('Cannot find elePrice ' + position)
    }

    /**
     =======================================================PRODUCT OFFERING ACTION =========================================================
     */

    public async createCustomBilling(
        location: string,
        customBillingRecords: {
            description: string,
            // productTag: string, // not use this time
            tax: string | null,
            price: string
        }[]) {

        // Open create custom billing dialog
        await this.page.getByRole('button', { name: 'Show more actions' }).click();
        await this.page.waitForSelector('text=Create Custom Billing');
        await this.page.getByRole('menuitem', { name: 'Create Custom Billing' }).click();

        // Input location value
        await sFCommonStep.wait(200)
        await this.page.getByPlaceholder('Search Location...').click()
        await sFCommonStep.wait(200)
        await this.page.getByPlaceholder('Search Location...').fill(location)
        await sFCommonStep.wait(200)
        await this.page.getByText(location, {exact: true}).click();

        // Click Add
        for (let i = 1; i < customBillingRecords.length; i++) {
            await sFCommonStep.click('Add');
        }        

        // Input custom billing information
        for (let i = 0; i < customBillingRecords.length; i++) {

            const {description, tax, price} = customBillingRecords[i]
            const eleDescription = this.eleDescription(i)
            const eleTax = this.eleTax(i)
            const elePrice = this.elePrice(i)

            // Fill description
            try {
                await eleDescription?.fill(description)
            } catch(error) {
                throw new Error(`Not able to fill description`)
            }

            // Fill tax
            if (tax != null) {
                try {
                    await eleTax?.fill(tax)
                } catch(error) {
                    throw new Error(`Not able to fill tax`)
                }
            }

            // Fill price
            try {
                await elePrice?.fill(price)
            } catch(error) {
                throw new Error(`Not able to fill price`)
            }

        }

    }
}