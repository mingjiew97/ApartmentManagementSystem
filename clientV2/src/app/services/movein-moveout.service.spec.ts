import { TestBed } from '@angular/core/testing';

import { MoveinMoveoutService } from './movein-moveout.service';

describe('MoveinMoveoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoveinMoveoutService = TestBed.get(MoveinMoveoutService);
    expect(service).toBeTruthy();
  });
});
