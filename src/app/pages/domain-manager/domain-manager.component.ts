import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomainListsResponseDTO } from '@models/domain-lists-response-dto.model';
import { DomainMapping } from '@models/domain-mapping.model';
import { DomainParameter } from '@models/domain-parameter.model';
import { DomainsService } from '@services/domains/domains.service';
import { TabsService } from '@services/tabs/tabs.service';
import { Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-domain-manager',
  templateUrl: './domain-manager.component.html',
  styleUrls: ['./domain-manager.component.scss'],
})
export class DomainManagerComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  domainMappings: DomainMapping[] = [];
  domainParameters: DomainParameter[] = [];
  body: string = 'home';

  constructor(
    private readonly domainsService: DomainsService,
    private readonly tabsService: TabsService,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const tabContextData = this.tabsService.getActiveTabData().contextData;
    if (tabContextData?.domains) {
      this.domainMappings = [...tabContextData.domains.domainMappings];
      this.domainParameters = [...tabContextData.domains.domainParameters];
    } else {
      this.fetchDomains();
    }
  }

  ngOnDestroy(): void {
    this.snackbar.dismiss();
    this.onDestroy$.next();
  }

  handleDataChanged(updatedDomainParameters: DomainParameter[]) {
    this.domainParameters = [...updatedDomainParameters];
    this.tabsService.patchActiveTabContext({
      domains: {
        domainMappings: [...this.domainMappings],
        domainParameters: [...this.domainParameters],
      },
    });
    this.tabsService.setTabEditing(this.tabsService.activeTabId, true);
  }

  saveDomains() {
    const saveDto: DomainListsResponseDTO = {
      domainMappings: this.domainMappings,
      domainParameters: this.domainParameters,
    };

    this.domainsService
      .saveAll(saveDto)
      .pipe(
        tap(() => {
          this.snackbar.dismiss();
        }),
        take(1)
      )
      .subscribe(
        (response) => {
          this.tabsService.setTabEditing(this.tabsService.activeTabId, false);
          this.snackbar.open('Saved successfully!', 'Close');
          this.domainMappings = response.domainMappings;
          this.domainParameters = response.domainParameters;
          this.tabsService.patchActiveTabContext({
            domains: {
              domainMappings: [...response.domainMappings],
              domainParameters: [...response.domainParameters],
            },
          });
        },
        (data) => {
          const errorMessage =
            data.error?.errors[0]?.messages[0]?.description ??
            'Unexpected error';
          this.snackbar.open(errorMessage, 'Close');
        }
      );
  }

  fetchDomains() {
    this.domainsService
      .listAll()
      .pipe(
        tap(() => {
          this.tabsService.setTabEditing(this.tabsService.activeTabId, false);
          this.domainMappings = [];
          this.domainParameters = [];
        }),
        take(1),
        takeUntil(this.onDestroy$)
      )
      .subscribe((response) => {
        this.domainMappings = response.domainMappings;
        this.domainParameters = response.domainParameters;
        this.tabsService.patchActiveTabContext({
          domains: {
            domainMappings: [...response.domainMappings],
            domainParameters: [...response.domainParameters],
          },
        });
      });
  }

  closePage() {
    this.tabsService.removeTab(this.tabsService.activeTabId);
  }
}
