import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDeliveryMan, DeliveryMan } from 'app/shared/model/delivery-man.model';
import { DeliveryManService } from './delivery-man.service';
import { DeliveryManComponent } from './delivery-man.component';
import { DeliveryManDetailComponent } from './delivery-man-detail.component';
import { DeliveryManUpdateComponent } from './delivery-man-update.component';

@Injectable({ providedIn: 'root' })
export class DeliveryManResolve implements Resolve<IDeliveryMan> {
  constructor(private service: DeliveryManService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliveryMan> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((deliveryMan: HttpResponse<DeliveryMan>) => {
          if (deliveryMan.body) {
            return of(deliveryMan.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DeliveryMan());
  }
}

export const deliveryManRoute: Routes = [
  {
    path: '',
    component: DeliveryManComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.deliveryMan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DeliveryManDetailComponent,
    resolve: {
      deliveryMan: DeliveryManResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.deliveryMan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DeliveryManUpdateComponent,
    resolve: {
      deliveryMan: DeliveryManResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.deliveryMan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DeliveryManUpdateComponent,
    resolve: {
      deliveryMan: DeliveryManResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.deliveryMan.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
