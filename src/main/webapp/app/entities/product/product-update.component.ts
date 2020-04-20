import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IMenu } from 'app/shared/model/menu.model';
import { MenuService } from 'app/entities/menu/menu.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  menus: IMenu[] = [];

  editForm = this.fb.group({
    id: [],
    iDproduct: [null, [Validators.required]],
    iDmenu: [null, [Validators.required]],
    name: [],
    price: [],
    disponibility: [null, [Validators.min(0)]],
    menu: []
  });

  constructor(
    protected productService: ProductService,
    protected menuService: MenuService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);

      this.menuService.query().subscribe((res: HttpResponse<IMenu[]>) => (this.menus = res.body || []));
    });
  }

  updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      iDproduct: product.iDproduct,
      iDmenu: product.iDmenu,
      name: product.name,
      price: product.price,
      disponibility: product.disponibility,
      menu: product.menu
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      iDproduct: this.editForm.get(['iDproduct'])!.value,
      iDmenu: this.editForm.get(['iDmenu'])!.value,
      name: this.editForm.get(['name'])!.value,
      price: this.editForm.get(['price'])!.value,
      disponibility: this.editForm.get(['disponibility'])!.value,
      menu: this.editForm.get(['menu'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
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

  trackById(index: number, item: IMenu): any {
    return item.id;
  }
}
