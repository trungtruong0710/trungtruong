import { expect, Page } from "@playwright/test";
import url from "./utils/url";

export default class sF_CommonStep {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Access product offering screen
  public async access_ProductOffering_Url() {
    
    const productOffering = url.sF_ProductOffering_Url;
    await this.page.goto(productOffering);
    
  }

  // Access product offering screen
  public async access_Contact_Url() {
    
    const contact = url.sF_Contact_Url;
    await this.page.goto(contact);
    
  }

  // Access phuc chau contract screen
  public async access_Contact_PhucChau_Url() {
    
    const contact = url.sF_Contact_PhucChau_Url;
    await this.page.goto(contact);
    
  }

  // Access create new student screen
  public async access_CreateNewStudentContactUrl() {
    
    const contact = url.sF_CreateNewStudentContact_Url;
    await this.page.goto(contact);
    
  }

  // get random number
  public get randomNumber() {

    // get current date
    const dateObj = new Date()
    const date = '0' + dateObj.getDate();
    const month = '0' + (dateObj.getMonth() + 1);
    const year = dateObj.getFullYear();
    const currentDate = year + month.slice(-2) + date.slice(-2)
    
    const randomNumber = currentDate + '.' + Math.floor(1000000 + Math.random() * 123456)
    return randomNumber
    
  }

  // get date 29 days before
  public get date29DaysBefore() {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 28); // subtract 29 days
    const date = ('0' + dateObj.getDate()).slice(-2);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();

    const ddmmyyyy = `${date}/${month}/${year}`;
    const yyyymmdd = `${year}/${month}/${date}`;

    const dateNoLeadingZero = date.startsWith('0') ? date.slice(1) : date;
    const monthNoLeadingZero = month.startsWith('0') ? month.slice(1) : month;

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[dateObj.getMonth()];

    const ddmmyyyyNoLeadingZero = `${dateNoLeadingZero}/${monthNoLeadingZero}/${year}`;
    const yyyymmddNoLeadingZero = `${year}/${monthNoLeadingZero}/${dateNoLeadingZero}`;
    const dayMonthYear = `${dateNoLeadingZero} ${monthName} ${year}`;

