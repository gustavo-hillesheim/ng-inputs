import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractInput } from '../../models/abstract-input';

@Component({
  selector: 'ni-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextareaInputComponent)
    }
  ]
})
export class TextareaInputComponent extends AbstractInput<string> implements OnInit {

  @Input() autoSize: boolean | { minRows: number, maxRows: number } = true;
}
