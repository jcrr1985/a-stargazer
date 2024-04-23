import { of } from 'rxjs';

export const fakeRouter = {
  navigate: (url: any, config: any) => of(true).toPromise(),
  navigateByUrl: (url: any, config: any) => ({ then: (cb: any) => cb() }),
};
