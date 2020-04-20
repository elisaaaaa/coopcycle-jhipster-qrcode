import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrder, Order } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/cooperative.service';

type SelectableEntity = ICourse | ICustomer | ICooperative;

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
  isSaving = false;
  courses: ICourse[] = [];
  customers: ICustomer[] = [];
  cooperatives: ICooperative[] = [];

  editForm = this.fb.group({
    id: [],
    iDorder: [null, [Validators.required]],
    iDcooperative: [null, [Validators.required]],
    iDcustomer: [null, [Validators.required]],
    iDcourse: [null, [Validators.required]],
    totalPrice: [null, [Validators.min(3), Validators.max(300)]],
    date: [],
    state: [],
    course: [],
    customer: [],
    cooperative: []
  });

  constructor(
    protected orderService: OrderService,
    protected courseService: CourseService,
    protected customerService: CustomerService,
    protected cooperativeService: CooperativeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      if (!order.id) {
        const today = moment().startOf('day');
        order.date = today;
      }

      this.updateForm(order);

      this.courseService.query().subscribe((res: HttpResponse<ICourse[]>) => (this.courses = res.body || []));

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));

      this.cooperativeService.query().subscribe((res: HttpResponse<ICooperative[]>) => (this.cooperatives = res.body || []));
    });
  }

  updateForm(order: IOrder): void {
    this.editForm.patchValue({
      id: order.id,
      iDorder: order.iDorder,
      iDcooperative: order.iDcooperative,
      iDcustomer: order.iDcustomer,
      iDcourse: order.iDcourse,
      totalPrice: order.totalPrice,
      date: order.date ? order.date.format(DATE_TIME_FORMAT) : null,
      state: order.state,
      course: order.course,
      customer: order.customer,
      cooperative: order.cooperative
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id'])!.value,
      iDorder: this.editForm.get(['iDorder'])!.value,
      iDcooperative: this.editForm.get(['iDcooperative'])!.value,
      iDcustomer: this.editForm.get(['iDcustomer'])!.value,
      iDcourse: this.editForm.get(['iDcourse'])!.value,
      totalPrice: this.editForm.get(['totalPrice'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      state: this.editForm.get(['state'])!.value,
      course: this.editForm.get(['course'])!.value,
      customer: this.editForm.get(['customer'])!.value,
      cooperative: this.editForm.get(['cooperative'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
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
}
