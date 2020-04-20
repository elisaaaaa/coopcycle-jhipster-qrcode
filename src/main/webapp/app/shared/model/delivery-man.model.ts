import { ICourse } from 'app/shared/model/course.model';

export interface IDeliveryMan {
  id?: number;
  name?: string;
  surname?: string;
  telephone?: string;
  vehicule?: string;
  latitude?: number;
  longitude?: number;
  courses?: ICourse[];
}

export class DeliveryMan implements IDeliveryMan {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public telephone?: string,
    public vehicule?: string,
    public latitude?: number,
    public longitude?: number,
    public courses?: ICourse[]
  ) {}
}
