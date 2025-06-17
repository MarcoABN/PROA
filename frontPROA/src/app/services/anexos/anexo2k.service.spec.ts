import { TestBed } from '@angular/core/testing';

import { Anexo2kService } from './anexo2k.service';

describe('Anexo2kService', () => {
  let service: Anexo2kService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2kService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
