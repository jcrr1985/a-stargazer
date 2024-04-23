import { DiscountType } from '@constants/discount-types';
import { DomainItem } from './domain-item.model';
import { LocalDate } from './models';
import { OrganizationEmbeddedDTO } from './organization-embedded-dto.model';
import { ProductEmbeddedDTO } from './product-embedded-dto.model';
import { Updateable } from './updateable.interface';

export interface LoyaltyProgramDTO extends Updateable {
  organization: OrganizationEmbeddedDTO;
  service: DomainItem;
  product: ProductEmbeddedDTO | null;
  startDate: LocalDate;
  endDate: LocalDate;
  startTime: LocalDate | null;
  endTime: LocalDate | null;
  discount: number;
  accumulated: boolean;
  discountType: DiscountType;
  isOssOrigin: 'YES' | 'NO' | 'BOTH' | null;
  isWithAssociatedProduct: 'YES' | 'NO' | 'BOTH' | null;
}
