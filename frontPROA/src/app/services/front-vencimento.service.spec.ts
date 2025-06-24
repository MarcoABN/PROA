import { TestBed } from '@angular/core/testing';

import { FrontVencimentoService } from './front-vencimento.service';

describe('FrontVencimentoService', () => {
  let service: FrontVencimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontVencimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
