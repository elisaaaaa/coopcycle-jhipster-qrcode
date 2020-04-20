import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDeliveryMan, DeliveryMan } from 'app/shared/model/delivery-man.model';
import { DeliveryManService } from './delivery-man.service';

@Component({
  selector: 'jhi-delivery-man-update',
  templateUrl: './delivery-man-update.component.html'
})
export class DeliveryManUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    surname: [],
    telephone: [null, [Validators.minLength(10), Validators.maxLength(10)]],
    vehicule: [],
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]]
  });

  constructor(protected deliveryManService: DeliveryManService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryMan }) => {
      this.updateForm(deliveryMan);
    });
  }

  updateForm(deliveryMan: IDeliveryMan): void {
    this.editForm.patchValue({
      id: deliveryMan.id,
      name: deliveryMan.name,
      surname: deliveryMan.surname,
      telephone: deliveryMan.telephone,
      vehicule: deliveryMan.vehicule,
      latitude: deliveryMan.latitude,
      longitude: deliveryMan.longitude
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryMan = this.createFromForm();
    if (deliveryMan.id !== undefined) {
      this.subscribeToSaveResponse(this.deliveryManService.update(deliveryMan));
    } else {
      this.subscribeToSaveResponse(this.deliveryManService.create(deliveryMan));
    }
  }

  private createFromForm(): IDeliveryMan {
    return {
      ...new DeliveryMan(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      vehicule: this.editForm.get(['vehicule'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryMan>>): void {
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
}
