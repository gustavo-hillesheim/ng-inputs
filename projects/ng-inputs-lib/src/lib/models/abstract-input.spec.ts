import { AbstractInput } from './abstract-input';
import { FormGroupDirective, Validators, FormControl, FormArrayName } from '@angular/forms';
import { of } from 'rxjs';

describe('AbstractInput', () => {

    class AbstractInputExtend extends AbstractInput<any> { }

    function setup() { // ts-lint:disable
        const translationUtils = jasmine.createSpyObj('TranslationUtils', ['hasTranslation']);
        const formGroupDirective = { form: jasmine.createSpyObj('form', ['get']) };
        const formArrayName = { control: jasmine.createSpyObj('array', ['at']) };
        const translationGroup = { translationGroup: 'test' };
        const abstractControlExtend = new FormControl();
        const abstractInputExtend = new AbstractInputExtend(
            translationUtils,
            formGroupDirective as FormGroupDirective,
            formArrayName as FormArrayName,
            translationGroup);

        return { abstractInputExtend, abstractControlExtend, formGroupDirective, translationUtils, translationGroup, formArrayName };
    }

    describe('#ngOnInit', () => {
        it('should keep control the input', () => {

            const { abstractInputExtend, abstractControlExtend } = setup();
            abstractInputExtend.control = abstractControlExtend;
            abstractInputExtend.ngOnInit();
            expect(abstractInputExtend.control).toBe(abstractControlExtend);
        });

        it('should get the control of formGroupDirective', () => {
            const { abstractInputExtend, abstractControlExtend, formGroupDirective } = setup();
            abstractInputExtend.control = null;
            const getSpy = formGroupDirective.form.get.and.returnValue(abstractControlExtend);
            const controlName = 'control';
            abstractInputExtend.formControlName = controlName;
            abstractInputExtend.ngOnInit();
            expect(getSpy).toHaveBeenCalledWith(controlName);
            expect(abstractInputExtend.control).toBe(abstractControlExtend);
        });
        it('should get the control of formArrayName', () => {
            const { abstractInputExtend, abstractControlExtend, formArrayName } = setup();
            abstractInputExtend.control = null;
            const getSpy = formArrayName.control.at.and.returnValue(abstractControlExtend);
            const controlName = 0;
            abstractInputExtend.formControlName = controlName;
            abstractInputExtend.ngOnInit();
            expect(getSpy).toHaveBeenCalledWith(controlName);
            expect(abstractInputExtend.control).toBe(abstractControlExtend);
        });
    });

    describe('#getLabel', () => {
        it('should keep label the input', () => {
            const { abstractInputExtend } = setup();
            abstractInputExtend.label = 'labelTest';
            abstractInputExtend.getLabel();
            expect(abstractInputExtend.label).toBe('labelTest');
        });

        it('should get the label of getTranslationPrefix', () => {
            const { abstractInputExtend } = setup();
            abstractInputExtend.label = null;
            abstractInputExtend.formControlName = 'formLabelTest';
            const translationPrefixSpy = spyOn(abstractInputExtend, 'getTranslationPrefix').and.returnValue('fields.labelTest');
            abstractInputExtend.getLabel();
            expect(translationPrefixSpy).toHaveBeenCalled();
            expect(abstractInputExtend.getLabel()).toEqual('fields.labelTest.formLabelTest.label');
        });
    });

    describe('#getPlaceholder', () => {
        it('should return the placeholder recived of input', () => {
            const { abstractInputExtend, translationUtils } = setup();
            abstractInputExtend.placeholder = 'placeholderTest';
            translationUtils.hasTranslation.and.returnValue(of(true));
            const observerSpy = jasmine.createSpy('observer').and.stub();

            abstractInputExtend.getPlaceholder().subscribe(observerSpy);
            expect(translationUtils.hasTranslation).toHaveBeenCalledWith('placeholderTest');
            expect(observerSpy).toHaveBeenCalledWith('placeholderTest');
        });

        it('should return concatenate \'fields\' and formGroupName', () => {
            const { abstractInputExtend, translationUtils } = setup();
            abstractInputExtend.formControlName = 'placeholderTest';
            const translationPrefixSpy = spyOn(abstractInputExtend, 'getTranslationPrefix').and.returnValue('fields.placeholderTest');
            const observerSpy = jasmine.createSpy('observer').and.stub();
            translationUtils.hasTranslation.and.returnValue(of(false));

            abstractInputExtend.getPlaceholder().subscribe(observerSpy);
            expect(translationPrefixSpy).toHaveBeenCalled();
            expect(translationUtils.hasTranslation).toHaveBeenCalledWith('fields.placeholderTest.placeholderTest.placeholder');
            expect(observerSpy).toHaveBeenCalledWith('');
        });
    });

    describe('#getTranslationPrefix', () => {
        it('should return concatenated field', () => {
            const { abstractInputExtend } = setup();

            abstractInputExtend.getTranslationPrefix();
            expect(abstractInputExtend.getTranslationPrefix()).toEqual('fields.test');
        });

        it('should only return fields', () => {
            const { abstractInputExtend } = setup();
            abstractInputExtend.ignoreTranslationGroup = true;

            abstractInputExtend.getTranslationPrefix();
            expect(abstractInputExtend.getTranslationPrefix()).toEqual('fields');
        });
    });

    describe('#getInfo', () => {
        it('should return the info recived of input', () => {
            const { abstractInputExtend } = setup();
            abstractInputExtend.info = 'testInfo';

            abstractInputExtend.getInfo();
            expect(abstractInputExtend.getInfo()).toBe('testInfo');
        });

        it('should return concatenate \'fields\' and formGroupName', () => {
            const { abstractInputExtend } = setup();
            abstractInputExtend.formControlName = 'infoTest';

            abstractInputExtend.getInfo();
            expect(abstractInputExtend.getInfo()).toBe('fields.test.infoTest.info');
        });
    });

    describe('#getErrorMessage', () => {
        it('should return error message', () => {
            const { abstractInputExtend, abstractControlExtend } = setup();
            abstractInputExtend.control = new FormControl(null, Validators.required);
            abstractInputExtend.control.updateValueAndValidity();
            abstractInputExtend.control.markAsDirty();

            abstractInputExtend.getErrorMessage();
            expect(abstractInputExtend.getErrorMessage()).toBe('fields.errors.required');
        });

        it('should return null', () => {
            const { abstractInputExtend, abstractControlExtend } = setup();
            abstractInputExtend.control = abstractControlExtend;

            abstractInputExtend.getErrorMessage();
            expect(abstractInputExtend.getErrorMessage()).toBeNull();
        });

    });

    describe('#getStatus', () => {
        it('should return erro if have status', () => {
            const { abstractInputExtend } = setup();
            abstractInputExtend.status = 'success';

            abstractInputExtend.getStatus();
            expect(abstractInputExtend.getStatus()).toBe('error');
        });

        it('should return null if don\'t have status and errorMessage', () => {
            const { abstractInputExtend } = setup();
            abstractInputExtend.control = new FormControl();
            abstractInputExtend.getStatus();
            expect(abstractInputExtend.getStatus()).toBeNull();
        });
    });

    describe('#writeValue', () => {
        it('should record value if exists input', () => {
            const { abstractInputExtend } = setup();

            abstractInputExtend.writeValue('testWrite');
            expect(abstractInputExtend.value).toBe('testWrite');
        });

        it('shouldn\'t record value', () => {
            const { abstractInputExtend } = setup();

            abstractInputExtend.writeValue(undefined);
            expect(abstractInputExtend.value).toBeNull();
        });
    });

    describe('#setValue', () => {
        it('should record vallue', () => {
            const { abstractInputExtend } = setup();
            const propagateChangeSpy = jasmine.createSpy('propagateChange').and.stub();
            abstractInputExtend.registerOnChange(propagateChangeSpy);
            abstractInputExtend.value = 'setValueTest';
            expect(propagateChangeSpy).toHaveBeenCalled();
        });
    });
});
