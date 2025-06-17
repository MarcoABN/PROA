import { TestBed } from '@angular/core/testing';

import { Anexo2bService } from './anexo2b.service';

describe('Anexo2bService', () => {
  let service: Anexo2bService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2bService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
