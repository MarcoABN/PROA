import { TestBed } from '@angular/core/testing';

import { FrontOrgmilitarService } from './front-orgmilitar.service';

describe('FrontOrgmilitarService', () => {
  let service: FrontOrgmilitarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontOrgmilitarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
