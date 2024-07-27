import { TestBed } from '@angular/core/testing';

import { Anexo3CService } from './anexo3c.service';

describe('Anexo3CService', () => {
  let service: Anexo3CService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo3CService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
