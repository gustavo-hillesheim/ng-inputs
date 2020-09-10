import { Component, OnInit, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { AbstractInput } from '../../models/abstract-input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ni-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CheckboxInputComponent)
    }
  ]
})
export class CheckboxInputComponent extends AbstractInput<boolean> implements OnInit { }
