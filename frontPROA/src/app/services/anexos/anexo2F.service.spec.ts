import { TestBed } from '@angular/core/testing';

import { Anexo2FService } from './anexo2F.service';

describe('Anexo2FService', () => {
  let service: Anexo2FService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2FService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
