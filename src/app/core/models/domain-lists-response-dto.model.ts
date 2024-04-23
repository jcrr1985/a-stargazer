import { DomainMapping } from './domain-mapping.model';
import { DomainParameter } from './domain-parameter.model';

export interface DomainListsResponseDTO {
  domainParameters: DomainParameter[];
  domainMappings: DomainMapping[];
}
