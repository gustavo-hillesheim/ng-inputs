import {
  ControlValueAccessor,
  AbstractControl,
  FormGroupDirective,
  FormArrayName,
} from "@angular/forms";
import {
  Input,
  OnInit,
  Host,
  Optional,
  Output,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { map, takeUntil } from "rxjs/operators";
import { Observable, Subject } from "rxjs";

import { NzValidateStatus } from "./misc";
import { TranslationGroupDirective } from "../directives/translation-group.directive";
import { TranslationUtils } from "../services";

/**
 * Class responsible for auto-configuration of input-related data
 * @author Gustavo.Hillesheim
 */
export abstract class AbstractInput<T>
  implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() info: string;
  @Input() formControlName: string | number;
  @Input() isRequired: boolean;
  @Input() ignoreTranslationGroup: boolean;
  @Input() control: AbstractControl;
  @Input() status: NzValidateStatus;
  @Input() errorMessages: { [key: string]: string };
  @Input()
  set value(newValue: T) {
    this.internalValue = newValue;
    this.valueChange.next(newValue);
  }

  get value(): T {
    return this.internalValue;
  }

  @Output() valueChange = new Subject<T>();

  protected destroyed$ = new Subject<void>();
  protected internalValue: T = null;
  isDisabled = false;

  constructor(
    protected translationUtils: TranslationUtils,
    @Host() @Optional() protected formGroupDirective: FormGroupDirective,
    @Host() @Optional() protected formArrayDirective: FormArrayName,
    @Host() @Optional() protected translationGroup: TranslationGroupDirective
  ) {}

  ngOnInit(): void {
    if (!this.control && (this.formGroupDirective || this.formArrayDirective)) {
      this.control = this.getControl();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const hasNewFormControl =
      changes.formControlName &&
      changes.formControlName.currentValue !==
        changes.formControlName.previousValue;
    if (
      hasNewFormControl &&
      (this.formGroupDirective || this.formArrayDirective)
    ) {
      this.control = this.getControl();
    }
  }

  ngOnDestroy(): void {
    this.valueChange.complete();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected getControl(): AbstractControl {
    if (typeof this.formControlName === "string" && this.formGroupDirective) {
      return this.formGroupDirective.form.get(this.formControlName);
    } else if (
      typeof this.formControlName === "number" &&
      this.formArrayDirective
    ) {
      return this.formArrayDirective.control.at(this.formControlName);
    }
    return null;
  }

  getLabel(): string {
    return (
      this.label ||
      `${this.getTranslationPrefix()}.${this.formControlName}.label`
    );
  }

  getPlaceholder(): Observable<string> {
    const placeholderTranslation =
      this.placeholder ||
      `${this.getTranslationPrefix()}.${this.formControlName}.placeholder`;
    return this.translationUtils
      .hasTranslation(placeholderTranslation)
      .pipe(
        map((hasTranslation: boolean) =>
          hasTranslation ? placeholderTranslation : ""
        )
      );
  }

  getTranslationPrefix(): string {
    return (
      "fields" +
      (this.useTranslationGroup()
        ? `.${this.translationGroup.translationGroup}`
        : "")
    );
  }

  private useTranslationGroup(): boolean {
    return this.translationGroup && !this.ignoreTranslationGroup;
  }

  getInfo(): string {
    return (
      this.info || `${this.getTranslationPrefix()}.${this.formControlName}.info`
    );
  }

  getErrorMessage(): string {
    if (!this.control) {
      return null;
    }
    const errors = this.control.errors;
    if (errors && this.control.dirty) {
      const error = Object.keys(errors)[0];
      return this.errorMessages && this.errorMessages[error]
        ? this.errorMessages[error]
        : `fields.errors.${error}`;
    }
    return null;
  }

  getStatus(): NzValidateStatus {
    return this.status || this.getErrorMessage() ? "error" : null;
  }

  writeValue(newValue: T): void {
    if (newValue !== undefined) {
      this.value = newValue;
    }
  }

  registerOnChange(fn: (value: T) => void): void {
    this.valueChange.pipe(takeUntil(this.destroyed$)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setValue(value: T) {
    this.value = value;
  }
}
