import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzCheckboxComponent } from 'ng-zorro-antd';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { FormsModule, FormGroupDirective } from '@angular/forms';
import { MockComponents, MockPipe, MockDirective } from 'ng-mocks';

import { CheckboxInputComponent } from './checkbox-input.component';
import { InputControlComponent } from '../input-control/input-control.component';
import { InfoIconComponent } from '../info-icon/info-icon.component';

describe('CheckboxInputComponent', () => {
    let component: CheckboxInputComponent;
    let fixture: ComponentFixture<CheckboxInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CheckboxInputComponent,
                MockComponents(
                    InputControlComponent,
                    InfoIconComponent,
                    NzCheckboxComponent
                ),
                MockPipe(TranslatePipe),
                MockDirective(FormGroupDirective)
            ],
            providers: [
                {
                    provide: FormGroupDirective,
                    useValue: null
                },
                {
                    provide: TranslateService,
                    useValue: jasmine.createSpyObj('TranslateService', ['get'])
                }
            ],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
