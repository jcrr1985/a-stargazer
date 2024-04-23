import { EventDTO } from './event-dto.model';
import { ResourceLightBase } from './resource-light-base.model';
import { ResourceProfileDTO } from './resource-profile-dto.model';

export interface ResourceWithProfileAndEventLightDTO extends ResourceLightBase {
  resourceProfile: ResourceProfileDTO;
  event?: EventDTO | null;
}
