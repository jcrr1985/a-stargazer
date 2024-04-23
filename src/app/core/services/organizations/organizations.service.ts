import { Injectable } from '@angular/core';
import {
  OrganizationSearchResultDTO,
  Relation,
  SearchCriteria,
  SearchOrganizationFormValue,
  Term,
} from '@models/models';
import { OrganizationEmbeddedDTO } from '@models/organization-embedded-dto.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  private _endpointURL = '/organizations';

  constructor(private readonly apiService: ApiService) {}

  getOrganizationsByTransmissionIdList(
    transmissionIds: number[]
  ): Observable<OrganizationEmbeddedDTO[]> {
    return this.apiService.create<OrganizationEmbeddedDTO[]>(
      `${this._endpointURL}/findOrganizationList`,
      {
        body: transmissionIds,
      }
    );
  }

  getFilteredOrganizations(
    searchCriteria: string,
    limit = 1000
  ): Observable<OrganizationEmbeddedDTO[]> {
    return this.apiService.create<OrganizationEmbeddedDTO[]>(
      `${this._endpointURL}/embedded/search`,
      {
        body: {
          first: 0,
          max: limit,
          orders: [
            {
              identifier: 'code',
              asc: true,
            },
          ],
          terms: [
            {
              identifier: 'null',
              value: null,
              type: 'Or',
              terms: [
                {
                  identifier: 'code',
                  value: searchCriteria,
                  type: 'Like',
                  likeType: 'CONTAINS',
                  operator: true,
                },
                {
                  identifier: 'name',
                  value: searchCriteria,
                  type: 'Like',
                  likeType: 'CONTAINS',
                  operator: true,
                },
              ],
            },
          ],
          relations: [],
          values: {},
        },
      }
    );
  }

  searchOrganization(
    formValue: SearchOrganizationFormValue
  ): Observable<OrganizationSearchResultDTO[]> {
    let terms: Term[] = [];

    // if country or city control was selected,  "terms.value" in "countryRelation" and "citiesRelation" will be set
    const countryRelation: Relation = {
      type: 'Join',
      relationEntity: 'country',
      terms: [
        {
          identifier: 'code',
          value: '',
          type: 'Eq',
          privateOperator: true,
        },
      ],
      subJoin: null,
      joinType: 'INNER',
    };

    const citiesRelation: Relation = {
      type: 'Join',
      relationEntity: 'defaultCity',
      terms: [
        {
          identifier: 'code',
          value: '',
          type: 'Eq',
          privateOperator: true,
        },
      ],
      subJoin: null,
      joinType: 'INNER',
    };

    // iterating over formValue object to set body of request
    Object.entries(formValue).forEach(([key, value]) => {
      let formattedValue;
      // setting value of term object
      if (value) {
        // if control is object -> formattedValue === value.name, else -> formattedValue = value
        formattedValue =
          (Array.isArray(value) && value.length > 0) ||
          typeof value === 'string'
            ? value
            : value.name;

        // setting like, likeType and operators

        // if control is string
        if (
          typeof value === 'string' &&
          key != 'country' &&
          key != 'defaultCity'
        ) {
          terms.push({
            identifier: key,
            value: value,
            type: 'Like',
            likeType: 'CONTAINS',
            operator: true,
          });
        }
        // if control is Y or N type
        if (
          (key === 'isCustomer' ||
            key === 'isProvider' ||
            key === 'isActive' ||
            key === 'isPoRefMandatory' ||
            key === 'isBilledCurrencyLocked') &&
          value.length > 0
        ) {
          terms.push({
            identifier: key,
            value: value,
            type: 'In',
          });
        }

        // if control is multiple select
        if (
          (key === 'type' || key === 'financialStatusType') &&
          value.length > 0
        ) {
          terms.push({
            identifier: key,
            value: value,
            type: 'In',
          });
        }

        // if control is country or city
        if (key === 'country' || key === 'defaultCity') {
          if (key === 'country') {
            countryRelation.terms[0].value = value.code;
          } else {
            citiesRelation.terms[0].value = value.code;
          }
        }
      }
    });

    // default mandatory values for relations properties
    const relations: Relation[] = [
      {
        type: 'Fetch',
        relationEntity: 'country',
        terms: [],
        subJoin: null,
        joinType: 'INNER',
      },
      {
        type: 'Fetch',
        relationEntity: 'defaultCity',
        terms: [],
        subJoin: null,
        joinType: 'INNER',
      },
    ];

    // Optional values for relations properties (if control is country or city)
    countryRelation.terms[0].value && relations.push(countryRelation);
    citiesRelation.terms[0].value && relations.push(citiesRelation);

    const body: SearchCriteria = {
      first: 0,
      max: 1000,
      orders: [],
      terms: [...terms],
      relations: [...relations],
      values: {},
    };

    return this.apiService.create<OrganizationSearchResultDTO[]>(
      '/organizations/result/search',
      { body }
    );
  }
}
