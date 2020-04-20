import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';

import { CoopcycleSharedModule } from 'app/shared/shared.module';
import { MenuComponent } from './menu.component';
import { MenuDetailComponent } from './menu-detail.component';
import { MenuUpdateComponent } from './menu-update.component';
import { MenuDeleteDialogComponent } from './menu-delete-dialog.component';
import { menuRoute } from './menu.route';

@NgModule({
  imports: [CoopcycleSharedModule, RouterModule.forChild(menuRoute), QRCodeModule],
  declarations: [MenuComponent, MenuDetailComponent, MenuUpdateComponent, MenuDeleteDialogComponent],
  entryComponents: [MenuDeleteDialogComponent]
})
export class CoopcycleMenuModule {}
