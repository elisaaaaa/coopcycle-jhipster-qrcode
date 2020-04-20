import { element, by, ElementFinder } from 'protractor';

export class MenuComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-menu div table .btn-danger'));
  title = element.all(by.css('jhi-menu div h2#page-heading span')).first();
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

export class MenuUpdatePage {
  pageTitle = element(by.id('jhi-menu-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  iDmenuInput = element(by.id('field_iDmenu'));
  iDcooperativeInput = element(by.id('field_iDcooperative'));
  lastupdateInput = element(by.id('field_lastupdate'));

  cooperativeSelect = element(by.id('field_cooperative'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIDmenuInput(iDmenu: string): Promise<void> {
    await this.iDmenuInput.sendKeys(iDmenu);
  }

  async getIDmenuInput(): Promise<string> {
    return await this.iDmenuInput.getAttribute('value');
  }

  async setIDcooperativeInput(iDcooperative: string): Promise<void> {
    await this.iDcooperativeInput.sendKeys(iDcooperative);
  }

  async getIDcooperativeInput(): Promise<string> {
    return await this.iDcooperativeInput.getAttribute('value');
  }

  async setLastupdateInput(lastupdate: string): Promise<void> {
    await this.lastupdateInput.sendKeys(lastupdate);
  }

  async getLastupdateInput(): Promise<string> {
    return await this.lastupdateInput.getAttribute('value');
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

export class MenuDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-menu-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-menu'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
