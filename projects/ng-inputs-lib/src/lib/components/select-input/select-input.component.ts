import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

import { AbstractInput } from '../../models/abstract-input';
import { InputOption } from '../../models/misc';

@Component({
  selector: 'ni-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectInputComponent)
    }
  ]
})
export class SelectInputComponent<T> extends AbstractInput<T> implements OnInit {

  @Input() options: InputOption<T>[];
  @Input() allowClear: boolean = true;
  @Input() mode: 'multiple' | 'tags' | 'default' = 'default';
  @Input() compareWith = (o1: T, o2: T): boolean => {
    return o1 && o2 && o1 === o2;
  }

  // tslint:disable-next-line: member-ordering
  @Output() change: Subject<InputOption<T>> = new Subject();

  trackSelectOptions(opt1: InputOption<T>, opt2: InputOption<T>): boolean {
    return opt1 && opt2 && opt1.value === opt2.value;
  }

  setValue(value: T): void {
    this.value = value;
    this.options
      .filter(option => option.value === value)
      .forEach(this.change.next.bind(this.change));
  }
}