    return [yyyymmdd, ddmmyyyy, ddmmyyyyNoLeadingZero, yyyymmddNoLeadingZero, dayMonthYear];
  }

  // get date 28 days before
  public get date27DaysBefore() {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 27); // subtract 28 days, counting from current date
    const date = ('0' + dateObj.getDate()).slice(-2);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();

    const ddmmyyyy = `${date}/${month}/${year}`;
    const yyyymmdd = `${year}/${month}/${date}`;

    const dateNoLeadingZero = date.startsWith('0') ? date.slice(1) : date;
    const monthNoLeadingZero = month.startsWith('0') ? month.slice(1) : month;

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[dateObj.getMonth()];

    const ddmmyyyyNoLeadingZero = `${dateNoLeadingZero}/${monthNoLeadingZero}/${year}`;
    const yyyymmddNoLeadingZero = `${year}/${monthNoLeadingZero}/${dateNoLeadingZero}`;
    const dayMonthYear = `${dateNoLeadingZero} ${monthName} ${year}`;

    return [yyyymmdd, ddmmyyyy, ddmmyyyyNoLeadingZero, yyyymmddNoLeadingZero, dayMonthYear];
  }

  // get date 28 days before
  public get date28DaysBefore() {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 26); // subtract 28 days, counting from current date
    const date = ('0' + dateObj.getDate()).slice(-2);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();

    const ddmmyyyy = `${date}/${month}/${year}`;
    const yyyymmdd = `${year}/${month}/${date}`;

    const dateNoLeadingZero = date.startsWith('0') ? date.slice(1) : date;
    const monthNoLeadingZero = month.startsWith('0') ? month.slice(1) : month;

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[dateObj.getMonth()];

    const ddmmyyyyNoLeadingZero = `${dateNoLeadingZero}/${monthNoLeadingZero}/${year}`;
    const yyyymmddNoLeadingZero = `${year}/${monthNoLeadingZero}/${dateNoLeadingZero}`;
    const dayMonthYear = `${dateNoLeadingZero} ${monthName} ${year}`;

    return [yyyymmdd, ddmmyyyy, ddmmyyyyNoLeadingZero, yyyymmddNoLeadingZero, dayMonthYear];
  }

  // get before date
  public get beforeDate() {
    const dateObj = new Date()
    dateObj.setDate(dateObj.getDate() - 1)
    const date = ('0' + dateObj.getDate()).slice(-2);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();

    const ddmmyyyy = `${date}/${month}/${year}`;
    const yyyymmdd = `${year}/${month}/${date}`;

    return [yyyymmdd, ddmmyyyy]
  }

  // get current date
  public get currentDate() {
    const dateObj = new Date()
    const date = ('0' + dateObj.getDate()).slice(-2);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();

    const ddmmyyyy = `${date}/${month}/${year}`;
    const yyyymmdd = `${year}/${month}/${date}`;

    const dateNoLeadingZero = date.startsWith('0') ? date.slice(1) : date;
    const monthNoLeadingZero = month.startsWith('0') ? month.slice(1) : month;

    const ddmmyyyyNoLeadingZero = `${dateNoLeadingZero}/${monthNoLeadingZero}/${year}`;
    const yyyymmddNoLeadingZero = `${year}/${monthNoLeadingZero}/${dateNoLeadingZero}`;

    return [yyyymmdd, ddmmyyyy, ddmmyyyyNoLeadingZero, yyyymmddNoLeadingZero];
  }

  // get next date
  public get nextDate() {
    const dateObj = new Date()
    dateObj.setDate(dateObj.getDate() + 1)
    const date = ('0' + dateObj.getDate()).slice(-2);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();

    const ddmmyyyy = `${date}/${month}/${year}`;
    const yyyymmdd = `${year}/${month}/${date}`;

    const dateNoLeadingZero = date.startsWith('0') ? date.slice(1) : date;
    const monthNoLeadingZero = month.startsWith('0') ? month.slice(1) : month;

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const monthName = monthNames[dateObj.getMonth()];

    const ddmmyyyyNoLeadingZero = `${dateNoLeadingZero}/${monthNoLeadingZero}/${year}`;
    const yyyymmddNoLeadingZero = `${year}/${monthNoLeadingZero}/${dateNoLeadingZero}`;
    const dayMonthYear = `${dateNoLeadingZero} ${monthName} ${year}`;

    return [yyyymmdd, ddmmyyyy, ddmmyyyyNoLeadingZero, yyyymmddNoLeadingZero, dayMonthYear];
  }

  // get current date
  public get currentDateForCSVReport() {
    const dateObj = new Date()
    const date = ('0' + dateObj.getDate()).slice(-2);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    const currentDate = year + month + date
    return currentDate
  }

  // get OTM name
  public get productName_OTM() {
    
    const productName_OTM = 'OTM ' + this.randomNumber
    return productName_OTM
    
  }

  // get OTM name
  public get productName_OTF() {
    
    const productName_OTF = 'OTF ' + this.randomNumber
    return productName_OTF
    
  }

  // get RM name
  public get productName_RM() {
    
    const productName_RM = 'RM ' + this.randomNumber
    return productName_RM
    
  }

  // get RF name
  public get productName_RF() {
    
    const productName_RF = 'RF ' + this.randomNumber
    return productName_RF
    
  }

  // get OTP name
  public get productName_OTP() {
    
    const productName_OTP = 'OTP ' + this.randomNumber
    return productName_OTP
    
  }

  // get SLOTBP name
  public get productName_SLOTBP() {
    
    const productName_SLOTBP = 'SLOTBP ' + this.randomNumber
    return productName_SLOTBP
    
  }

  // get SP name
  public get productName_SP() {
    
    const productName_SP = 'SP ' + this.randomNumber
    return productName_SP
    
  }

  // get FP name
  public get productName_FP() {
    
    const productName_FP = 'FP ' + this.randomNumber
    return productName_FP
    
  }

  // get custom billing product name
  public get productName_CustomBillingProduct() {
    
    const productName_CustomBillingProduct = 'CBP ' + this.randomNumber
    return productName_CustomBillingProduct
    
  }

  // get first name
  public get firstName() {
    
    const firstName = 'E2E PAYMENT STUDENT'
    return firstName
    
  }

  // get first name
  public get lastName() {
    
    const lastName = this.randomNumber
    return lastName
    
  }

  // get enter a valid value error message
  public get err_EnterAValidValue() {
    const err_EnterAValidValue = this.page.getByText('Enter a valid value.')
    if(err_EnterAValidValue != null) {
        return err_EnterAValidValue;
    }else throw new Error('Cannot find err_EnterAValidValue')
}

