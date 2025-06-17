import { TestBed } from '@angular/core/testing';

import { Anexo1cService } from './anexo1c.service';

describe('Anexo1cService', () => {
  let service: Anexo1cService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo1cService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
