import { DomainItem } from './domain-item.model';

export interface DomainParameter {
  version: number;
  id: number | null;
  keyCode: string | null;
  code: string;
  label: string;
  groupCode: string;
  externalLabel: any;
  domainStatus: string;
  items: DomainItem[];
  isModified: boolean;
  isRemoved: boolean;
  businessKey: string;
  new: boolean;
}
