import { TestBed } from '@angular/core/testing';

import { Anexo2EService } from './anexo2e.service';

describe('Anexo2EService', () => {
  let service: Anexo2EService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2EService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
