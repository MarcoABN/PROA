import { TestBed } from '@angular/core/testing';

import { FrontPrestadorService } from './front-prestador.service';

describe('FrontPrestadorService', () => {
  let service: FrontPrestadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontPrestadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
