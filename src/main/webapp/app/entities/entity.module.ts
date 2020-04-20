import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cooperative',
        loadChildren: () => import('./cooperative/cooperative.module').then(m => m.CoopcycleCooperativeModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.CoopcycleCustomerModule)
      },
      {
        path: 'delivery-man',
        loadChildren: () => import('./delivery-man/delivery-man.module').then(m => m.CoopcycleDeliveryManModule)
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CoopcycleCourseModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.CoopcycleMenuModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.CoopcycleOrderModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.CoopcycleProductModule)
      },
      {
        path: 'order-content',
        loadChildren: () => import('./order-content/order-content.module').then(m => m.CoopcycleOrderContentModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CoopcycleEntityModule {}
