import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockDirective, MockPipe } from 'ng-mocks';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { NzInputDirective, NzInputGroupComponent, NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { TextInputComponent } from './text-input.component';
import { InputControlComponent } from '../input-control/input-control.component';
import { InfoIconComponent } from '../info-icon/info-icon.component';

describe('TextInputComponents', () => {
    let component: TextInputComponent;
    let fixture: ComponentFixture<TextInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TextInputComponent,
                MockComponents(
                    InputControlComponent,
                    InfoIconComponent,
                    NzInputGroupComponent,
                    NzSelectComponent,
                    NzOptionComponent
                ),
                MockDirective(NzInputDirective),
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
        fixture = TestBed.createComponent(TextInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
