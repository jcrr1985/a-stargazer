import { IncidentBase } from './incident-base.model';

export interface IncidentDTO extends IncidentBase {
  deleted: false;
}
