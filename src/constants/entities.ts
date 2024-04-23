export enum EntityType {
  EVENT = 'event',
  ORGANIZATION = 'organization',
  TRANSMISSION = 'transmission',
  CUSTOMER_ORDER = 'customer-order',
  RESOURCE = 'resource',
  INCIDENT = 'incident',
  PACKAGES = 'packages',
  CITY = 'city',
  CONTACT = 'contact',
  RESOURCE_PROFILE = 'resource-profile',
  CONTRACT = 'contract',
  RATE_COST_CARD = 'rate-cost-card',
  INVOICE = 'invoice',
  BASIC_UNIT = 'basic-unit',
  PRODUCT = 'product',
  SCHEDULE = 'schedule',
  EVC_VIEW = 'evc-view',
  TOOLS = 'tools',
  DISCOUNT_MANAGER = 'discount-manager',
}

interface EntityProperties {
  color: string;
  icon: string;
}

export const EVENT_PROPERTIES: EntityProperties = {
  color: '#7ec9e9',
  icon: 'stadium',
};

export const ORGANIZATION_PROPERTIES: EntityProperties = {
  color: '#0170a5',
  icon: 'foundation',
};

export const TRANSMISSION_PROPERTIES: EntityProperties = {
  color: '#1b4098',
  icon: 'settings_input_antenna',
};

export const CUSTOMER_ORDER_PROPERTIES: EntityProperties = {
  color: '#e21560',
  icon: 'shopping_cart_checkout',
};

export const RESOURCE_PROPERTIES: EntityProperties = {
  color: '#01a475',
  icon: 'cell_tower',
};

export const INCIDENT_PROPERTIES: EntityProperties = {
  color: '#ff0000',
  icon: 'leak_remove',
};

export const PACKAGES_PROPERTIES: EntityProperties = {
  color: '#e3f5e7',
  icon: 'savings',
};

export const CITY_PROPERTIES: EntityProperties = {
  color: '#ffb226',
  icon: 'location_city',
};

export const CONTACT_PROPERTIES: EntityProperties = {
  color: '#a46c55',
  icon: 'phone',
};

export const RESOURCE_PROFILE_PROPERTIES: EntityProperties = {
  color: '#e17c1a',
  icon: 'extension',
};

export const CONTRACT_PROPERTIES: EntityProperties = {
  color: '#1ab11d',
  icon: 'history_edu',
};

export const RATE_COST_CARD_PROPERTIES: EntityProperties = {
  color: '#884690',
  icon: 'currency_exchange',
};

export const INVOICE_PROPERTIES: EntityProperties = {
  color: '#006666',
  icon: 'euro',
};

export const BASIC_UNIT_PROPERTIES: EntityProperties = {
  color: '#0077bb',
  icon: 'save',
};

export const PRODUCT_PROPERTIES: EntityProperties = {
  color: '#e11a2f',
  icon: 'shopping_cart',
};

export const SCHEDULE_PROPERTIES: EntityProperties = {
  color: '#e14314',
  icon: 'calendar_month',
};

export const EVC_VIEW_PROPERTIES: EntityProperties = {
  color: '#05525c',
  icon: 'satellite_alt',
};

export const TOOLS_PROPERTIES: EntityProperties = {
  color: '#7b7b7d',
  icon: 'settings',
};

export const propertiesByEntityType: Map<EntityType, EntityProperties> =
  new Map([
    [EntityType.EVENT, EVENT_PROPERTIES],
    [EntityType.ORGANIZATION, ORGANIZATION_PROPERTIES],
    [EntityType.TRANSMISSION, TRANSMISSION_PROPERTIES],
    [EntityType.CUSTOMER_ORDER, CUSTOMER_ORDER_PROPERTIES],
    [EntityType.RESOURCE, RESOURCE_PROPERTIES],
    [EntityType.PACKAGES, PACKAGES_PROPERTIES],
    [EntityType.CITY, CITY_PROPERTIES],
    [EntityType.CONTACT, CONTACT_PROPERTIES],
    [EntityType.RESOURCE_PROFILE, RESOURCE_PROFILE_PROPERTIES],
    [EntityType.CONTRACT, CONTRACT_PROPERTIES],
    [EntityType.RATE_COST_CARD, RATE_COST_CARD_PROPERTIES],
    [EntityType.INVOICE, INVOICE_PROPERTIES],
    [EntityType.BASIC_UNIT, BASIC_UNIT_PROPERTIES],
    [EntityType.PRODUCT, PRODUCT_PROPERTIES],
    [EntityType.SCHEDULE, SCHEDULE_PROPERTIES],
    [EntityType.EVC_VIEW, EVC_VIEW_PROPERTIES],
    [EntityType.INCIDENT, INCIDENT_PROPERTIES],
    [EntityType.TOOLS, TOOLS_PROPERTIES],
  ]);
