import { TestBed } from '@angular/core/testing';

import { FrontClienteService } from './front-cliente.service';

describe('FrontClienteService', () => {
  let service: FrontClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
