import { EntityType } from '@constants/entities';
import { TabDetail } from '@services/tabs/tabs.service';

export interface NavigationHistoryNode {
  entity: EntityType;
  displayLabel: string;
  tabDetails: TabDetail;
}
