/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VnNodeService } from './vn-node.service';

describe('Service: VnNode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VnNodeService]
    });
  });

  it('should ...', inject([VnNodeService], (service: VnNodeService) => {
    expect(service).toBeTruthy();
  }));
});
