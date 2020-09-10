import { Component, OnInit, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractInput } from '../../models/abstract-input';

@Component({
  selector: 'ni-switch-input',
  templateUrl: './switch-input.component.html',
  styleUrls: ['./switch-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SwitchInputComponent)
    }
  ]
})
export class SwitchInputComponent extends AbstractInput<boolean> implements OnInit { }
