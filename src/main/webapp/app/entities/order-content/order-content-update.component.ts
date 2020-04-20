import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOrderContent, OrderContent } from 'app/shared/model/order-content.model';
import { OrderContentService } from './order-content.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IOrder } from 'app/shared/model/order.model';
import { OrderService } from 'app/entities/order/order.service';

type SelectableEntity = IProduct | IOrder;

@Component({
  selector: 'jhi-order-content-update',
  templateUrl: './order-content-update.component.html'
})
export class OrderContentUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];
  orders: IOrder[] = [];

  editForm = this.fb.group({
    id: [],
    iDproduct: [null, [Validators.required]],
    iDorder: [null, [Validators.required]],
    quantityAsked: [],
    productAvailable: [],
    products: [null, Validators.required],
    order: []
  });

  constructor(
    protected orderContentService: OrderContentService,
    protected productService: ProductService,
    protected orderService: OrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderContent }) => {
      this.updateForm(orderContent);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));

      this.orderService.query().subscribe((res: HttpResponse<IOrder[]>) => (this.orders = res.body || []));
    });
  }

  updateForm(orderContent: IOrderContent): void {
    this.editForm.patchValue({
      id: orderContent.id,
      iDproduct: orderContent.iDproduct,
      iDorder: orderContent.iDorder,
      quantityAsked: orderContent.quantityAsked,
      productAvailable: orderContent.productAvailable,
      products: orderContent.products,
      order: orderContent.order
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orderContent = this.createFromForm();
    if (orderContent.id !== undefined) {
      this.subscribeToSaveResponse(this.orderContentService.update(orderContent));
    } else {
      this.subscribeToSaveResponse(this.orderContentService.create(orderContent));
    }
  }

  private createFromForm(): IOrderContent {
    return {
      ...new OrderContent(),
      id: this.editForm.get(['id'])!.value,
      iDproduct: this.editForm.get(['iDproduct'])!.value,
      iDorder: this.editForm.get(['iDorder'])!.value,
      quantityAsked: this.editForm.get(['quantityAsked'])!.value,
      productAvailable: this.editForm.get(['productAvailable'])!.value,
      products: this.editForm.get(['products'])!.value,
      order: this.editForm.get(['order'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderContent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IProduct[], option: IProduct): IProduct {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
