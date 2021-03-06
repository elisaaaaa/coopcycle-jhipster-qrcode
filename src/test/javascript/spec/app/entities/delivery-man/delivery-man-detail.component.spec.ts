import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { DeliveryManDetailComponent } from 'app/entities/delivery-man/delivery-man-detail.component';
import { DeliveryMan } from 'app/shared/model/delivery-man.model';

describe('Component Tests', () => {
  describe('DeliveryMan Management Detail Component', () => {
    let comp: DeliveryManDetailComponent;
    let fixture: ComponentFixture<DeliveryManDetailComponent>;
    const route = ({ data: of({ deliveryMan: new DeliveryMan(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [DeliveryManDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DeliveryManDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeliveryManDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load deliveryMan on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deliveryMan).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
