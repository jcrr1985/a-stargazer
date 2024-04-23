import { Component, Input, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  @Input() showDate: boolean = false;
  @Input() showSeconds: boolean = false;
  @Input() timeZoneLabel: string = 'UTC';
  @Input() clockTimezone: string = 'UTC';

  clockFormat: string = 'HH:mm';

  ngOnInit(): void {
    if (this.showDate) {
      this.clockFormat = `dd/MM/yyyy ${this.clockFormat}`;
    }
    if (this.showSeconds) {
      this.clockFormat = `${this.clockFormat}:ss`;
    }
  }

  private _time$: Observable<Date> = timer(0, 1000).pipe(
    map(() => new Date(Date.now())),
    shareReplay(1)
  );

  get time() {
    return this._time$;
  }
}
