import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private render2 = inject(RendererFactory2).createRenderer(null, null)
  currentLang: WritableSignal<string> = signal<string>(localStorage.getItem('lang') || 'en'); // Signal to track current language
  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platId: object) {
    if (isPlatformBrowser(this.platId)) {
      this.translate.setDefaultLang('en')
      const language = localStorage.getItem('lang')
      if (language) {
        this.translate.use(language)
        this.currentLang.set(language);

      }
    }
    this.changeDirection
  }
  changeDirection() {
    if (localStorage.getItem('lang') == 'en') {
      this.render2.setAttribute(document.documentElement, 'dir', 'ltr')
      this.render2.setAttribute(document.documentElement, 'lang', 'en')

    } else if (localStorage.getItem('lang') == 'ar') {
      this.render2.setAttribute(document.documentElement, 'dir', 'rtl')
      this.render2.setAttribute(document.documentElement, 'lang', 'ar')

    }
  }
  changeLang(lang: string): void {
    if (isPlatformBrowser(this.platId)) {
      localStorage.setItem('lang', lang);
    }

    this.translate.use(lang);
    this.currentLang.set(lang);
    this.changeDirection();
  }
}
