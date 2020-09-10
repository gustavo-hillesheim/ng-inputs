import { TestBed } from '@angular/core/testing';

import { NgInputsLibService } from './ng-inputs-lib.service';

describe('NgInputsLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgInputsLibService = TestBed.get(NgInputsLibService);
    expect(service).toBeTruthy();
  });
});
