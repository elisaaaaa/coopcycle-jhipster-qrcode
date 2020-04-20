import { IMenu } from 'app/shared/model/menu.model';
import { IOrder } from 'app/shared/model/order.model';

export interface ICooperative {
  id?: number;
  name?: string;
  surname?: string;
  telephone?: string;
  address?: string;
  menus?: IMenu[];
  orders?: IOrder[];
}

export class Cooperative implements ICooperative {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public telephone?: string,
    public address?: string,
    public menus?: IMenu[],
    public orders?: IOrder[]
  ) {}
}
