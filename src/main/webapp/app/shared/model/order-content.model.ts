import { IProduct } from 'app/shared/model/product.model';
import { IOrder } from 'app/shared/model/order.model';

export interface IOrderContent {
  id?: number;
  iDproduct?: number;
  iDorder?: number;
  quantityAsked?: number;
  productAvailable?: boolean;
  products?: IProduct[];
  order?: IOrder;
}

export class OrderContent implements IOrderContent {
  constructor(
    public id?: number,
    public iDproduct?: number,
    public iDorder?: number,
    public quantityAsked?: number,
    public productAvailable?: boolean,
    public products?: IProduct[],
    public order?: IOrder
  ) {
    this.productAvailable = this.productAvailable || false;
  }
}
