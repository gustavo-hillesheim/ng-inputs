import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockDirective, MockPipe } from 'ng-mocks';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { TextareaInputComponent } from './textarea-input.component';
import { InputControlComponent } from '../input-control/input-control.component';
import { InfoIconComponent } from '../info-icon/info-icon.component';

describe('TextareaInputComponent', () => {
    let component: TextareaInputComponent;
    let fixture: ComponentFixture<TextareaInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TextareaInputComponent,
                MockComponents(
                    InputControlComponent,
                    InfoIconComponent
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
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
