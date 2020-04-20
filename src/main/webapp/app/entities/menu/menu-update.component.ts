import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMenu, Menu } from 'app/shared/model/menu.model';
import { MenuService } from './menu.service';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/cooperative.service';

@Component({
  selector: 'jhi-menu-update',
  templateUrl: './menu-update.component.html'
})
export class MenuUpdateComponent implements OnInit {
  isSaving = false;
  cooperatives: ICooperative[] = [];

  editForm = this.fb.group({
    id: [],
    iDmenu: [null, [Validators.required]],
    iDcooperative: [null, [Validators.required]],
    lastupdate: [],
    cooperative: []
  });

  constructor(
    protected menuService: MenuService,
    protected cooperativeService: CooperativeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menu }) => {
      if (!menu.id) {
        const today = moment().startOf('day');
        menu.lastupdate = today;
      }

      this.updateForm(menu);

      this.cooperativeService.query().subscribe((res: HttpResponse<ICooperative[]>) => (this.cooperatives = res.body || []));
    });
  }

  updateForm(menu: IMenu): void {
    this.editForm.patchValue({
      id: menu.id,
      iDmenu: menu.iDmenu,
      iDcooperative: menu.iDcooperative,
      lastupdate: menu.lastupdate ? menu.lastupdate.format(DATE_TIME_FORMAT) : null,
      cooperative: menu.cooperative
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const menu = this.createFromForm();
    if (menu.id !== undefined) {
      this.subscribeToSaveResponse(this.menuService.update(menu));
    } else {
      this.subscribeToSaveResponse(this.menuService.create(menu));
    }
  }

  private createFromForm(): IMenu {
    return {
      ...new Menu(),
      id: this.editForm.get(['id'])!.value,
      iDmenu: this.editForm.get(['iDmenu'])!.value,
      iDcooperative: this.editForm.get(['iDcooperative'])!.value,
      lastupdate: this.editForm.get(['lastupdate'])!.value ? moment(this.editForm.get(['lastupdate'])!.value, DATE_TIME_FORMAT) : undefined,
      cooperative: this.editForm.get(['cooperative'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenu>>): void {
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

  trackById(index: number, item: ICooperative): any {
    return item.id;
  }
}
