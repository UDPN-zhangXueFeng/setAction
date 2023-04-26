/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LinkBusinessService } from './link-business.service';

describe('Service: LinkBusiness', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkBusinessService]
    });
  });

  it('should ...', inject([LinkBusinessService], (service: LinkBusinessService) => {
    expect(service).toBeTruthy();
  }));
});
