import { TestBed } from '@angular/core/testing';

import { FrontEmbarcacaoService } from './front-embarcacao.service';

describe('FrontEmbarcacaoService', () => {
  let service: FrontEmbarcacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontEmbarcacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
