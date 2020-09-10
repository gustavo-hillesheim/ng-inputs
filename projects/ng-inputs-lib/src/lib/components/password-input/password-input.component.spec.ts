import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockDirectives, MockPipe } from 'ng-mocks';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { NzIconDirective, NzTooltipDirective, NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { PasswordInputComponent } from './password-input.component';
import { InputControlComponent } from '../input-control/input-control.component';
import { InfoIconComponent } from '../info-icon/info-icon.component';

describe('PasswordInputComponent', () => {
    let component: PasswordInputComponent;
    let fixture: ComponentFixture<PasswordInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PasswordInputComponent,
                MockComponents(
                    InputControlComponent,
                    InfoIconComponent,
                    NzInputGroupComponent
                ),
                MockDirectives(
                    NzIconDirective,
                    NzTooltipDirective,
                    NzInputDirective
                ),
                MockPipe(TranslatePipe)
            ],
            providers: [
                {
                    provide: FormGroupDirective,
                    useValue: {}
                },
                {
                    provide: TranslateService,
                    useValue: {}
                }
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
