import { TestBed } from '@angular/core/testing';

import { Anexo5eService } from './anexo5e.service';

describe('Anexo5eService', () => {
  let service: Anexo5eService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo5eService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
