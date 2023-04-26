import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DidUploadComponent } from './did-upload.component';

const routes: Routes = [{ path: '', component: DidUploadComponent, data: { title: 'DID Upload', key: 'upload' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DidUploadRoutingModule { }
