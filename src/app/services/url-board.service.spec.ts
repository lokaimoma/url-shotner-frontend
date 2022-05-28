import { TestBed } from '@angular/core/testing';

import { UrlBoardService } from './url-board.service';

describe('UrlBoardService', () => {
  let service: UrlBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
