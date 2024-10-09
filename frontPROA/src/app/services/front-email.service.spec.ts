import { TestBed } from '@angular/core/testing';

import { FrontEmailService } from './front-email.service';

describe('FrontEmailService', () => {
  let service: FrontEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
