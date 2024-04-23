import { Injectable } from '@angular/core';
import { Property } from '@models/property.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private _endpointURL = '/properties';

  constructor(private readonly apiService: ApiService) {}

  getAllProperties(): Observable<Property[]> {
    return this.apiService.read<Property[]>(`${this._endpointURL}`);
  }

  savePropertyList(listToSave: Property[]): Observable<Property[]> {
    return this.apiService.create<Property[]>(`${this._endpointURL}/list`, {
      body: listToSave,
    });
  }
}
