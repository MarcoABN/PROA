import { TestBed } from '@angular/core/testing';

import { Anexo5dService } from './anexo5d.service';

describe('Anexo5dService', () => {
  let service: Anexo5dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo5dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
