import { TestBed } from '@angular/core/testing';

import { ValidadorcpfcnpjService } from './validadorcpfcnpj.service';

describe('ValidadorcpfcnpjService', () => {
  let service: ValidadorcpfcnpjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidadorcpfcnpjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
