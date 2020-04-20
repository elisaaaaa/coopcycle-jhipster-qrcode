import { IMenu } from 'app/shared/model/menu.model';
import { IOrderContent } from 'app/shared/model/order-content.model';

export interface IProduct {
  id?: number;
  iDproduct?: number;
  iDmenu?: number;
  name?: string;
  price?: number;
  disponibility?: number;
  menu?: IMenu;
  ordercontents?: IOrderContent[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public iDproduct?: number,
    public iDmenu?: number,
    public name?: string,
    public price?: number,
    public disponibility?: number,
    public menu?: IMenu,
    public ordercontents?: IOrderContent[]
  ) {}
}
