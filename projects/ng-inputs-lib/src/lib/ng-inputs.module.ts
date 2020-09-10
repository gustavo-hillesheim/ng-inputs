import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzSelectModule,
  NzCheckboxModule,
  NzIconModule,
  NzToolTipModule,
  NzButtonModule,
  NzGridModule,
  NzRadioModule,
  NzSwitchModule,
  NzCollapseModule,
  NzModalModule,
  NzDividerModule,
} from "ng-zorro-antd";

import {
  InputControlComponent,
  TextInputComponent,
  NumberInputComponent,
  SelectInputComponent,
  CheckboxInputComponent,
  TextareaInputComponent,
  PasswordInputComponent,
  InfoIconComponent,
  RadioInputComponent,
  SwitchInputComponent,
} from "./components";

import { TranslationGroupDirective } from "./directives";
import { TranslationUtils } from "./services";

@NgModule({
  declarations: [
    InputControlComponent,
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    TextareaInputComponent,
    PasswordInputComponent,
    SwitchInputComponent,
    InfoIconComponent,
    RadioInputComponent,
    TranslationGroupDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCheckboxModule,
    NzIconModule,
    NzToolTipModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule,
    NzRadioModule,
    NzSwitchModule,
    NzCollapseModule,
    NzModalModule,
    TranslateModule.forChild(),
  ],
  providers: [TranslationUtils],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputControlComponent,
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    TextareaInputComponent,
    PasswordInputComponent,
    RadioInputComponent,
    SwitchInputComponent,
    TranslationGroupDirective,
  ],
})
export class NgInputsModule {}
