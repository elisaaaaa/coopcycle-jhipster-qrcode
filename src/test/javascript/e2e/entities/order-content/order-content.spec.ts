import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  OrderContentComponentsPage,
  /* OrderContentDeleteDialog, */
  OrderContentUpdatePage
} from './order-content.page-object';

const expect = chai.expect;

describe('OrderContent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderContentComponentsPage: OrderContentComponentsPage;
  let orderContentUpdatePage: OrderContentUpdatePage;
  /* let orderContentDeleteDialog: OrderContentDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OrderContents', async () => {
    await navBarPage.goToEntity('order-content');
    orderContentComponentsPage = new OrderContentComponentsPage();
    await browser.wait(ec.visibilityOf(orderContentComponentsPage.title), 5000);
    expect(await orderContentComponentsPage.getTitle()).to.eq('coopcycleApp.orderContent.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(orderContentComponentsPage.entities), ec.visibilityOf(orderContentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create OrderContent page', async () => {
    await orderContentComponentsPage.clickOnCreateButton();
    orderContentUpdatePage = new OrderContentUpdatePage();
    expect(await orderContentUpdatePage.getPageTitle()).to.eq('coopcycleApp.orderContent.home.createOrEditLabel');
    await orderContentUpdatePage.cancel();
  });

  /* it('should create and save OrderContents', async () => {
        const nbButtonsBeforeCreate = await orderContentComponentsPage.countDeleteButtons();

        await orderContentComponentsPage.clickOnCreateButton();

        await promise.all([
            orderContentUpdatePage.setIDproductInput('5'),
            orderContentUpdatePage.setIDorderInput('5'),
            orderContentUpdatePage.setQuantityAskedInput('5'),
            // orderContentUpdatePage.productSelectLastOption(),
            orderContentUpdatePage.orderSelectLastOption(),
        ]);

        expect(await orderContentUpdatePage.getIDproductInput()).to.eq('5', 'Expected iDproduct value to be equals to 5');
        expect(await orderContentUpdatePage.getIDorderInput()).to.eq('5', 'Expected iDorder value to be equals to 5');
        expect(await orderContentUpdatePage.getQuantityAskedInput()).to.eq('5', 'Expected quantityAsked value to be equals to 5');
        const selectedProductAvailable = orderContentUpdatePage.getProductAvailableInput();
        if (await selectedProductAvailable.isSelected()) {
            await orderContentUpdatePage.getProductAvailableInput().click();
            expect(await orderContentUpdatePage.getProductAvailableInput().isSelected(), 'Expected productAvailable not to be selected').to.be.false;
        } else {
            await orderContentUpdatePage.getProductAvailableInput().click();
            expect(await orderContentUpdatePage.getProductAvailableInput().isSelected(), 'Expected productAvailable to be selected').to.be.true;
        }

        await orderContentUpdatePage.save();
        expect(await orderContentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await orderContentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last OrderContent', async () => {
        const nbButtonsBeforeDelete = await orderContentComponentsPage.countDeleteButtons();
        await orderContentComponentsPage.clickOnLastDeleteButton();

        orderContentDeleteDialog = new OrderContentDeleteDialog();
        expect(await orderContentDeleteDialog.getDialogTitle())
            .to.eq('coopcycleApp.orderContent.delete.question');
        await orderContentDeleteDialog.clickOnConfirmButton();

        expect(await orderContentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
