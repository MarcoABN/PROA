import { TestBed } from '@angular/core/testing';

import { Anexo3DService } from './anexo3D.service';

describe('Anexo3DService', () => {
  let service: Anexo3DService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo3DService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
