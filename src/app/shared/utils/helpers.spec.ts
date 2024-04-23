import {
  LocalDate,
  QuickSearchEntity,
  QuickSearchEntityType,
} from '@models/models';
import {
  constructUrlWithParams,
  dateToLocalDate,
  fileToBase64,
  filterObjectArrayByProperty,
  localDateToDate,
  sortArrayByObjectKey,
  sortResultsByTypeOrder,
} from './helpers';

describe('helpers', () => {
  const hour = 12;
  const minute = 0;
  const seconds = 1;
  const year = 1991;
  const month = 10;
  const date = 15;

  describe('dateToLocalDateArray', () => {
    it('should parse from Date to LocalDate correctly', () => {
      const fakeDate = new Date(year, month - 1, date, hour, minute, seconds);

      const result = dateToLocalDate(fakeDate);

      expect(result).toEqual([year, month, date, hour, minute, seconds]);
    });
  });

  describe('dateToLocalDateArray', () => {
    it('should parse from LocalDate to Date correctly', () => {
      const fakeLocalDate: LocalDate = [
        year,
        month,
        date,
        hour,
        minute,
        seconds,
      ];
      const expectedDate = new Date(
        year,
        month - 1,
        date,
        hour,
        minute,
        seconds
      );

      const result = localDateToDate(fakeLocalDate);

      expect(result).toEqual(expectedDate);
    });
  });

  describe('fileToBase64', () => {
    it('should parse File to B64', (done) => {
      const fakeFile = new File(['ab', '00'], 'file.txt');

      fileToBase64(fakeFile).subscribe((res) => {
        expect(res).toEqual('YWIwMA==');
        done();
      });
    });
  });

  describe('constructUrlWithParams', () => {
    it('should construct a URL with query parameters', () => {
      const url = 'https://example.com';
      const paramsObj = { foo: 'bar', baz: 'qux' };
      const constructedUrl = constructUrlWithParams(url, paramsObj);
      expect(constructedUrl).toEqual('https://example.com?foo=bar&baz=qux');
    });

    it('should return the URL without query parameters if paramsObj is null', () => {
      const url = 'https://example.com';
      const paramsObj = null;
      const constructedUrl = constructUrlWithParams(url, paramsObj);
      expect(constructedUrl).toEqual('https://example.com');
    });
  });

  describe('sortResultsByTypeOrder', () => {
    it('should sort QuickSearchEntity[] by type order', () => {
      const results: QuickSearchEntity[] = [
        {
          id: 1,
          name: 'Event 1',
          type: QuickSearchEntityType.EVT,
          code: 'EVT',
        },
        {
          id: 2,
          name: 'Participant Event 1',
          type: QuickSearchEntityType.PAR_EVT,
          code: 'EVT',
        },
        {
          id: 4,
          name: 'Non-Transaction 1',
          type: QuickSearchEntityType.NTXM,
          code: 'EVT',
        },
        {
          id: 3,
          name: 'Transaction 1',
          type: QuickSearchEntityType.TXM,
          code: 'EVT',
        },

        {
          id: 5,
          name: 'Company 1',
          type: QuickSearchEntityType.CO,
          code: 'EVT',
        },
      ];

      const sortedResults = sortResultsByTypeOrder(results);

      expect(sortedResults).toEqual([
        {
          id: 1,
          name: 'Event 1',
          type: QuickSearchEntityType.EVT,
          code: 'EVT',
        },
        {
          id: 2,
          name: 'Participant Event 1',
          type: QuickSearchEntityType.PAR_EVT,
          code: 'EVT',
        },
        {
          id: 3,
          name: 'Transaction 1',
          type: QuickSearchEntityType.TXM,
          code: 'EVT',
        },
        {
          id: 4,
          name: 'Non-Transaction 1',
          type: QuickSearchEntityType.NTXM,
          code: 'EVT',
        },
        {
          id: 5,
          name: 'Company 1',
          type: QuickSearchEntityType.CO,
          code: 'EVT',
        },
      ]);
    });
  });

  describe('filterObjectArrayByProperty', () => {
    it('should filter object array by property correctly', () => {
      type TestType = { name: string };
      const fakeObjectList: TestType[] = [
        { name: 'Manuel' },
        { name: 'Miguel' },
      ];
      const testFilterValue = 'migu';

      const filteredList = filterObjectArrayByProperty<TestType>(
        testFilterValue,
        fakeObjectList,
        'name'
      );

      expect(filteredList.length).toEqual(1);
      expect(filteredList).toContain(fakeObjectList[1]);
    });

    it('should return all elements when value is empty', () => {
      type TestType = { name: string };
      const fakeObjectList: TestType[] = [
        { name: 'Manuel' },
        { name: 'Miguel' },
      ];
      const testFilterValue = '';

      const filteredList = filterObjectArrayByProperty<TestType>(
        testFilterValue,
        fakeObjectList,
        'name'
      );

      expect(filteredList).toEqual(fakeObjectList);
    });

    it('should return an empty array when nothing matches', () => {
      type TestType = { name: string };
      const fakeObjectList: TestType[] = [
        { name: 'Manuel' },
        { name: 'Miguel' },
      ];
      const testFilterValue = 'Julio';

      const filteredList = filterObjectArrayByProperty<TestType>(
        testFilterValue,
        fakeObjectList,
        'name'
      );

      expect(filteredList).toEqual([]);
    });
  });

  describe('sortArrayByObjectKey', () => {
    it('should sort ascending correctly', () => {
      const people = [
        {
          name: 'Paco',
          lastName: 'De Lucia',
        },
        {
          name: 'John',
          lastName: 'Frusciante',
        },
        {
          name: 'Gustavo',
          lastName: 'Cerati',
        },
      ];

      const sortedResults = sortArrayByObjectKey(people, 'lastName');

      expect(sortedResults).toEqual([
        {
          name: 'Gustavo',
          lastName: 'Cerati',
        },
        {
          name: 'Paco',
          lastName: 'De Lucia',
        },
        {
          name: 'John',
          lastName: 'Frusciante',
        },
      ]);
    });
    it('should sort descending correctly', () => {
      const people = [
        {
          name: 'Paco',
          lastName: 'De Lucia',
        },
        {
          name: 'John',
          lastName: 'Frusciante',
        },
        {
          name: 'Gustavo',
          lastName: 'Cerati',
        },
      ];

      const sortedResults = sortArrayByObjectKey(people, 'lastName', true);

      expect(sortedResults).toEqual([
        {
          name: 'John',
          lastName: 'Frusciante',
        },
        {
          name: 'Paco',
          lastName: 'De Lucia',
        },
        {
          name: 'Gustavo',
          lastName: 'Cerati',
        },
      ]);
    });
  });
});
