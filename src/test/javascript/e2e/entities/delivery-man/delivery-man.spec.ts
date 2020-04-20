import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DeliveryManComponentsPage, DeliveryManDeleteDialog, DeliveryManUpdatePage } from './delivery-man.page-object';

const expect = chai.expect;

describe('DeliveryMan e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let deliveryManComponentsPage: DeliveryManComponentsPage;
  let deliveryManUpdatePage: DeliveryManUpdatePage;
  let deliveryManDeleteDialog: DeliveryManDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DeliveryMen', async () => {
    await navBarPage.goToEntity('delivery-man');
    deliveryManComponentsPage = new DeliveryManComponentsPage();
    await browser.wait(ec.visibilityOf(deliveryManComponentsPage.title), 5000);
    expect(await deliveryManComponentsPage.getTitle()).to.eq('coopcycleApp.deliveryMan.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(deliveryManComponentsPage.entities), ec.visibilityOf(deliveryManComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DeliveryMan page', async () => {
    await deliveryManComponentsPage.clickOnCreateButton();
    deliveryManUpdatePage = new DeliveryManUpdatePage();
    expect(await deliveryManUpdatePage.getPageTitle()).to.eq('coopcycleApp.deliveryMan.home.createOrEditLabel');
    await deliveryManUpdatePage.cancel();
  });

  it('should create and save DeliveryMen', async () => {
    const nbButtonsBeforeCreate = await deliveryManComponentsPage.countDeleteButtons();

    await deliveryManComponentsPage.clickOnCreateButton();

    await promise.all([
      deliveryManUpdatePage.setNameInput('name'),
      deliveryManUpdatePage.setSurnameInput('surname'),
      deliveryManUpdatePage.setTelephoneInput('telephone'),
      deliveryManUpdatePage.setVehiculeInput('vehicule'),
      deliveryManUpdatePage.setLatitudeInput('5'),
      deliveryManUpdatePage.setLongitudeInput('5')
    ]);

    expect(await deliveryManUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await deliveryManUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await deliveryManUpdatePage.getTelephoneInput()).to.eq('telephone', 'Expected Telephone value to be equals to telephone');
    expect(await deliveryManUpdatePage.getVehiculeInput()).to.eq('vehicule', 'Expected Vehicule value to be equals to vehicule');
    expect(await deliveryManUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await deliveryManUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');

    await deliveryManUpdatePage.save();
    expect(await deliveryManUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await deliveryManComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DeliveryMan', async () => {
    const nbButtonsBeforeDelete = await deliveryManComponentsPage.countDeleteButtons();
    await deliveryManComponentsPage.clickOnLastDeleteButton();

    deliveryManDeleteDialog = new DeliveryManDeleteDialog();
    expect(await deliveryManDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.deliveryMan.delete.question');
    await deliveryManDeleteDialog.clickOnConfirmButton();

    expect(await deliveryManComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
