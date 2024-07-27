import { TestBed } from '@angular/core/testing';

import { Anexo5HService } from './anexo5h.service';

describe('Anexo5HService', () => {
  let service: Anexo5HService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo5HService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
