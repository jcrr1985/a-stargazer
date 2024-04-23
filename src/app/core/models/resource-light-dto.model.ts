import { ResourceLightBase } from './resource-light-base.model';

export interface ResourceLightDTO extends ResourceLightBase {
  externalName?: string | null;
  blackListed: boolean;
}
