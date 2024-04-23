import { Pipe, PipeTransform } from '@angular/core';
import { get } from '../../utils/helpers/get';

@Pipe({
  name: 'get',
})
export class GetPipe implements PipeTransform {
  transform(value: any, path: string, defaultValue?: any): any {
    return get(value, path, defaultValue);
  }
}
