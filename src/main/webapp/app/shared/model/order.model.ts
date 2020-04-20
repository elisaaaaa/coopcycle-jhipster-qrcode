import { Moment } from 'moment';
import { IOrderContent } from 'app/shared/model/order-content.model';
import { ICourse } from 'app/shared/model/course.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IOrder {
  id?: number;
  iDorder?: number;
  iDcooperative?: number;
  iDcustomer?: number;
  iDcourse?: number;
  totalPrice?: number;
  date?: Moment;
  state?: State;
  orderContents?: IOrderContent[];
  course?: ICourse;
  customer?: ICustomer;
  cooperative?: ICooperative;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public iDorder?: number,
    public iDcooperative?: number,
    public iDcustomer?: number,
    public iDcourse?: number,
    public totalPrice?: number,
    public date?: Moment,
    public state?: State,
    public orderContents?: IOrderContent[],
    public course?: ICourse,
    public customer?: ICustomer,
    public cooperative?: ICooperative
  ) {}
}
