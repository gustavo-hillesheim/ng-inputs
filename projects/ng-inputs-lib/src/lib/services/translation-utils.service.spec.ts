import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { TranslationUtils } from './translation-utils.service';

describe('TranslationUtils', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: TranslateService,
                useValue: {}
            }
        ]
    }));

    it('should be created', () => {
        const service: TranslationUtils = TestBed.get(TranslationUtils);
        expect(service).toBeTruthy();
    });
});
