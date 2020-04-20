import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { OrderContentDetailComponent } from 'app/entities/order-content/order-content-detail.component';
import { OrderContent } from 'app/shared/model/order-content.model';

describe('Component Tests', () => {
  describe('OrderContent Management Detail Component', () => {
    let comp: OrderContentDetailComponent;
    let fixture: ComponentFixture<OrderContentDetailComponent>;
    const route = ({ data: of({ orderContent: new OrderContent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [OrderContentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrderContentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderContentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load orderContent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orderContent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
