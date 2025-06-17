import { TestBed } from '@angular/core/testing';

import { Anexo2AService } from './anexo2A.service';

describe('Anexo2AService', () => {
  let service: Anexo2AService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2AService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
