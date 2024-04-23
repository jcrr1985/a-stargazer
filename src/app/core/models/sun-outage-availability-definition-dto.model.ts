import { AvailabilityDefinition } from './availability-definition.model';

export interface SunOutageAvailabilityDefinitionDTO {
  resourceCode: string;
  availabilityDefinitionBean: AvailabilityDefinition;
  availabilityDefinition: AvailabilityDefinition;
}
