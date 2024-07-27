import { TestBed } from '@angular/core/testing';

import { Anexo2MService } from './anexo2M.service';

describe('Anexo2MService', () => {
  let service: Anexo2MService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2MService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
