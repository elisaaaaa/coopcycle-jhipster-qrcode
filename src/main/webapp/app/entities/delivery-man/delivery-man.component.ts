import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliveryMan } from 'app/shared/model/delivery-man.model';
import { DeliveryManService } from './delivery-man.service';
import { DeliveryManDeleteDialogComponent } from './delivery-man-delete-dialog.component';

@Component({
  selector: 'jhi-delivery-man',
  templateUrl: './delivery-man.component.html'
})
export class DeliveryManComponent implements OnInit, OnDestroy {
  deliveryMen?: IDeliveryMan[];
  eventSubscriber?: Subscription;

  constructor(
    protected deliveryManService: DeliveryManService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.deliveryManService.query().subscribe((res: HttpResponse<IDeliveryMan[]>) => (this.deliveryMen = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDeliveryMen();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDeliveryMan): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDeliveryMen(): void {
    this.eventSubscriber = this.eventManager.subscribe('deliveryManListModification', () => this.loadAll());
  }

  delete(deliveryMan: IDeliveryMan): void {
    const modalRef = this.modalService.open(DeliveryManDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.deliveryMan = deliveryMan;
  }
}
