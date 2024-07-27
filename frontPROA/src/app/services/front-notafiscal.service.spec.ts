import { TestBed } from '@angular/core/testing';

import { FrontNotafiscalService } from './front-notafiscal.service';

describe('FrontNotafiscalService', () => {
  let service: FrontNotafiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontNotafiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
