import { TestBed } from '@angular/core/testing';

import { Anexo2D212Service } from './anexo2D-212.service';

describe('Anexo2D212Service', () => {
  let service: Anexo2D212Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo2D212Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
