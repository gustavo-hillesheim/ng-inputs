import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NzIconDirective, NzTooltipDirective } from 'ng-zorro-antd';
import { MockDirectives, MockPipe } from 'ng-mocks';

import { InfoIconComponent } from './info-icon.component';

describe('InfoIconComponent', () => {
    let component: InfoIconComponent;
    let fixture: ComponentFixture<InfoIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InfoIconComponent,
                MockDirectives(
                    NzIconDirective,
                    NzTooltipDirective
                ),
                MockPipe(TranslatePipe)
            ],
            providers: [
                {
                    provide: TranslateService,
                    value: {}
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoIconComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
