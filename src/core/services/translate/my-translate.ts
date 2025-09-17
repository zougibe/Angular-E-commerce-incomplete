import { Injectable } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class MyTranslate {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }

  changeLang() {
    let langSwitch = localStorage.getItem('lang') || ''
  }
}
