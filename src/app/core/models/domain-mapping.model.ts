import { DomainItem } from './domain-item.model';
import { MappedDomainItem } from './mapped-domain-item.model';

export interface DomainMapping {
  version: number;
  id: number;
  mappingType: string;
  item: DomainItem;
  mappedItems: MappedDomainItem[];
  isModified: boolean;
  isRemoved: boolean;
  businessKey: string;
  new: boolean;
}
