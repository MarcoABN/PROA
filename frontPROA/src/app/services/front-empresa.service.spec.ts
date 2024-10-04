import { TestBed } from '@angular/core/testing';

import { FrontEmpresaService } from './front-empresa.service';

describe('FrontEmpresaService', () => {
  let service: FrontEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
