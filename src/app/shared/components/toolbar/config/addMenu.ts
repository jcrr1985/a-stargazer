import { TabsService } from '@services/tabs/tabs.service';
import { CreateEditIncidentComponent } from 'src/app/pages/create-edit-incident/create-edit-incident.component';
import {
  EntityType,
  INCIDENT_PROPERTIES,
} from '../../../../../constants/entities';
import { NeosMenuItem } from '../../menu/menu.component';

export const getAddMenu = (tabsService: TabsService): NeosMenuItem[] => [
  // {
  //   icon: CUSTOMER_ORDER_PROPERTIES.icon,
  //   iconColor: CUSTOMER_ORDER_PROPERTIES.color,
  //   labelTranslateKey: 'newCustomerOrder',
  // },
  // {
  //   icon: 'file_download',
  //   labelTranslateKey: 'newParticipations',
  // },
  // MenuDivider,
  // {
  //   icon: TRANSMISSION_PROPERTIES.icon,
  //   iconColor: TRANSMISSION_PROPERTIES.color,
  //   labelTranslateKey: 'newTransmission',
  // },
  // {
  //   icon: 'inventory_2',
  //   iconColor: '#a75e5c',
  //   labelTranslateKey: 'newNonTransmission',
  // },
  // MenuDivider,
  // {
  //   icon: EVENT_PROPERTIES.icon,
  //   iconColor: EVENT_PROPERTIES.color,
  //   labelTranslateKey: 'newEvent',
  // },
  // {
  //   icon: 'emoji_events',
  //   iconColor: '#d78f00',
  //   labelTranslateKey: 'newParentEvent',
  // },
  // MenuDivider,
  // {
  //   icon: CITY_PROPERTIES.icon,
  //   iconColor: CITY_PROPERTIES.color,
  //   labelTranslateKey: 'newCity',
  // },
  // MenuDivider,
  // {
  //   icon: RESOURCE_PROPERTIES.icon,
  //   iconColor: RESOURCE_PROPERTIES.color,
  //   labelTranslateKey: 'newResource',
  // },
  // {
  //   icon: RESOURCE_PROFILE_PROPERTIES.icon,
  //   iconColor: RESOURCE_PROFILE_PROPERTIES.color,
  //   labelTranslateKey: 'newResourceProfile',
  // },
  // MenuDivider,
  // {
  //   icon: CONTRACT_PROPERTIES.icon,
  //   iconColor: CONTRACT_PROPERTIES.color,
  //   labelTranslateKey: 'newContract',
  // },
  // {
  //   icon: RATE_COST_CARD_PROPERTIES.icon,
  //   iconColor: RATE_COST_CARD_PROPERTIES.color,
  //   labelTranslateKey: 'newRateCard',
  // },
  // {
  //   icon: RATE_COST_CARD_PROPERTIES.icon,
  //   iconColor: RATE_COST_CARD_PROPERTIES.color,
  //   labelTranslateKey: 'newRateCardOld',
  // },
  // MenuDivider,

  {
    icon: INCIDENT_PROPERTIES.icon,
    iconColor: INCIDENT_PROPERTIES.color,
    labelTranslateKey: 'New Incident',
    callback: () => {
      tabsService.addTab(
        'newIncident',
        CreateEditIncidentComponent,
        EntityType.INCIDENT
      );
    },
  },
  // MenuDivider,
  // {
  //   icon: RATE_COST_CARD_PROPERTIES.icon,
  //   iconColor: RATE_COST_CARD_PROPERTIES.color,
  //   labelTranslateKey: 'newRateCardOld',
  // },
];
