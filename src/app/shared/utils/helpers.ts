import {
  LocalDate,
  QuickSearchEntity,
  QuickSearchEntityType,
} from '@models/models';
import { ReplaySubject } from 'rxjs';

export const dateToLocalDate = (date: Date): LocalDate => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
};

export const localDateToDate = (localDate: LocalDate) => {
  const [year, month, date, hours, minutes, seconds] = localDate;

  return new Date(year, month - 1, date, hours, minutes, seconds);
};

export const fileToBase64 = (file: File) => {
  const result = new ReplaySubject<string>(1);
  const reader = new FileReader();

  reader.readAsBinaryString(file);
  reader.onload = (event) =>
    result.next(btoa(event.target?.result?.toString() || ''));
  return result;
};

export function constructUrlWithParams(url: string, paramsObj: any): string {
  if (!paramsObj) {
    return url;
  }

  let constructedUrl = url + '?';

  for (const key in paramsObj) {
    if (paramsObj.hasOwnProperty(key)) {
      constructedUrl += `${key}=${encodeURIComponent(paramsObj[key])}&`;
    }
  }

  return constructedUrl.slice(0, -1);
}

export function sortResultsByTypeOrder(
  results: QuickSearchEntity[]
): QuickSearchEntity[] {
  const typeOrder: Record<QuickSearchEntityType, number> = {
    EVT: 1,
    PAR_EVT: 2,
    TXM: 3,
    NTXM: 4,
    CO: 5,
  };

  return results.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
}

export function arrayEquals(a: any[], b: any[]) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export function filterObjectArrayByProperty<T>(
  filterValue: string,
  list: Array<T>,
  filterBy: string
): T[] {
  if (!filterValue || !(typeof filterValue === 'string')) {
    return list;
  }

  return list.filter((element: any) =>
    element[filterBy].toLowerCase().includes(filterValue.toLowerCase())
  );
}

export function sortArrayByObjectKey(
  unsortedArray: any[],
  key: string,
  reversed: boolean = false
) {
  const sortedArray = [...unsortedArray];

  if (reversed) {
    sortedArray.sort((a, b) => b[key].localeCompare(a[key]));
  } else {
    sortedArray.sort((a, b) => a[key].localeCompare(b[key]));
  }

  return sortedArray;
}
