import { ResourceProfile } from './resource-profile.model';
import { SynopsisResource } from './synopsis-resource.model';
import { Updateable } from './updateable.interface';

export interface SynopsisHeader extends Updateable {
  html: string;
  resourceProfile: ResourceProfile | null;
  resource: SynopsisResource | null;
  showForChildren: boolean;
  active: boolean;
}
