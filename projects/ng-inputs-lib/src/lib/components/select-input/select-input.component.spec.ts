import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockDirective, MockPipe } from 'ng-mocks';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { NzSelectComponent, NzTooltipDirective, NzOptionComponent } from 'ng-zorro-antd';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { SelectInputComponent } from './select-input.component';
import { InputControlComponent } from '../input-control/input-control.component';
import { InfoIconComponent } from '../info-icon/info-icon.component';

describe('SelectInputComponent', () => {
    let component: SelectInputComponent<any>;
    let fixture: ComponentFixture<SelectInputComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SelectInputComponent,
                MockComponents(
                    InputControlComponent,
                    InfoIconComponent,
                    NzSelectComponent,
                    NzOptionComponent
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
                    useValue: []
                }
            ],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
