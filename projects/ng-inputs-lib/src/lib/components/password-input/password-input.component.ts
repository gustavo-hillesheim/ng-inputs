import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractInput } from '../../models/abstract-input';

@Component({
  selector: 'ni-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PasswordInputComponent)
    }
  ]
})
export class PasswordInputComponent extends AbstractInput<string> implements OnInit {

  @Input() canShowPassword = true;
  passwordVisible = false;

  togglePassword(): void {
    if (this.canShowPassword) {
      this.passwordVisible = !this.passwordVisible;
    }
  }
}
