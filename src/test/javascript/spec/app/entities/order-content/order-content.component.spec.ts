import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { OrderContentComponent } from 'app/entities/order-content/order-content.component';
import { OrderContentService } from 'app/entities/order-content/order-content.service';
import { OrderContent } from 'app/shared/model/order-content.model';

describe('Component Tests', () => {
  describe('OrderContent Management Component', () => {
    let comp: OrderContentComponent;
    let fixture: ComponentFixture<OrderContentComponent>;
    let service: OrderContentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [OrderContentComponent]
      })
        .overrideTemplate(OrderContentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderContentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderContentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrderContent(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orderContents && comp.orderContents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
