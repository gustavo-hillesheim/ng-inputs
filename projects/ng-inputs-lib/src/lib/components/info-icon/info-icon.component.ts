import { Component, Input } from '@angular/core';
import { TranslationUtils } from '../../services';

@Component({
  selector: 'ni-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.scss']
})
export class InfoIconComponent {

  @Input() info: string;

  constructor(public translateUtils: TranslationUtils) { }
}
