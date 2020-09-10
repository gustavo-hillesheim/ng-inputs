import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractInput } from '../../models/abstract-input';

@Component({
  selector: 'ni-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NumberInputComponent)
    }
  ]
})
export class NumberInputComponent extends AbstractInput<number> implements OnInit {

  @Input() min: number;
  @Input() max: number;
  @Input() step: number = 1;
  @Input() precision: number = 2;
}
