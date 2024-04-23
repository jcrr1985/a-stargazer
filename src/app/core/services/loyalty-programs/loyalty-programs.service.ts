import { Injectable } from '@angular/core';
import { LoyaltyProgramDTO } from '@models/loyalty-program-dto.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoyaltyProgramsService {
  private _endpointURL = '/loyalty-program';

  constructor(private readonly apiService: ApiService) {}

  getAllLoyaltyPrograms(): Observable<LoyaltyProgramDTO[]> {
    return this.apiService.read<LoyaltyProgramDTO[]>(`${this._endpointURL}`);
  }

  saveLoyaltyProgramList(
    listToSave: LoyaltyProgramDTO[]
  ): Observable<LoyaltyProgramDTO[]> {
    return this.apiService.create<LoyaltyProgramDTO[]>(
      `${this._endpointURL}/list`,
      {
        body: listToSave,
      }
    );
  }
}
