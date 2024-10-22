import { TestBed } from '@angular/core/testing';

import { Procuracao01Service } from './procuracao01.service';

describe('Procuracao01Service', () => {
  let service: Procuracao01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Procuracao01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
