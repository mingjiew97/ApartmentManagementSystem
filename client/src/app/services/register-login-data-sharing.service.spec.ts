import { TestBed } from '@angular/core/testing';

import { RegisterLoginDataSharingService } from './register-login-data-sharing.service';

describe('RegisterLoginDataSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterLoginDataSharingService = TestBed.get(RegisterLoginDataSharingService);
    expect(service).toBeTruthy();
  });
});
