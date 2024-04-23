/**
 * Screen 1: Toolbar input QUICKSEARCH
 *
 * /quick-search/search?criteria=23-
 * Criteria - string
 *
 * TODO: NEED TO KNOW IS GET OR POST ...
 *
 * Order = 1. EVT | 2. PAR_EVT | 3. TXM | 4. NTXM | 5. CO
 *
 * "type" + " " + "code" + (" - " + "name")
 *
 * @example
 * "EVT 23581 - Test event"
 * "EVT 23582"
 */
export interface QuickSearchEntity {
  id: number;
  code: string;
  name?: string | null;
  type: QuickSearchEntityType;
}

export enum QuickSearchEntityType {
  EVT = 'EVT',
  PAR_EVT = 'PAR_EVT',
  TXM = 'TXM',
  NTXM = 'NTXM',
  CO = 'CO',
}

/**
 * Screen 2: API form request
 *
 * POST /events/search
 *
 * RequestBody: EventSearchCriteria
 * Response: List of EventSearchResultData
 */
export interface EventSearchResultData {
  no: number;
  id: number;
  isParent: boolean;
  periodBegin: LocalDate;
  periodEnd: LocalDate;
  description: string;
  eventType: string;
  city: string;
  contract: string;
  salesDeal: string;
  status: string;
  deadline?: LocalDate;
  category: string;
  subCategory: string;
  office: string;
  quoteId: string;
  notes: boolean;
  isPMO: boolean;
  parent: boolean;
}

/**
 * Screen 2: API form request
 *
 * POST /events/search
 *
 * RequestBody: EventSearchCriteria
 * Response: List of EventSearchResultData
 *
 * TODO: What is the "EVENT" input?
 */
export interface EventSearchCriteria {
  no: string;
  periodBegin?: LocalDate;
  periodEnd?: LocalDate;
  eventTypeList?: string[];
  statusList?: string;
  bureauList?: string;
  mediaList?: string;
  isParent?: boolean;
  isPMO?: boolean;
  city?: string;
  quoteId?: string;
  userGroup?: string[];
  parent?: boolean;
}

/**
 * Screen 2: API form request
 * Custom date representation [YEAR, MONTH, DAY, HOUR, MINUTE, SECONDS]
 * @example
 * [2023, 08, 25]
 */
export type LocalDate = [number, number, number, number?, number?, number?];

/**
 * Screen 2: Type COMBOBOX
 *
 * /domains/domain/{domainKeyCode}/items
 * domainKeyCode: "EVENT_TYPE"
 * Response: list of TypeCombobox
 * TODO: Remove any reference to this interface and use DomainItem model
 */
export interface TypeCombobox {
  version: number;
  id: number;
  sequence: number;
  keyCode: string;
  code: string;
  externalCode: string;
  label: string;
  extView: boolean;
  externalLabel: string;
  itemStatus: string;
  businessKey: string;
  new: boolean;
}

/**
 * Screen 2: Status COMBOBOX
 *
 * @example
 * | Code      | Label       | Tooltip   |
 * |-----------|-------------|-----------|
 * | REQUESTED | 'Requested' | REQUESTED |
 */

export enum StatusCombobox {
  REQUESTED = 'REQUESTED',
  REJECTED = 'REJECTED',
  CONFIRMED = 'CONFIRMED',
  PUBLISHED = 'PUBLISHED',
  PUBLISHED_NO_BOOKINGS = 'PUBLISHED_NO_BOOKINGS',
  CANCELLED = 'CANCELLED',
  BINNED = 'BINNED',
  COMPLETED = 'COMPLETED',
  DRAFT = 'DRAFT',
  NO_INTEREST = 'NO_INTEREST',
}

/**
 * Screen 2: Bureau COMBOBOX
 *
 * /domains/domain/{domainKeyCode}/items
 * domainKeyCode: "BUREAU"
 * Response: list of BureauCombobox
 */
export interface BureauCombobox {
  version: number;
  id: number;
  sequence: number;
  keyCode: string;
  code: string;
  externalCode: string;
  label: string;
  extView: boolean;
  externalLabel: string;
  itemStatus: string;
  businessKey: string;
  new: boolean;
}

/**
 * Screen 2: City COMBOBOX
 *
 * /cities/search
 * RequestBody: SearchCriteria
 * Response: List of CityCombobox
 */