public async wait(waitTime: number) {

  await this.page.waitForTimeout(waitTime)

}  

  public async click(btnName: string) {

    await this.wait(1000);
    await this.page.getByRole('button', { name: btnName, exact: true }).click();
    if (btnName === 'Submit' || btnName === 'Confirm') {
      await this.wait(2000);
    }  else {
      await this.wait(500);
    }
    
  }
  
  public async click_SubmitDraftEnrollment() {

    await this.wait(500);
    await this.page.getByTestId('EnrollmentDialogFooter__buttonSubmitDraft').click();
    await this.wait(500);
    
  }

  public async press_End() {
    await this.page.keyboard.press('End')
    await this.wait(200);
  }

  public async assert_Err_EnterAValiddValue() {

    const ele = this.err_EnterAValidValue
    const eleString = await ele.innerText()
    expect(eleString).toContain('Enter a valid value')

}

// get current url
public async getStudentUrl() {
  const studentUrl = await this.page.url()
  console.log(studentUrl)
  return studentUrl
}

public async access_ContactDetail(studentUrl: string) {
  await this.page.goto(studentUrl)
}

public async accessToUrl(url: string) {
  await this.page.goto(url)
}

}

export const currentDate = () => {
  const dateObj = new Date()
  const date = ('0' + dateObj.getDate()).slice(-2);
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();

  const ddmmyyyy = `${date}/${month}/${year}`;
  const yyyymmdd = `${year}/${month}/${date}`;

  const dateNoLeadingZero = date.startsWith('0') ? date.slice(1) : date;
  const monthNoLeadingZero = month.startsWith('0') ? month.slice(1) : month;

  const ddmmyyyyNoLeadingZero = `${dateNoLeadingZero}/${monthNoLeadingZero}/${year}`;
  const yyyymmddNoLeadingZero = `${year}/${monthNoLeadingZero}/${dateNoLeadingZero}`;

  return [yyyymmdd, ddmmyyyy, ddmmyyyyNoLeadingZero, yyyymmddNoLeadingZero];
}

export const nextDate = () => {
  const dateObj = new Date()
    dateObj.setDate(dateObj.getDate() + 1)
    const date = ('0' + dateObj.getDate()).slice(-2);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();

    const ddmmyyyy = `${date}/${month}/${year}`;
    const yyyymmdd = `${year}/${month}/${date}`;

    const dateNoLeadingZero = date.startsWith('0') ? date.slice(1) : date;
    const monthNoLeadingZero = month.startsWith('0') ? month.slice(1) : month;

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[dateObj.getMonth()];

    const ddmmyyyyNoLeadingZero = `${dateNoLeadingZero}/${monthNoLeadingZero}/${year}`;
    const yyyymmddNoLeadingZero = `${year}/${monthNoLeadingZero}/${dateNoLeadingZero}`;
    const dayMonthYear = `${dateNoLeadingZero} ${monthName} ${year}`;

    return [yyyymmdd, ddmmyyyy, ddmmyyyyNoLeadingZero, yyyymmddNoLeadingZero, dayMonthYear];
}