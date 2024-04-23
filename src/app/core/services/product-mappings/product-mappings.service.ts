import { Injectable } from '@angular/core';
import { ProductMapping } from '@models/product-mapping.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductMappingsService {
  private _endpointURL = '/product-mapping';

  constructor(private readonly apiService: ApiService) {}

  getAllProductMappingss(): Observable<ProductMapping[]> {
    return this.apiService.read<ProductMapping[]>(`${this._endpointURL}`);
  }

  saveProductMappingList(
    listToSave: ProductMapping[]
  ): Observable<ProductMapping[]> {
    return this.apiService.create<ProductMapping[]>(
      `${this._endpointURL}/list`,
      {
        body: listToSave,
      }
    );
  }
}
