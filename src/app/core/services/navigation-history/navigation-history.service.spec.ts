import { TestBed, fakeAsync } from '@angular/core/testing';
import { EntityType } from '@constants/entities';
import { TabDetail } from '@services/tabs/tabs.service';
import { mockHistoryDict } from './navigation-history.mock';
import { NavigationHistoryService } from './navigation-history.service';

describe('HistoryService', () => {
  let service: NavigationHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationHistoryService);
  });

  it('should be created', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockHistoryDict)
    );

    expect(service).toBeTruthy();
  });

  it('should return a navigation tree and "all" should be the first item', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockHistoryDict)
    );
    const expectedTree = [
      {
        nameTranslateKey: 'mostRecentlyUsed',
        children: [
          {
            nameTranslateKey: 'all',
            children: [
              {
                name: 'Domain Manager',
                icon: 'settings',
                callback: jasmine.any(Function),
              },
            ],
            icon: 'settings',
          },
          {
            nameTranslateKey: 'customer-order',
            children: [
              {
                name: 'Order 1',
                icon: 'shopping_cart_checkout',
                callback: jasmine.any(Function),
              },
              {
                name: 'Order 2',
                icon: 'shopping_cart_checkout',
                callback: jasmine.any(Function),
              },
            ],
            icon: 'shopping_cart_checkout',
          },
          {
            nameTranslateKey: 'event',
            children: [
              {
                name: 'UEFA Champions League',
                icon: 'stadium',
                callback: jasmine.any(Function),
              },
            ],
            icon: 'stadium',
          },
          {
            nameTranslateKey: 'incident',
            children: [
              {
                name: 'Pumpkins',
                icon: 'leak_remove',
                callback: jasmine.any(Function),
              },
            ],
            icon: 'leak_remove',
          },
          {
            nameTranslateKey: 'organization',
            children: [
              {
                name: 'BRCADR',
                icon: 'foundation',
                callback: jasmine.any(Function),
              },
              {
                name: 'PTRPT',
                icon: 'foundation',
                callback: jasmine.any(Function),
              },
            ],
            icon: 'foundation',
          },
          {
            nameTranslateKey: 'transmission',
            children: [
              {
                name: '23-123122',
                icon: 'settings_input_antenna',
                callback: jasmine.any(Function),
              },
              {
                name: '23-123552',
                icon: 'settings_input_antenna',
                callback: jasmine.any(Function),
              },
            ],
            icon: 'settings_input_antenna',
          },
        ],
      },
    ];

    const tree = service.getNavigationHistoryTree();

    expect(tree).toEqual(expectedTree);
    expect(tree[0].children![0].nameTranslateKey).toEqual('all');
  });

  it('should store new history correctly', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('{}');

    const testLabel = 'test';
    const testEntity = EntityType.EVENT;
    const testTabDetails: TabDetail = {
      id: '1',
      component: jasmine.any,
      isEdited: false,
      label: 'testTab',
      tabRoute: ['testroute'],
    };
    const setItemSpy = spyOn(localStorage, 'setItem');
    const expectedHistoryDict = JSON.stringify({
      all: [
        {
          entity: testEntity,
          displayLabel: testLabel,
          tabDetails: testTabDetails,
        },
      ],
      event: [
        {
          entity: testEntity,
          displayLabel: testLabel,
          tabDetails: testTabDetails,
        },
      ],
    });

    service.addNavigationHistory(testEntity, testLabel, testTabDetails);
    service.historyChanged$.subscribe(() => {
      // this is to assert that history changed has been emitted
      expect(true).toBeTruthy();
    }, fail);

    expect(setItemSpy).toHaveBeenCalledWith(
      jasmine.any(String),
      expectedHistoryDict
    );
  }));

  it('should emit navigation request', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockHistoryDict)
    );
    const emitSpy = spyOn(service['_navigationRequestSource'], 'next');
    const tree = service.getNavigationHistoryTree();

    tree[0].children![0].children![0].callback!();

    expect(emitSpy).toHaveBeenCalled();
  });
});
