import { TestBed } from '@angular/core/testing';

import { Anexo2jService } from './anexo2J.service';

describe('Anexo2jService', () => {
  let service: Anexo2jService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2jService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
