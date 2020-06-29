import { TestBed } from '@angular/core/testing';

import { CurseService } from './curse.service';

describe('CurseServiceService', () => {
  let service: CurseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
