import { TestBed } from '@angular/core/testing';

import { Anexo2dService } from './anexo2d.service';

describe('Anexo2dService', () => {
  let service: Anexo2dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
