import { DomainItem } from './domain-item.model';
import { EventType } from './event-type-dto.model';
import { ProductEmbeddedDTO } from './product-embedded-dto.model';
import { Product } from './product.model';
import { Updateable } from './updateable.interface';

export interface ProductMapping extends Updateable {
  service: DomainItem;
  product: Product | ProductEmbeddedDTO;
  eventType: EventType;
}
