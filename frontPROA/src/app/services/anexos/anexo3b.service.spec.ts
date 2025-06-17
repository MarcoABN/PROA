import { TestBed } from '@angular/core/testing';

import { Anexo3bService } from './anexo3b.service';

describe('Anexo3bService', () => {
  let service: Anexo3bService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo3bService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
