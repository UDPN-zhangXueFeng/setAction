/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DidUploadService } from './did-upload.service';

describe('Service: DidUpload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DidUploadService]
    });
  });

  it('should ...', inject([DidUploadService], (service: DidUploadService) => {
    expect(service).toBeTruthy();
  }));
});
