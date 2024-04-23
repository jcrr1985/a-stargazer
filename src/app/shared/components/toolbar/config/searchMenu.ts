import { appRoutes } from '@constants/app-routes';
import { TabsService } from '@services/tabs/tabs.service';
import { SearchEventComponent } from 'src/app/pages/search-event/search-event.component';
import { SearchOrganizationComponent } from 'src/app/pages/search-organization/search-organization.component';
import {
  EVENT_PROPERTIES,
  EntityType,
  PRODUCT_PROPERTIES,
  TRANSMISSION_PROPERTIES,
} from '../../../../../constants/entities';
import { MenuDivider, NeosMenuItem } from '../../menu/menu.component';

export const getSearchMenu = (tabsService: TabsService): NeosMenuItem[] => [
  // {
  //   icon: CUSTOMER_ORDER_PROPERTIES.icon,
  //   iconColor: CUSTOMER_ORDER_PROPERTIES.color,
  //   labelTranslateKey: 'searchCustomerOrder',
  // },
  // MenuDivider,
  // {
  //   icon: TRANSMISSION_PROPERTIES.icon,
  //   iconColor: TRANSMISSION_PROPERTIES.color,
  //   labelTranslateKey: 'searchTransmission',
  // },
  // {
  //   icon: 'star',
  //   iconColor: TRANSMISSION_PROPERTIES.color,
  //   labelTranslateKey: 'searchTransmissionFavourites',
  // },
  MenuDivider,
  {
    icon: EVENT_PROPERTIES.icon,
    iconColor: EVENT_PROPERTIES.color,
    labelTranslateKey: 'searchEvent',
    callback: () => {
      tabsService.addTab(
        'searchEvent',
        SearchEventComponent,
        EntityType.EVENT,
        {},
        [appRoutes.SEARCH]
      );
    },
  },
  {
    icon: PRODUCT_PROPERTIES.icon,
    iconColor: PRODUCT_PROPERTIES.color,
    labelTranslateKey: 'searchOrganization',
    callback: () => {
      tabsService.addTab(
        'searchOrganization',
        SearchOrganizationComponent,
        EntityType.ORGANIZATION,
        {},
        [appRoutes.SEARCH]
      );
    },
  },
  MenuDivider,
  {
    icon: TRANSMISSION_PROPERTIES.icon,
    iconColor: TRANSMISSION_PROPERTIES.color,
    labelTranslateKey: 'searchPackages',
  },

  // {
  //   icon: CONTACT_PROPERTIES.icon,
  //   iconColor: CONTACT_PROPERTIES.color,
  //   labelTranslateKey: 'searchContact',
  // },
  // {
  //   icon: CITY_PROPERTIES.icon,
  //   iconColor: CITY_PROPERTIES.color,
  //   labelTranslateKey: 'searchCity',
  // },
  // MenuDivider,
  // {
  //   icon: RESOURCE_PROPERTIES.icon,
  //   iconColor: RESOURCE_PROPERTIES.color,
  //   labelTranslateKey: 'searchResource',
  // },
  // {
  //   icon: RESOURCE_PROFILE_PROPERTIES.icon,
  //   iconColor: RESOURCE_PROFILE_PROPERTIES.color,
  //   labelTranslateKey: 'searchResourceProfile',
  // },
  // MenuDivider,
  // {
  //   icon: CONTRACT_PROPERTIES.icon,
  //   iconColor: CONTRACT_PROPERTIES.color,
  //   labelTranslateKey: 'searchContract',
  // },
  // {
  //   icon: RATE_COST_CARD_PROPERTIES.icon,
  //   iconColor: RATE_COST_CARD_PROPERTIES.color,
  //   labelTranslateKey: 'searchRateCostCard',
  // },
  // {
  //   icon: INVOICE_PROPERTIES.icon,
  //   iconColor: INVOICE_PROPERTIES.color,
  //   labelTranslateKey: 'searchInvoice',
  // },
  // {
  //   icon: INVOICE_PROPERTIES.icon,
  //   iconColor: INVOICE_PROPERTIES.color,
  //   labelTranslateKey: 'searchInvoiceFavourites',
  // },
  // {
  //   icon: BASIC_UNIT_PROPERTIES.icon,
  //   iconColor: BASIC_UNIT_PROPERTIES.color,
  //   labelTranslateKey: 'searchBasicUnit',
  // },
  // MenuDivider,
  // {
  //   icon: PRODUCT_PROPERTIES.icon,
  //   iconColor: PRODUCT_PROPERTIES.color,
  //   labelTranslateKey: 'searchProduct',
  // },
  // MenuDivider,
  // {
  //   icon: SCHEDULE_PROPERTIES.icon,
  //   iconColor: SCHEDULE_PROPERTIES.color,
  //   labelTranslateKey: 'searchSchedule',
  // },
  // MenuDivider,
  // {
  //   icon: EVC_VIEW_PROPERTIES.icon,
  //   iconColor: EVC_VIEW_PROPERTIES.color,
  //   labelTranslateKey: 'searchEVCViewFavourite',
  // },
  // MenuDivider,
  // {
  //   icon: INCIDENT_PROPERTIES.icon,
  //   iconColor: INCIDENT_PROPERTIES.color,
  //   labelTranslateKey: 'searchIncident',
  // },
];
