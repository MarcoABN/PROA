import { TestBed } from '@angular/core/testing';

import { FrontEscolanauticaService } from './front-escolanautica.service';

describe('FrontEscolanauticaService', () => {
  let service: FrontEscolanauticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontEscolanauticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
