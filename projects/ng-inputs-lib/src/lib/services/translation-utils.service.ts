import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TranslationUtils {
  constructor(private translateService: TranslateService) {}

  getTranslations(...translationKeys: string[]): Observable<string[]> {
    return this.translateService
      .get(translationKeys)
      .pipe(
        map((translations) => translationKeys.map((key) => translations[key]))
      );
  }

  hasTranslation(translation: string): Observable<boolean> {
    if (!translation) {
      return of(false);
    } else {
      return this.translateService
        .get(translation)
        .pipe(map((translated) => translation !== translated));
    }
  }
}
