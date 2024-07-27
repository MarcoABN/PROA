import { TestBed } from '@angular/core/testing';

import { Anexo2LService } from './anexo2L.service';

describe('Anexo2LService', () => {
  let service: Anexo2LService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2LService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
