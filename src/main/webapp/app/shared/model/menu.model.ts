import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { ICooperative } from 'app/shared/model/cooperative.model';

export interface IMenu {
  id?: number;
  iDmenu?: number;
  iDcooperative?: number;
  lastupdate?: Moment;
  products?: IProduct[];
  cooperative?: ICooperative;
}

export class Menu implements IMenu {
  constructor(
    public id?: number,
    public iDmenu?: number,
    public iDcooperative?: number,
    public lastupdate?: Moment,
    public products?: IProduct[],
    public cooperative?: ICooperative
  ) {}
}
