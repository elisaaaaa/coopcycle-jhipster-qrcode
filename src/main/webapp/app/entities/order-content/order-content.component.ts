import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderContent } from 'app/shared/model/order-content.model';
import { OrderContentService } from './order-content.service';
import { OrderContentDeleteDialogComponent } from './order-content-delete-dialog.component';

@Component({
  selector: 'jhi-order-content',
  templateUrl: './order-content.component.html'
})
export class OrderContentComponent implements OnInit, OnDestroy {
  orderContents?: IOrderContent[];
  eventSubscriber?: Subscription;

  constructor(
    protected orderContentService: OrderContentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.orderContentService.query().subscribe((res: HttpResponse<IOrderContent[]>) => (this.orderContents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrderContents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrderContent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOrderContents(): void {
    this.eventSubscriber = this.eventManager.subscribe('orderContentListModification', () => this.loadAll());
  }

  delete(orderContent: IOrderContent): void {
    const modalRef = this.modalService.open(OrderContentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orderContent = orderContent;
  }
}
