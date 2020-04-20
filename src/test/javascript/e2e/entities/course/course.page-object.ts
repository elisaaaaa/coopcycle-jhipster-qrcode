import { element, by, ElementFinder } from 'protractor';

export class CourseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-course div table .btn-danger'));
  title = element.all(by.css('jhi-course div h2#page-heading span')).first();
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

export class CourseUpdatePage {
  pageTitle = element(by.id('jhi-course-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  iDcourseInput = element(by.id('field_iDcourse'));
  iddelverymanInput = element(by.id('field_iddelveryman'));

  deliveryManSelect = element(by.id('field_deliveryMan'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIDcourseInput(iDcourse: string): Promise<void> {
    await this.iDcourseInput.sendKeys(iDcourse);
  }

  async getIDcourseInput(): Promise<string> {
    return await this.iDcourseInput.getAttribute('value');
  }

  async setIddelverymanInput(iddelveryman: string): Promise<void> {
    await this.iddelverymanInput.sendKeys(iddelveryman);
  }

  async getIddelverymanInput(): Promise<string> {
    return await this.iddelverymanInput.getAttribute('value');
  }

  async deliveryManSelectLastOption(): Promise<void> {
    await this.deliveryManSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async deliveryManSelectOption(option: string): Promise<void> {
    await this.deliveryManSelect.sendKeys(option);
  }

  getDeliveryManSelect(): ElementFinder {
    return this.deliveryManSelect;
  }

  async getDeliveryManSelectedOption(): Promise<string> {
    return await this.deliveryManSelect.element(by.css('option:checked')).getText();
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

export class CourseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-course-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-course'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
