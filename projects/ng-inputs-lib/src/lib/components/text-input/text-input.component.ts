import {
  Component,
  OnInit,
  forwardRef,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { AbstractInput } from "../../models/abstract-input";
import { InputOption } from "../../models/misc";

@Component({
  selector: "ni-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextInputComponent),
    },
  ],
})
export class TextInputComponent
  extends AbstractInput<string>
  implements OnInit, OnChanges {
  @Input() prefixOptions: InputOption<string>[];
  private internalPrefix: string;

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const prefixOptionsChanged =
      changes.prefixOptions &&
      changes.prefixOptions.currentValue &&
      changes.prefixOptions.currentValue.length;

    const needToChangePrefix =
      prefixOptionsChanged &&
      (!this.internalPrefix ||
        !this.prefixOptions.some(
          (option) => option.value === this.internalPrefix
        ));

    if (needToChangePrefix) {
      this.prefix = this.prefixOptions[0].value;
    }
  }

  set value(newValue: string) {
    if (this.prefixOptions && newValue) {
      const prefix = this.prefixOptions.find((option) =>
        newValue.startsWith(option.value)
      );
      if (prefix) {
        this.internalPrefix = prefix.value;
      }
      newValue = this.removePrefix(newValue);
    }
    this.setValue(this.appendPrefix(newValue));
  }

  get value(): string {
    return this.removePrefix(this.internalValue);
  }

  removePrefix(value: string): string {
    if (this.internalPrefix && value && value.startsWith(this.internalPrefix)) {
      return value.substr(this.internalPrefix.length);
    }
    return value;
  }

  appendPrefix(value: string): string {
    if (value && this.internalPrefix) {
      return this.internalPrefix + value;
    }
    return value;
  }

  set prefix(newPrefix: string) {
    const currentValue = this.value;
    this.internalPrefix = newPrefix;
    this.writeValue(currentValue);
  }

  get prefix(): string {
    return this.internalPrefix;
  }

  compareOptions(o1: string, o2: string): boolean {
    return o1 && o2 && o1 === o2;
  }
}
