import { TestBed } from '@angular/core/testing';

import { AuthorizedHttpService } from './authorized-http.service';

describe('AuthorizedHttpService', () => {
  let service: AuthorizedHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizedHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
