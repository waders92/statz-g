import { TestBed } from '@angular/core/testing';

import { RoundService } from './round-service';

describe('RoundServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoundService = TestBed.get(RoundService);
    expect(service).toBeTruthy();
  });
});
