import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockPipe } from 'ng-mocks';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { NzSwitchComponent } from 'ng-zorro-antd';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { SwitchInputComponent } from './switch-input.component';
import { InputControlComponent } from '../input-control/input-control.component';
import { InfoIconComponent } from '../info-icon/info-icon.component';

describe('SwitchInputComponent', () => {
    let component: SwitchInputComponent;
    let fixture: ComponentFixture<SwitchInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SwitchInputComponent,
                MockComponents(
                    InputControlComponent,
                    InfoIconComponent,
                    NzSwitchComponent,
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
        fixture = TestBed.createComponent(SwitchInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
