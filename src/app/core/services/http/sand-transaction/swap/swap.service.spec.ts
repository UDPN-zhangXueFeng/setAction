/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwapService } from './swap.service';

describe('Service: Swap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwapService]
    });
  });

  it('should ...', inject([SwapService], (service: SwapService) => {
    expect(service).toBeTruthy();
  }));
});
