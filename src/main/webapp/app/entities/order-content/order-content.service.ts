import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrderContent } from 'app/shared/model/order-content.model';

type EntityResponseType = HttpResponse<IOrderContent>;
type EntityArrayResponseType = HttpResponse<IOrderContent[]>;

@Injectable({ providedIn: 'root' })
export class OrderContentService {
  public resourceUrl = SERVER_API_URL + 'api/order-contents';

  constructor(protected http: HttpClient) {}

  create(orderContent: IOrderContent): Observable<EntityResponseType> {
    return this.http.post<IOrderContent>(this.resourceUrl, orderContent, { observe: 'response' });
  }

  update(orderContent: IOrderContent): Observable<EntityResponseType> {
    return this.http.put<IOrderContent>(this.resourceUrl, orderContent, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrderContent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrderContent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
