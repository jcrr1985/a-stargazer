import { ProductEmbeddedDTO } from '@models/product-embedded-dto.model';
import { of } from 'rxjs';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let apiServiceSpy: { create: jasmine.Spy };
  let fakeProducts: ProductEmbeddedDTO[];

  beforeEach(() => {
    fakeProducts = [
      {
        id: 317,
        version: 1,
        code: 'CDN',
        name: 'Content Delivery Network',
        productType: 'OTHER',
        productCategory: 'NONTRANSMISSION',
        isMainProduct: true,
        isAssociatedProduct: false,
        price: {
          amount: 0.0,
          currency: {
            version: 0,
            id: 170,
            code: 'EUR',
            name: 'EUR',
            businessKey: 'EUR',
            new: false,
          },
          negative: false,
          zero: true,
          positive: false,
          notZero: false,
        },
        priceUnit: 'UNIT',
        invoiceOrganization: {
          id: 12791,
          version: 211,
          code: 'ZZEBU',
          name: 'European Broadcasting Union/Union Européenne de Radiotélévision',
        },
        deadline: null,
        quantity: 0,
        description:
          'Content delivery network such as Akamai used for live streaming and VOD. Product used to invoice customer according to Akamai invoices.',
        associatedProduct: false,
        mainProduct: true,
      },
    ];
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['create']);
    service = new ProductsService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    apiServiceSpy.create.and.returnValue(of(fakeProducts));

    service.getAllProducts().subscribe((res) => {
      expect(res).toEqual(fakeProducts);
    }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith(
      '/products/light/search',
      {
        body: {
          orders: [
            {
              identifier: 'code',
              asc: true,
            },
          ],
        },
      }
    );
  });
});
