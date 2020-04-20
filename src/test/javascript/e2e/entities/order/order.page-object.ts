import { element, by, ElementFinder } from 'protractor';

export class OrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-order div table .btn-danger'));
  title = element.all(by.css('jhi-order div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class OrderUpdatePage {
  pageTitle = element(by.id('jhi-order-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  iDorderInput = element(by.id('field_iDorder'));
  iDcooperativeInput = element(by.id('field_iDcooperative'));
  iDcustomerInput = element(by.id('field_iDcustomer'));
  iDcourseInput = element(by.id('field_iDcourse'));
  totalPriceInput = element(by.id('field_totalPrice'));
  dateInput = element(by.id('field_date'));
  stateSelect = element(by.id('field_state'));

  courseSelect = element(by.id('field_course'));
  customerSelect = element(by.id('field_customer'));
  cooperativeSelect = element(by.id('field_cooperative'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIDorderInput(iDorder: string): Promise<void> {
    await this.iDorderInput.sendKeys(iDorder);
  }

  async getIDorderInput(): Promise<string> {
    return await this.iDorderInput.getAttribute('value');
  }

  async setIDcooperativeInput(iDcooperative: string): Promise<void> {
    await this.iDcooperativeInput.sendKeys(iDcooperative);
  }

  async getIDcooperativeInput(): Promise<string> {
    return await this.iDcooperativeInput.getAttribute('value');
  }

  async setIDcustomerInput(iDcustomer: string): Promise<void> {
    await this.iDcustomerInput.sendKeys(iDcustomer);
  }

  async getIDcustomerInput(): Promise<string> {
    return await this.iDcustomerInput.getAttribute('value');
  }

  async setIDcourseInput(iDcourse: string): Promise<void> {
    await this.iDcourseInput.sendKeys(iDcourse);
  }

  async getIDcourseInput(): Promise<string> {
    return await this.iDcourseInput.getAttribute('value');
  }

  async setTotalPriceInput(totalPrice: string): Promise<void> {
    await this.totalPriceInput.sendKeys(totalPrice);
  }

  async getTotalPriceInput(): Promise<string> {
    return await this.totalPriceInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setStateSelect(state: string): Promise<void> {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect(): Promise<string> {
    return await this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption(): Promise<void> {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async courseSelectLastOption(): Promise<void> {
    await this.courseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async courseSelectOption(option: string): Promise<void> {
    await this.courseSelect.sendKeys(option);
  }

  getCourseSelect(): ElementFinder {
    return this.courseSelect;
  }

  async getCourseSelectedOption(): Promise<string> {
    return await this.courseSelect.element(by.css('option:checked')).getText();
  }

  async customerSelectLastOption(): Promise<void> {
    await this.customerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async customerSelectOption(option: string): Promise<void> {
    await this.customerSelect.sendKeys(option);
  }

  getCustomerSelect(): ElementFinder {
    return this.customerSelect;
  }

  async getCustomerSelectedOption(): Promise<string> {
    return await this.customerSelect.element(by.css('option:checked')).getText();
  }

  async cooperativeSelectLastOption(): Promise<void> {
    await this.cooperativeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cooperativeSelectOption(option: string): Promise<void> {
    await this.cooperativeSelect.sendKeys(option);
  }

  getCooperativeSelect(): ElementFinder {
    return this.cooperativeSelect;
  }

  async getCooperativeSelectedOption(): Promise<string> {
    return await this.cooperativeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class OrderDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-order-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-order'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
