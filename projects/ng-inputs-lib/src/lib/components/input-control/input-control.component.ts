import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges, SimpleChanges,
  OnInit,
  AfterContentChecked,
  ChangeDetectorRef
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { NzValidateStatus } from '../../models/misc';
import { AbstractInput } from '../../models/abstract-input';
import { TranslationUtils } from '../../services';

@Component({
  selector: 'ni-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputControlComponent implements OnInit, OnChanges, AfterContentChecked {

  @Input() isRequired: boolean;
  @Input() label: string;
  @Input() control: AbstractControl;
  @Input() info: string;
  @Input() errorMessage: string;
  @Input() status: NzValidateStatus;
  @Input() autoConfigure: AbstractInput<unknown>;

  constructor(public translationUtils: TranslationUtils, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.updateConfiguration();
  }

  ngAfterContentChecked(): void {
    if (this.autoConfigure) {
      this.updateConfiguration();
      this.changeDetector.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autoConfigure && changes.autoConfigure.currentValue) {
      this.updateConfiguration();
    }
  }

  updateConfiguration(): void {
    if (this.autoConfigure) {
      this.control = this.autoConfigure.control;
      this.status = this.autoConfigure.getStatus();
      this.errorMessage = this.autoConfigure.getErrorMessage();
      this.label = this.autoConfigure.getLabel();
      this.info = this.autoConfigure.getInfo();
      this.isRequired = this.autoConfigure.isRequired;
    }
  }
}
