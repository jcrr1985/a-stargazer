import { Injectable } from '@angular/core';
import { SynopsisHeader } from '@models/synopsis-header.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SystemParametersService {
  private _endpointURL = '/system-parameters';

  constructor(private readonly apiService: ApiService) {}

  getSynopsisHeaders(): Observable<SynopsisHeader[]> {
    return this.apiService.read<SynopsisHeader[]>(
      `${this._endpointURL}/synopsis-headers`
    );
  }

  saveSynopsisHeaders(
    synopsisHeaders: SynopsisHeader[]
  ): Observable<SynopsisHeader[]> {
    return this.apiService.create<SynopsisHeader[]>(
      `${this._endpointURL}/synopsis-headers`,
      { body: synopsisHeaders }
    );
  }

  deleteSynopsisHeadersById(synopsisHeaderId: number): Observable<void> {
    return this.apiService.delete<void>(
      `${this._endpointURL}/synopsis-headers/${synopsisHeaderId}`
    );
  }
}
