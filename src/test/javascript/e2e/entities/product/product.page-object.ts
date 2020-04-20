import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
  title = element.all(by.css('jhi-product div h2#page-heading span')).first();
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

export class ProductUpdatePage {
  pageTitle = element(by.id('jhi-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  iDproductInput = element(by.id('field_iDproduct'));
  iDmenuInput = element(by.id('field_iDmenu'));
  nameInput = element(by.id('field_name'));
  priceInput = element(by.id('field_price'));
  disponibilityInput = element(by.id('field_disponibility'));

  menuSelect = element(by.id('field_menu'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIDproductInput(iDproduct: string): Promise<void> {
    await this.iDproductInput.sendKeys(iDproduct);
  }

  async getIDproductInput(): Promise<string> {
    return await this.iDproductInput.getAttribute('value');
  }

  async setIDmenuInput(iDmenu: string): Promise<void> {
    await this.iDmenuInput.sendKeys(iDmenu);
  }

  async getIDmenuInput(): Promise<string> {
    return await this.iDmenuInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setPriceInput(price: string): Promise<void> {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput(): Promise<string> {
    return await this.priceInput.getAttribute('value');
  }

  async setDisponibilityInput(disponibility: string): Promise<void> {
    await this.disponibilityInput.sendKeys(disponibility);
  }

  async getDisponibilityInput(): Promise<string> {
    return await this.disponibilityInput.getAttribute('value');
  }

  async menuSelectLastOption(): Promise<void> {
    await this.menuSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async menuSelectOption(option: string): Promise<void> {
    await this.menuSelect.sendKeys(option);
  }

  getMenuSelect(): ElementFinder {
    return this.menuSelect;
  }

  async getMenuSelectedOption(): Promise<string> {
    return await this.menuSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-product-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-product'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
