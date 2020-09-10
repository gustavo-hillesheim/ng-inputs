import { Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractInput } from '../../models/abstract-input';
import { InputOption } from '../../models/misc';

@Component({
  selector: 'ni-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RadioInputComponent)
    }
  ]
})
export class RadioInputComponent<T> extends AbstractInput<T> {

  @Input() options: InputOption<T>;
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
}
