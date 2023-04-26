/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LinkDigitalService } from './link-digital.service';

describe('Service: LinkDigital', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkDigitalService]
    });
  });

  it('should ...', inject([LinkDigitalService], (service: LinkDigitalService) => {
    expect(service).toBeTruthy();
  }));
});
