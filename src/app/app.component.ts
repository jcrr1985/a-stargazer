import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang();

    translate.setDefaultLang('en');
    translate.use(browserLang.match(/en/) ? browserLang : 'en');
  }
}
