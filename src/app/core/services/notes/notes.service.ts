import { Injectable } from '@angular/core';
import { EntityType } from '@constants/entities';
import { Note } from '@models/note.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private _endpointURL = '/notes';

  constructor(private apiService: ApiService) {}

  getNotesByEntityId(id: number, entityType: EntityType): Observable<Note[]> {
    return this.apiService.read<Note[]>(
      `${
        this._endpointURL
      }/${id}/notes?userGroups=CSD&userGroups=PM&entityType=${entityType.toUpperCase()}`
    );
  }
}
