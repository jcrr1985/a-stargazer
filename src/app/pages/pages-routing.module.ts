import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '@constants/app-routes';
import { EntityType } from '@constants/entities';
import { ResolverService } from '@resolvers/resolver-service.resolver';
import { OpenTabGuard } from '../core/guards/open-tab.guard';
import { CreateEditIncidentComponent } from './create-edit-incident/create-edit-incident.component';
import { DiscountManagerComponent } from './domain-manager/components/discount-manager/discount-manager.component';
import { DomainManagerComponent } from './domain-manager/domain-manager.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages.component';
import { SearchEventComponent } from './search-event/search-event.component';
import { SearchOrganizationComponent } from './search-organization/search-organization.component';

const routes: Routes = [
  {
    path: appRoutes.HOME,
    component: PagesComponent,
    canActivateChild: [OpenTabGuard],
    children: [
      {
        path: appRoutes.DOMAIN_MANAGER,
        component: DomainManagerComponent,
      },
      {
        path: `${EntityType.INCIDENT}`,
        children: [
          {
            path: ':id',
            component: CreateEditIncidentComponent,
          },
        ],
      },
      {
        path: `${EntityType.EVENT}`,
        children: [
          {
            path: `${appRoutes.SEARCH}/:id`,
            component: SearchEventComponent,
          },
        ],
      },
      {
        path: `${EntityType.ORGANIZATION}`,
        children: [
          {
            path: `${appRoutes.SEARCH}/:id`,
            component: SearchOrganizationComponent,
          },
        ],
      },
      {
        path: `${EntityType.DISCOUNT_MANAGER}`,
        component: DiscountManagerComponent,
      },
      {
        path: appRoutes.NOT_FOUND,
        component: NotFoundComponent,
        pathMatch: 'full',
      },
    ],
    resolve: {
      masterDataResolver: ResolverService,
    },
    data: {
      resolveItems: [
        {
          resolveKey: 'countries',
          url: '/countries/search',
          method: 'post',
          body: {
            orders: [
              {
                identifier: 'name',
                asc: true,
              },
            ],
          },
        },
        {
          resolveKey: 'cities',
          url: '/cities/search',
          method: 'post',
          body: {
            orders: [
              {
                identifier: 'name',
                asc: true,
              },
            ],
          },
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
