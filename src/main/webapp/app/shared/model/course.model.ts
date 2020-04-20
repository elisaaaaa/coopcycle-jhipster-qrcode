import { IOrder } from 'app/shared/model/order.model';
import { IDeliveryMan } from 'app/shared/model/delivery-man.model';

export interface ICourse {
  id?: number;
  iDcourse?: number;
  iddelveryman?: number;
  orders?: IOrder[];
  deliveryMan?: IDeliveryMan;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public iDcourse?: number,
    public iddelveryman?: number,
    public orders?: IOrder[],
    public deliveryMan?: IDeliveryMan
  ) {}
}
