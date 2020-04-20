import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { IDeliveryMan } from 'app/shared/model/delivery-man.model';
import { DeliveryManService } from 'app/entities/delivery-man/delivery-man.service';

@Component({
  selector: 'jhi-course-update',
  templateUrl: './course-update.component.html'
})
export class CourseUpdateComponent implements OnInit {
  isSaving = false;
  deliverymen: IDeliveryMan[] = [];

  editForm = this.fb.group({
    id: [],
    iDcourse: [null, [Validators.required]],
    iddelveryman: [null, [Validators.required]],
    deliveryMan: []
  });

  constructor(
    protected courseService: CourseService,
    protected deliveryManService: DeliveryManService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);

      this.deliveryManService.query().subscribe((res: HttpResponse<IDeliveryMan[]>) => (this.deliverymen = res.body || []));
    });
  }

  updateForm(course: ICourse): void {
    this.editForm.patchValue({
      id: course.id,
      iDcourse: course.iDcourse,
      iddelveryman: course.iddelveryman,
      deliveryMan: course.deliveryMan
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const course = this.createFromForm();
    if (course.id !== undefined) {
      this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  private createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.editForm.get(['id'])!.value,
      iDcourse: this.editForm.get(['iDcourse'])!.value,
      iddelveryman: this.editForm.get(['iddelveryman'])!.value,
      deliveryMan: this.editForm.get(['deliveryMan'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>): void {
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

  trackById(index: number, item: IDeliveryMan): any {
    return item.id;
  }
}
