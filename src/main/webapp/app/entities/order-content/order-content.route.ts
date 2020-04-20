import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrderContent, OrderContent } from 'app/shared/model/order-content.model';
import { OrderContentService } from './order-content.service';
import { OrderContentComponent } from './order-content.component';
import { OrderContentDetailComponent } from './order-content-detail.component';
import { OrderContentUpdateComponent } from './order-content-update.component';

@Injectable({ providedIn: 'root' })
export class OrderContentResolve implements Resolve<IOrderContent> {
  constructor(private service: OrderContentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderContent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((orderContent: HttpResponse<OrderContent>) => {
          if (orderContent.body) {
            return of(orderContent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrderContent());
  }
}

export const orderContentRoute: Routes = [
  {
    path: '',
    component: OrderContentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.orderContent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderContentDetailComponent,
    resolve: {
      orderContent: OrderContentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.orderContent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderContentUpdateComponent,
    resolve: {
      orderContent: OrderContentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.orderContent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderContentUpdateComponent,
    resolve: {
      orderContent: OrderContentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.orderContent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
