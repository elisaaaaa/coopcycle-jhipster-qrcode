import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderContent } from 'app/shared/model/order-content.model';
import { OrderContentService } from './order-content.service';

@Component({
  templateUrl: './order-content-delete-dialog.component.html'
})
export class OrderContentDeleteDialogComponent {
  orderContent?: IOrderContent;

  constructor(
    protected orderContentService: OrderContentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.orderContentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('orderContentListModification');
      this.activeModal.close();
    });
  }
}
