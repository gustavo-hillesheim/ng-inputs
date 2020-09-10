import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockDirective, MockPipe } from 'ng-mocks';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NzInputNumberComponent, NzTooltipDirective } from 'ng-zorro-antd';

import { NumberInputComponent } from './number-input.component';
import { InfoIconComponent } from '../info-icon/info-icon.component';
import { InputControlComponent } from '../input-control/input-control.component';

describe('NumberInputComponent', () => {
    let component: NumberInputComponent;
    let fixture: ComponentFixture<NumberInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NumberInputComponent,
                MockComponents(
                    InputControlComponent,
                    InfoIconComponent,
                    NzInputNumberComponent
                ),
                MockDirective(NzTooltipDirective),
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
        fixture = TestBed.createComponent(NumberInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
