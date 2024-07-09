import { TestBed } from '@angular/core/testing';

import { FrontMotorService } from './front-motor.service';

describe('FrontMotorService', () => {
  let service: FrontMotorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontMotorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
