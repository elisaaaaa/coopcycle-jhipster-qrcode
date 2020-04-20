import { IOrder } from 'app/shared/model/order.model';

export interface ICustomer {
  id?: number;
  name?: string;
  surname?: string;
  telephone?: string;
  address?: string;
  orders?: IOrder[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public telephone?: string,
    public address?: string,
    public orders?: IOrder[]
  ) {}
}
