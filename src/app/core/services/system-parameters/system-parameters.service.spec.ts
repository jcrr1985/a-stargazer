import { SynopsisHeader } from '@models/synopsis-header.model';
import { of } from 'rxjs';
import { SystemParametersService } from './system-parameters.service';

describe('SystemParametersService', () => {
  let service: SystemParametersService;
  let apiServiceSpy: {
    create: jasmine.Spy;
    read: jasmine.Spy;
    delete: jasmine.Spy;
  };
  let fakeSynopsisHeaders: SynopsisHeader[];

  beforeEach(() => {
    fakeSynopsisHeaders = [
      {
        version: 44,
        id: 2,
        html: '<p><strong><span style="color: #ff0000;">As we are entering this year\'s late season sun outages, please remember to check your reception sites and take appropriate measures to secure your downlinks. For further information on sun outages, please see <a href="https://www.eurovision.net/insights/technical/sun-outages-autumn-2023">this</a> page on our website.</span></strong></p>',
        resourceProfile: {
          version: 0,
          id: 5,
          code: 'SAT',
          name: 'Satellite',
          type: 'CONNECTABLE',
          status: 'ACTIVE',
          mobileResource: false,
          contacts: true,
          canHaveProduct: true,
          input: false,
          output: false,
          required: false,
          locked: false,
          allowSynopsisNote: false,
          abbreviation: 'SAT',
          overallBitrateManagement: false,
          businessKey: 'SAT',
          new: false,
        },
        resource: null,
        showForChildren: true,
        active: true,
        new: false,
      },
      {
        version: 1,
        id: 5,
        html: '<div style="background-color: #f2f2f2">The Hypermux 5 (HM5) will be available from 17 October 2018 on SES-14 transponder HEL-19/HER-19, and will broadcast the same content as IS-34 transponder AE01C until 31 December 2018.<br/>From 1 January 2019 HM5 will be operational only on SES-14.<br/><br/><a href="https://bit.ly/2CoO4ms">https://bit.ly/2CoO4ms</a></div>',
        resourceProfile: null,
        resource: {
          type: 'CONNECTABLE',
          version: 12,
          id: 37047,
          correlationId: null,
          code: 'GNVE ZZEBU/OLD HM5',
          codeLocal: 'OLD HM5',
          name: 'OLD HM5',
          resourceProfile: {
            version: 1,
            id: 62,
            code: 'MUX',
            name: 'Multiplexer',
            type: 'CONNECTABLE',
            status: 'ACTIVE',
            mobileResource: false,
            contacts: true,
            canHaveProduct: false,
            input: true,
            output: true,
            required: false,
            locked: false,
            allowSynopsisNote: false,
            abbreviation: null,
            overallBitrateManagement: true,
            businessKey: 'MUX',
            new: false,
          },
          status: 'ARCHIVED',
          event: null,
          extView: false,
          externalCode: null,
          externalName: '',
          automaticPO: false,
          routingCode: null,
          bufferBefore: null,
          bufferAfter: null,
          scheduleSequence: null,
          evcViewCode: 'Hm5',
          automaticallyGenerated: false,
          parent: {
            version: 12,
            id: 365,
            type: 'CONNECTABLE',
            correlationId: '4144310020019',
            code: 'GNVE ZZEBU',
            codeLocal: 'GNVE ZZEBU',
            name: 'EBU Geneva',
            resourceProfile: {
              version: 2,
              id: 14,
              code: 'NODE',
              name: 'Node',
              type: 'CONNECTABLE',
              status: 'ACTIVE',
              mobileResource: false,
              contacts: true,
              canHaveProduct: true,
              input: false,
              output: false,
              required: false,
              locked: false,
              allowSynopsisNote: false,
              abbreviation: null,
              overallBitrateManagement: false,
              businessKey: 'NODE',
              new: false,
            },
            status: 'ACTIVE',
            event: null,
            extView: true,
            externalCode: null,
            externalName:
              'European Broadcasting Union/Union Européenne de Radiotélévision',
            automaticPO: false,
            routingCode: null,
            bufferBefore: null,
            bufferAfter: null,
            scheduleSequence: 1,
            evcViewCode: 'GNVE',
            automaticallyGenerated: false,
            parent: null,
            city: {
              version: 3,
              id: 4334,
              code: 'GNVE',
              name: 'Geneva',
              alias1: null,
              alias2: null,
              alias3: null,
              country: {
                version: 0,
                id: 122,
                code: 'CH',
                name: 'SWITZERLAND',
                alias1: null,
                alias2: null,
                alias3: null,
                extName: null,
                extView: true,
                daylightSavingTime: true,
                usRestriction: false,
                area: {
                  version: 0,
                  id: 377,
                  sequence: 10,
                  keyCode: 'AREA@A_EUROPE',
                  code: 'A_EUROPE',
                  isoCode: null,
                  externalCode: null,
                  label: 'Europe',
                  extView: true,
                  externalLabel: null,
                  itemStatus: 'ACTIVE',
                  businessKey: 'AREA@A_EUROPE',
                  new: false,
                },
                businessKey: 'CH',
                new: false,
              },
              extName: 'Geneva',
              utc: '+01:00',
              extView: true,
              businessKey: 'GNVE',
              new: false,
            },
            allocationControl: true,
            resourceWarningWhenUsed: null,
            resourceProperties: null,
            template: false,
            system: false,
            availabilityDefinitions: null,
            alwaysAvailable: true,
            organizationMessagings: null,
            contacts: null,
            temporaryContacts: null,
            ownerShipType: null,
            archiveDate: null,
            category: null,
            subCategory: null,
            address: "Rue l'Ancienne-Route 17A",
            description: null,
            noteChanges: {
              notesChanged: [],
              notesRemoved: [],
            },
            groupOfResources: false,
            blackListed: false,
            equipment: null,
            overallBitratePeriods: null,
            ownershipTypePeriods: null,
            satellite: null,
            originBc: null,
            destinationBc: null,
            networkResource: false,
            bookingResourceType: 'STANDARD',
            d2FPortOrService: false,
            d2FVideoService: false,
            d2FDataService: false,
            specificForAnEvent: false,
            businessKey: 'GNVE ZZEBU',
            entityType: 'RESOURCE',
            d2FService: false,
            entityIdentifier: 'GNVE ZZEBU',
            new: false,
          },
          city: null,
          allocationControl: true,
          resourceWarningWhenUsed: null,
          resourceProperties: null,
          template: true,
          system: false,
          availabilityDefinitions: null,
          alwaysAvailable: true,
          organizationMessagings: null,
          contacts: null,
          temporaryContacts: null,
          ownerShipType: null,
          archiveDate: [2021, 1, 8, 0, 11, 26],
          category: null,
          subCategory: null,
          address: null,
          description: null,
          noteChanges: {
            notesChanged: [],
            notesRemoved: [],
          },
          groupOfResources: false,
          blackListed: false,
          equipment: null,
          overallBitratePeriods: null,
          ownershipTypePeriods: null,
          satellite: null,
          originBc: null,
          destinationBc: null,
          networkResource: false,
          bookingResourceType: 'STANDARD',
          d2FPortOrService: false,
          d2FVideoService: false,
          d2FDataService: false,
          specificForAnEvent: false,
          businessKey: 'GNVE ZZEBU/OLD HM5',
          entityType: 'RESOURCE',
          d2FService: false,
          entityIdentifier: 'GNVE ZZEBU/OLD HM5',
          new: false,
        },
        showForChildren: true,
        active: false,
        new: false,
      },
    ];
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'create',
      'read',
      'delete',
    ]);
    service = new SystemParametersService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch synopsis headers', () => {
    apiServiceSpy.read.and.returnValue(of(fakeSynopsisHeaders));

    service.getSynopsisHeaders().subscribe((res) => {
      expect(res).toEqual(fakeSynopsisHeaders);
    }, fail);

    expect(apiServiceSpy.read).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.read).toHaveBeenCalledWith(
      '/system-parameters/synopsis-headers'
    );
  });

  it('should save synopsis headers', () => {
    const fakeSaveData = [fakeSynopsisHeaders[0]];
    apiServiceSpy.create.and.returnValue(of(fakeSynopsisHeaders));

    service.saveSynopsisHeaders(fakeSaveData).subscribe((res) => {
      expect(res).toEqual(fakeSynopsisHeaders);
    }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith(
      '/system-parameters/synopsis-headers',
      { body: fakeSaveData }
    );
  });

  it('should delete synopsis headers by id', () => {
    const testIdToDelete = 1;
    apiServiceSpy.delete.and.returnValue(of());

    service.deleteSynopsisHeadersById(testIdToDelete).subscribe((res) => {
      expect(res).toEqual();
    }, fail);

    expect(apiServiceSpy.delete).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.delete).toHaveBeenCalledWith(
      `/system-parameters/synopsis-headers/${testIdToDelete}`
    );
  });
});
