import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceOrganization } from '@models/invoice-organization.model';
import { LoyaltyProgramDTO } from '@models/loyalty-program-dto.model';
import { LocalDate } from '@models/models';
import { OrganizationEmbeddedDTO } from '@models/organization-embedded-dto.model';
import { LoyaltyProgramsService } from '@services/loyalty-programs/loyalty-programs.service';
import { OrganizationsService } from '@services/organizations/organizations.service';
import { ProductsService } from '@services/products/products.service';
import { DiscountManagerDialogComponent } from '@shared/components/discount-manager-dialog/discount-manager-dialog.component';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  ColumnsConfiguration,
  DataColumnName,
  NoDataColumnName,
  RowEvent,
  TableOptions,
} from 'table-generator';

export enum TableId {
  MAIN = 'main',
  ITEMS = 'items',
}

export interface Product {
  id: number;
  version: number;
  code: string;
  name: string;
  productType: string;
  productCategory: string;
  isMainProduct: boolean;
  isAssociatedProduct: boolean;
  price: {
    amount: number;
    currency: {
      version: number;
      id: number;
      code: string;
      name: string;
      businessKey: string;
      new: boolean;
    };
    negative: boolean;
    zero: boolean;
    positive: boolean;
    notZero: boolean;
  };
  priceUnit: string;
  invoiceOrganization: {
    id: number;
    version: number;
    code: string;
    name: string;
  };
  deadline: null | string;
  quantity: number;
  description: string;
  associatedProduct: boolean;
  mainProduct: boolean;
}

export interface DiscountManager {
  id: number;
  accumulated: boolean;
  organization: string;
  product: string;
  discountType: string;
  discount: string;
  discountStart: LocalDate;
  discountEnd: LocalDate;
  offPeakStart: string;
  offPeakEnd: string;
  isOssOrigin: boolean;
  isWithAssociation: string;
  items: any[];
}

interface DisCouuntManagerDialogDataDTO {
  organizations: InvoiceOrganization[];
  products: Product[];
  loyaltyPrograms: LoyaltyProgramDTO[];
}

interface OffPeakange {
  name: string;
}

@Component({
  selector: 'app-discount-manager',
  templateUrl: './discount-manager.component.html',
  styleUrls: ['./discount-manager.component.scss'],
})
export class DiscountManagerComponent implements OnInit, OnDestroy {
  constructor(
    private readonly dialog: MatDialog,
    private loyaltyProgramsService: LoyaltyProgramsService,
    private readonly productService: ProductsService,
    private readonly organizationService: OrganizationsService
  ) {}

  dialogOrganizations: InvoiceOrganization[] | any[] = [];
  discounts: any[] = [];
  data: LoyaltyProgramDTO[] = [];
  dialogProducts: any[] = [];
  offPeakStart!: OffPeakange[];
  offPeakEnd!: OffPeakange[];
  clickedRow: any | null = null;
  editedIndex!: number;

  public TableId = TableId;

  onDataChanged = new EventEmitter<DiscountManager[]>();

  columnsConfiguration: ColumnsConfiguration | any = {
    accumulated: {
      translateKey: 'accumulated',
      type: 'checkbox',
    },
    organization: {
      translateKey: 'organization',
      type: 'object',
      displayWith: (organization: OrganizationEmbeddedDTO) =>
        organization?.name,
    },
    product: {
      translateKey: 'product',
      type: 'string',
    },
    discountType: {
      translateKey: 'discountType',
      type: 'string',
    },
    discount: {
      translateKey: 'discount',
      type: 'string',
    },
    startDate: {
      translateKey: 'startDate',
      type: 'string',
    },
    endDate: {
      translateKey: 'endDate',
      type: 'string',
    },

    offPeakStart: {
      translateKey: 'offPeakStart',
      type: 'string',
    },

    offPeakEnd: {
      translateKey: 'offPeakEnd',
      type: 'string',
    },
    isOssOrigin: {
      translateKey: 'isOssOrigin',
      type: 'boolean',
    },

    isWithAssociatedProduct: {
      translateKey: 'isWithAssociatedProduct',
      type: 'string',
    },
  };

  itemsTableColumns: DataColumnName[] = [
    'accumulated',
    'organization',
    'product',
    'discountType',
    'discount',
    'startDate',
    'endDate',
    'offPeakStart',
    'offPeakEnd',
    'isOssOrigin',
    'isWithAssociatedProduct',
    NoDataColumnName.columnsSelector,
  ];

  _onDestroy$ = new Subject<void>();

  itemsTableOptions: Partial<TableOptions> = {
    showResult: false,
  };

  ngOnInit(): void {
    forkJoin({
      organizations: this.organizationService.getFilteredOrganizations(''),
      products: this.productService.getAllProducts(),
      loyaltyPrograms: this.loyaltyProgramsService.getAllLoyaltyPrograms(),
    })
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((results: DisCouuntManagerDialogDataDTO | any) => {
        this.data = results.loyaltyPrograms;

        this.data.forEach((date: any) => {
          date.startDate = new Date(date.startDate).toLocaleDateString('en-GB');
          date.endDate = new Date(date.endDate).toLocaleDateString('en-GB');
        });

        this.dialogOrganizations = results.organizations;

        this.dialogProducts = results.products;

        this.offPeakStart = [
          { name: '00:00' },
          { name: '01:00' },
          { name: '02:00' },
        ];

        this.offPeakEnd = [
          { name: '00:00' },
          { name: '01:00' },
          { name: '02:00' },
        ];
      });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onRowClicked({ row }: RowEvent<LoyaltyProgramDTO>) {
    this.clickedRow = null;

    if (row) {
      this.clickedRow = row;
    }
  }

  async onRowDoubleClicked({ row }: RowEvent<LoyaltyProgramDTO>) {
    this.editedIndex = this.data.findIndex(
      (domainParam) => domainParam.id === row.id
    );

    const edited = await this.openItemDialog(row as any);
    edited.startDate = new Date(edited.startDate).toLocaleDateString('en-GB');
    edited.endDate = new Date(edited.endDate).toLocaleDateString('en-GB');
    edited.offPeakStart = new Date(edited.offPeakStart).toLocaleDateString(
      'en-GB'
    );
    edited.offPeakEnd = new Date(edited.offPeakEnd).toLocaleDateString('en-GB');

    if (edited) {
      this.data[this.editedIndex] = edited;
      this.data = [...this.data];
    }
  }

  openItemDialog(discountManager: any): Promise<any> {
    const itemFormDialog = this.dialog.open(DiscountManagerDialogComponent, {
      width: 'fit-content',
      disableClose: true,
      data: {
        data: this.data,
        row: discountManager,
        editedIndex: this.editedIndex,
        organizations: this.dialogOrganizations,
        products: this.dialogProducts,
        discountType: [DiscountType.fixed, DiscountType.percentage],
        offPeakStart: this.offPeakStart,
        offPeakEnd: this.offPeakEnd,
      },
    });

    return itemFormDialog
      .afterClosed()
      .pipe(tap(() => takeUntil(this._onDestroy$)))
      .toPromise();
  }
}

enum DiscountType {
  percentage = 'PERCENTAGE',
  fixed = 'FIXED',
}
