import { DomainItem } from './domain-item.model';

export interface MappedDomainItem {
  version: number;
  id: number;
  item: DomainItem;
  businessKey: string;
  new: boolean;
}
