import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { OrderContentUpdateComponent } from 'app/entities/order-content/order-content-update.component';
import { OrderContentService } from 'app/entities/order-content/order-content.service';
import { OrderContent } from 'app/shared/model/order-content.model';

describe('Component Tests', () => {
  describe('OrderContent Management Update Component', () => {
    let comp: OrderContentUpdateComponent;
    let fixture: ComponentFixture<OrderContentUpdateComponent>;
    let service: OrderContentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [OrderContentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrderContentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderContentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderContentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderContent(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderContent();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