export interface CityCombobox {
  version: number;
  id: number;
  code: string;
  name: string;
  alias1: string | null;
  alias2: string | null;
  alias3: string | null;
  country: Country;
  extName: string;
  utc: string;
  extView: string | boolean;
  businessKey: string;
  new: boolean;
}

/**
 * Screen 2: Media COMBOBOX
 *
 * @example
 * | Code | Label      |
 * |------|------------|
 * | TV   | Television |
 */
export enum MediaCombobox {
  TV = 'TV',
  TV_RADIO = 'TV_RADIO',
  RADIO = 'RADIO',
}

export interface Country {
  version: number;
  id: number;
  code: string;
  name: string;
  alias1: string | null;
  alias2: string | null;
  alias3: string | null;
  extName: string | null;
  extView: boolean;
  daylightSavingTime: boolean;
  usRestriction: boolean;
  area: {
    version: number;
    id: number;
    sequence: number;
    keyCode: string;
    code: string;
    isoCode: any;
    externalCode: string | null;
    label: string;
    extView: boolean;
    externalLabel: string | null;
    itemStatus: string;
    businessKey: string;
    new: boolean;
  };
  businessKey: string;
  new: boolean;
}

export interface OrganizationSearchResultDTO {
  id: number;
  version: number;
  code: string;
  name: string;
  country: Country | string;
  financialStatusType: string;
  type: string;
  customer: string;
  provider: string;
  active: string;
  defaultCity:
    | {
        id: number;
        code: string;
        name: string;
        alias1: string;
        alias2: string;
        alias3: string;
        country: Country;
        extName: string;
        utc: string;
        extView: string;
        businessKey: string;
        new: boolean;
      }
    | string;
  defaultPhone: string;
  poRefMandatory: string;
  billedCurrencyLocked: string;
  defaultMail: string;
  defaultSystem: TypeCombobox;
}

export interface SearchCriteria {
  first?: number;
  max?: number;
  orders?: {
    identifier: string;
    asc: boolean;
  }[];
  terms?: Term[];
  relations?: Relation[];
  values?: Record<string, any>;
}

export interface SearchOrganizationFormValue {
  code?: string;
  name?: string;
  type?: any[];
  country?: any[];
  defaultCity?: any[];
  financialStatusType?: any[];
  isCustomer?: YesNoOption[];
  isProvider?: YesNoOption[];
  isActive?: YesNoOption[];
  isBilledCurrencyLocked?: YesNoOption[];
  isPoRefMandatory?: YesNoOption[];
}

export interface Term {
  identifier: string;
  value: string;
  type: string;
  likeType?: string;
  operator?: boolean;
}

export interface Relation {
  type: string;
  relationEntity: string;
  terms: RelationTerm[];
  subJoin: any;
  joinType: string;
}

export interface RouteData {
  resolveItems: RequestConfig[];
}

interface RequestConfig {
  url: string;
  method: string;
  body?: SearchCriteria;
  params?: string;
}

export interface RelationTerm {
  identifier: string;
  value: string;
  type: string;
  privateOperator: boolean;
}

export interface SearchOrganizationDataSource {
  id: number;
  version: number;
  code: string;
  name: string;
  financialStatusType: string;
  type: string;
  customer: string;
  provider: string;
  active: string;
  defaultPhone: string;
  poRefMandatory: string;
  billedCurrencyLocked: string;
  country: string | undefined;
  city: string | undefined;
  defaultSystem: string;
  defaultMail: string;
}

export enum DisplayedColumns {
  Code = 'code',
  Name = 'name',
  Type = 'type',
  Country = 'country',
  City = 'city',
  financialStatusType = 'financialStatusType',
  Customer = 'customer',
  Provider = 'provider',
  Active = 'active',
  DefaultPhone = 'defaultPhone',
  DefaultMail = 'defaultMail',
  DefaultSystem = 'defaultSystem',
  ColumnsSelector = 'columnsSelector',
}

export enum YesNoOption {
  Yes = 'Y',
  No = 'N',
}

export interface KeyValueObject {
  key: string;
  value: string;
}

export enum TypeOption {
  MEMB = 'MEMB',
  NMEMB = 'NMEMB',
  NA = 'N/A',
  APPP = 'APPP',
  ASSM = 'ASSM',
}

export enum FinancialStatusOption {
  BL = 'BL',
  PP = 'PP',
  OK = 'OK',
}
