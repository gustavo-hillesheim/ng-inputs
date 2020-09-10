import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[niTranslationGroup]'
})
export class TranslationGroupDirective {

  @Input() translationGroup: string;
}
