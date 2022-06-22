import { TestBed } from '@angular/core/testing';

import { UserInfoUpdateServiceService } from './user-info-update-service.service';

describe('UserInfoUpdateServiceService', () => {
  let service: UserInfoUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
