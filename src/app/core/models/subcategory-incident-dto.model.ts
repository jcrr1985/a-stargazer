import { CategoryIncidentDTO } from './category-incident-dto.model';

export interface SubcategoryIncidentDTO {
  id: number;
  version: number;
  sequence: string;
  value: string;
  abbreviation: string;
  description: string;
  incidentCategory: CategoryIncidentDTO | null;
}
