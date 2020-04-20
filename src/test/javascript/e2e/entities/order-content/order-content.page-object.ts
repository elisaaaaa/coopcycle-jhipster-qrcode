import { element, by, ElementFinder } from 'protractor';

export class OrderContentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-order-content div table .btn-danger'));
  title = element.all(by.css('jhi-order-content div h2#page-heading span')).first();
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

export class OrderContentUpdatePage {
  pageTitle = element(by.id('jhi-order-content-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  iDproductInput = element(by.id('field_iDproduct'));
  iDorderInput = element(by.id('field_iDorder'));
  quantityAskedInput = element(by.id('field_quantityAsked'));
  productAvailableInput = element(by.id('field_productAvailable'));

  productSelect = element(by.id('field_product'));
  orderSelect = element(by.id('field_order'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIDproductInput(iDproduct: string): Promise<void> {
    await this.iDproductInput.sendKeys(iDproduct);
  }

  async getIDproductInput(): Promise<string> {
    return await this.iDproductInput.getAttribute('value');
  }

  async setIDorderInput(iDorder: string): Promise<void> {
    await this.iDorderInput.sendKeys(iDorder);
  }

  async getIDorderInput(): Promise<string> {
    return await this.iDorderInput.getAttribute('value');
  }

  async setQuantityAskedInput(quantityAsked: string): Promise<void> {
    await this.quantityAskedInput.sendKeys(quantityAsked);
  }

  async getQuantityAskedInput(): Promise<string> {
    return await this.quantityAskedInput.getAttribute('value');
  }

  getProductAvailableInput(): ElementFinder {
    return this.productAvailableInput;
  }

  async productSelectLastOption(): Promise<void> {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option: string): Promise<void> {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption(): Promise<string> {
    return await this.productSelect.element(by.css('option:checked')).getText();
  }

  async orderSelectLastOption(): Promise<void> {
    await this.orderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async orderSelectOption(option: string): Promise<void> {
    await this.orderSelect.sendKeys(option);
  }

  getOrderSelect(): ElementFinder {
    return this.orderSelect;
  }

  async getOrderSelectedOption(): Promise<string> {
    return await this.orderSelect.element(by.css('option:checked')).getText();
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

export class OrderContentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-orderContent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-orderContent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
