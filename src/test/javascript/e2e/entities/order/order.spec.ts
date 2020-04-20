import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderComponentsPage, OrderDeleteDialog, OrderUpdatePage } from './order.page-object';

const expect = chai.expect;

describe('Order e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderComponentsPage: OrderComponentsPage;
  let orderUpdatePage: OrderUpdatePage;
  let orderDeleteDialog: OrderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Orders', async () => {
    await navBarPage.goToEntity('order');
    orderComponentsPage = new OrderComponentsPage();
    await browser.wait(ec.visibilityOf(orderComponentsPage.title), 5000);
    expect(await orderComponentsPage.getTitle()).to.eq('coopcycleApp.order.home.title');
    await browser.wait(ec.or(ec.visibilityOf(orderComponentsPage.entities), ec.visibilityOf(orderComponentsPage.noResult)), 1000);
  });

  it('should load create Order page', async () => {
    await orderComponentsPage.clickOnCreateButton();
    orderUpdatePage = new OrderUpdatePage();
    expect(await orderUpdatePage.getPageTitle()).to.eq('coopcycleApp.order.home.createOrEditLabel');
    await orderUpdatePage.cancel();
  });

  it('should create and save Orders', async () => {
    const nbButtonsBeforeCreate = await orderComponentsPage.countDeleteButtons();

    await orderComponentsPage.clickOnCreateButton();

    await promise.all([
      orderUpdatePage.setIDorderInput('5'),
      orderUpdatePage.setIDcooperativeInput('5'),
      orderUpdatePage.setIDcustomerInput('5'),
      orderUpdatePage.setIDcourseInput('5'),
      orderUpdatePage.setTotalPriceInput('5'),
      orderUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      orderUpdatePage.stateSelectLastOption(),
      orderUpdatePage.courseSelectLastOption(),
      orderUpdatePage.customerSelectLastOption(),
      orderUpdatePage.cooperativeSelectLastOption()
    ]);

    expect(await orderUpdatePage.getIDorderInput()).to.eq('5', 'Expected iDorder value to be equals to 5');
    expect(await orderUpdatePage.getIDcooperativeInput()).to.eq('5', 'Expected iDcooperative value to be equals to 5');
    expect(await orderUpdatePage.getIDcustomerInput()).to.eq('5', 'Expected iDcustomer value to be equals to 5');
    expect(await orderUpdatePage.getIDcourseInput()).to.eq('5', 'Expected iDcourse value to be equals to 5');
    expect(await orderUpdatePage.getTotalPriceInput()).to.eq('5', 'Expected totalPrice value to be equals to 5');
    expect(await orderUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');

    await orderUpdatePage.save();
    expect(await orderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Order', async () => {
    const nbButtonsBeforeDelete = await orderComponentsPage.countDeleteButtons();
    await orderComponentsPage.clickOnLastDeleteButton();

    orderDeleteDialog = new OrderDeleteDialog();
    expect(await orderDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.order.delete.question');
    await orderDeleteDialog.clickOnConfirmButton();

    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
