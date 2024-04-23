import { Injectable } from '@angular/core';
import { ProductEmbeddedDTO } from '@models/product-embedded-dto.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _endpointURL = '/products';

  constructor(private readonly apiService: ApiService) {}

  getAllProducts(): Observable<ProductEmbeddedDTO[]> {
    return this.apiService.create<ProductEmbeddedDTO[]>(
      `${this._endpointURL}/light/search`,
      {
        body: {
          orders: [
            {
              identifier: 'code',
              asc: true,
            },
          ],
        },
      }
    );
  }
}
