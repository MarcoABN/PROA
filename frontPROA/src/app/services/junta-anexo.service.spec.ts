import { TestBed } from '@angular/core/testing';

import { JuntaAnexoService } from './junta-anexo.service';

describe('JuntaAnexoService', () => {
  let service: JuntaAnexoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuntaAnexoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
