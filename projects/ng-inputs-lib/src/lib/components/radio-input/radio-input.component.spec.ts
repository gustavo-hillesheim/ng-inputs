import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockPipe } from 'ng-mocks';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { RadioInputComponent } from './radio-input.component';
import { InputControlComponent } from '../input-control/input-control.component';

describe('RadioInputComponent', () => {
    let component: RadioInputComponent<unknown>;
    let fixture: ComponentFixture<RadioInputComponent<unknown>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RadioInputComponent,
                MockComponents(
                    InputControlComponent,
                    NzRadioGroupComponent,
                    NzRadioComponent
                ),
                MockPipe(TranslatePipe)
            ],
            imports: [
                FormsModule
            ],
            providers: [
                {
                    provide: TranslateService,
                    useValue: {}
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
