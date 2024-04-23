import { EntityType } from '@constants/entities';

export const mockHistoryDict = {
  [EntityType.EVENT]: [
    { displayLabel: 'UEFA Champions League', entity: EntityType.EVENT },
  ],
  [EntityType.ORGANIZATION]: [
    { displayLabel: 'BRCADR', entity: EntityType.ORGANIZATION },
    { displayLabel: 'PTRPT', entity: EntityType.ORGANIZATION },
  ],
  [EntityType.TRANSMISSION]: [
    { displayLabel: '23-123122', entity: EntityType.TRANSMISSION },
    { displayLabel: '23-123552', entity: EntityType.TRANSMISSION },
  ],
  [EntityType.CUSTOMER_ORDER]: [
    { displayLabel: 'Order 1', entity: EntityType.CUSTOMER_ORDER },
    { displayLabel: 'Order 2', entity: EntityType.CUSTOMER_ORDER },
  ],
  [EntityType.INCIDENT]: [
    { displayLabel: 'Pumpkins', entity: EntityType.INCIDENT },
  ],
  all: [
    {
      entity: EntityType.TOOLS,
      displayLabel: 'Domain Manager',
    },
  ],
};
