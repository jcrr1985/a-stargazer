export interface CategoryIncidentDTO {
  id: number;
  version: number;
  sequence: string | number;
  value: string;
  abbreviation: string;
  description: string;
  active?: boolean | null;
  businessKey?: string | null;
  new?: boolean | null;
}
