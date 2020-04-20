import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MenuComponentsPage, MenuDeleteDialog, MenuUpdatePage } from './menu.page-object';

const expect = chai.expect;

describe('Menu e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let menuComponentsPage: MenuComponentsPage;
  let menuUpdatePage: MenuUpdatePage;
  let menuDeleteDialog: MenuDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Menus', async () => {
    await navBarPage.goToEntity('menu');
    menuComponentsPage = new MenuComponentsPage();
    await browser.wait(ec.visibilityOf(menuComponentsPage.title), 5000);
    expect(await menuComponentsPage.getTitle()).to.eq('coopcycleApp.menu.home.title');
    await browser.wait(ec.or(ec.visibilityOf(menuComponentsPage.entities), ec.visibilityOf(menuComponentsPage.noResult)), 1000);
  });

  it('should load create Menu page', async () => {
    await menuComponentsPage.clickOnCreateButton();
    menuUpdatePage = new MenuUpdatePage();
    expect(await menuUpdatePage.getPageTitle()).to.eq('coopcycleApp.menu.home.createOrEditLabel');
    await menuUpdatePage.cancel();
  });

  it('should create and save Menus', async () => {
    const nbButtonsBeforeCreate = await menuComponentsPage.countDeleteButtons();

    await menuComponentsPage.clickOnCreateButton();

    await promise.all([
      menuUpdatePage.setIDmenuInput('5'),
      menuUpdatePage.setIDcooperativeInput('5'),
      menuUpdatePage.setLastupdateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      menuUpdatePage.cooperativeSelectLastOption()
    ]);

    expect(await menuUpdatePage.getIDmenuInput()).to.eq('5', 'Expected iDmenu value to be equals to 5');
    expect(await menuUpdatePage.getIDcooperativeInput()).to.eq('5', 'Expected iDcooperative value to be equals to 5');
    expect(await menuUpdatePage.getLastupdateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastupdate value to be equals to 2000-12-31'
    );

    await menuUpdatePage.save();
    expect(await menuUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await menuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Menu', async () => {
    const nbButtonsBeforeDelete = await menuComponentsPage.countDeleteButtons();
    await menuComponentsPage.clickOnLastDeleteButton();

    menuDeleteDialog = new MenuDeleteDialog();
    expect(await menuDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.menu.delete.question');
    await menuDeleteDialog.clickOnConfirmButton();

    expect(await menuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
