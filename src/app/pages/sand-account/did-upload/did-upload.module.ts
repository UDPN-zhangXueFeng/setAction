import { NgModule } from '@angular/core';
import { DidUploadComponent } from './did-upload.component';
import { DidUploadRoutingModule } from './did-upload-routing.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [DidUploadComponent],
  imports: [
    SharedModule,
    DidUploadRoutingModule
  ]
})
export class DidUploadModule { }
