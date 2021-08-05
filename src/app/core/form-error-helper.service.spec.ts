import { TestBed } from '@angular/core/testing';

import { FormErrorHelperService } from './form-error-helper.service';

describe('FormErrorHelperService', () => {
  let service: FormErrorHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormErrorHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
