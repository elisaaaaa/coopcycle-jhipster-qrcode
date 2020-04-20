import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliveryMan } from 'app/shared/model/delivery-man.model';
import { DeliveryManService } from './delivery-man.service';

@Component({
  templateUrl: './delivery-man-delete-dialog.component.html'
})
export class DeliveryManDeleteDialogComponent {
  deliveryMan?: IDeliveryMan;

  constructor(
    protected deliveryManService: DeliveryManService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deliveryManService.delete(id).subscribe(() => {
      this.eventManager.broadcast('deliveryManListModification');
      this.activeModal.close();
    });
  }
}
