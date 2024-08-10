import { TestBed } from '@angular/core/testing';

import { Anexo3AService } from './anexo3A.service';

describe('Anexo3AService', () => {
  let service: Anexo3AService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo3AService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
