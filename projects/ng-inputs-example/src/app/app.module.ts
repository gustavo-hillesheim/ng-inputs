import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { NgInputsModule } from "ng-inputs-lib";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgInputsModule, TranslateModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
