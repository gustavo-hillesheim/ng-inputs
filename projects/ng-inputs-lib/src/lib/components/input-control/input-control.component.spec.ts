import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockPipe } from 'ng-mocks';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NzFormLabelComponent, NzFormControlComponent, NzFormItemComponent } from 'ng-zorro-antd';
import { FormControl } from '@angular/forms';

import { InputControlComponent } from './input-control.component';
import { InfoIconComponent } from '../info-icon/info-icon.component';
import { AbstractInput } from '../../models/abstract-input';
import { NzValidateStatus } from '../../models/misc';

describe('InputControlComponent', () => {
    let component: InputControlComponent;
    let fixture: ComponentFixture<InputControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InputControlComponent,
                MockComponents(
                    InfoIconComponent,
                    NzFormLabelComponent,
                    NzFormControlComponent,
                    NzFormItemComponent
                ),
                MockPipe(TranslatePipe)
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
        fixture = TestBed.createComponent(InputControlComponent);
        component = fixture.componentInstance;
    });

    describe('#ngOnInit', () => {
        it('should call updateConfiguration', () => {
            const updateConfigurationSpy = spyOn(component, 'updateConfiguration').and.stub();
            component.ngOnInit();
            expect(updateConfigurationSpy).toHaveBeenCalled();
        });
    });
    describe('#ngAfterContentChecked', () => {
        it('should update errorMessage if autoConfigure exists', () => {
            const fakeErrorMessage = 'fake.error';
            const autoConfigureSpy = jasmine.createSpyObj('autoConfigure', ['getErrorMessage', 'getStatus', 'getLabel', 'getInfo']);
            autoConfigureSpy.getErrorMessage.and.returnValue(fakeErrorMessage);

            component.autoConfigure = autoConfigureSpy;
            component.ngAfterContentChecked();

            expect(autoConfigureSpy.getErrorMessage).toHaveBeenCalled();
            expect(component.errorMessage).toBe(fakeErrorMessage);
        });
        it('should not update errorMessage if autoConfigure doesn\'t exists', () => {
            component.ngAfterContentChecked();
            expect(component.errorMessage).toBeUndefined();
        });
    });
    describe('#ngOnChanges', () => {
        it('should call updateConfiguration if autoConfigure has changed', () => {
            const updateConfigurationSpy = spyOn(component, 'updateConfiguration');

            component.ngOnChanges({
                autoConfigure: {
                    previousValue: {},
                    currentValue: { value: 'v' },
                    firstChange: true,
                    isFirstChange: (): boolean => true
                }
            });

            expect(updateConfigurationSpy).toHaveBeenCalled();
        });
        it('should not call updateConfiguration if autoConfigure has changed to null', () => {
            const updateConfigurationSpy = spyOn(component, 'updateConfiguration');

            component.ngOnChanges({
                autoConfigure: {
                    previousValue: {},
                    currentValue: null,
                    firstChange: true,
                    isFirstChange: (): boolean => true
                }
            });

            expect(updateConfigurationSpy).not.toHaveBeenCalled();
        });
        it('should not call updateConfiguration if autoConfigure hasn\'t changed', () => {
            const updateConfigurationSpy = spyOn(component, 'updateConfiguration');
            component.ngOnChanges({});
            expect(updateConfigurationSpy).not.toHaveBeenCalled();
        });
    });
    describe('#updateConfiguration', () => {
        it('should update Configuration if autoConfigure is defined', () => {
            const mockAutoConfigure = {
                control: new FormControl(),
                getStatus: (): NzValidateStatus => 'error',
                getErrorMessage: (): string => 'error.message',
                getLabel: (): string => 'field.label',
                getInfo: (): string => 'field.info',
                isRequired: true
            } as any & AbstractInput<any>;
            component.autoConfigure = mockAutoConfigure;
            component.updateConfiguration();

            expect(component.control).toBe(mockAutoConfigure.control);
            expect(component.status).toEqual(mockAutoConfigure.getStatus());
            expect(component.errorMessage).toEqual(mockAutoConfigure.getErrorMessage());
            expect(component.label).toEqual(mockAutoConfigure.getLabel());
            expect(component.info).toEqual(mockAutoConfigure.getInfo());
            expect(component.isRequired).toEqual(mockAutoConfigure.isRequired);
        });
        it('should not update configuration if autoConfigure is not defined', () => {
            component.autoConfigure = null;
            component.updateConfiguration();
            expect(component.control).toBeUndefined();
            expect(component.status).toBeUndefined();
            expect(component.errorMessage).toBeUndefined();
            expect(component.label).toBeUndefined();
            expect(component.info).toBeUndefined();
            expect(component.isRequired).toBeUndefined();
        });
    });
});
