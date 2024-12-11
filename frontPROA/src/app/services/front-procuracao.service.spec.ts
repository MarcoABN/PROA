import { TestBed } from '@angular/core/testing';

import { FrontProcuracaoService } from './front-procuracao.service';

describe('FrontProcuracaoService', () => {
  let service: FrontProcuracaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontProcuracaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
