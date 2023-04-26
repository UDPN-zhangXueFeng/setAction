import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DidUploadService } from '@app/core/services/http/sand-account/did-upload/did-upload.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-did-upload',
  templateUrl: './did-upload.component.html',
  styleUrls: ['./did-upload.component.less']
})
export class DidUploadComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };

  upstatus = false;
  inputValue?: string;
  uploading = false;
  isSuccess = false;
  didName = '';
  fileList: NzUploadFile[] = [];

  constructor(private msg: NzMessageService, private didUploadService: DidUploadService) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `DID Upload`,
      breadcrumb: ['Account Management', 'DID Upload'],
      extra: this.headerExtra,
      desc: '',
      footer: ''
    };
  }
  ngOnInit() {
  }


  beforeUpload = (file: any): boolean => {
    this.fileList = this.fileList.concat(file);
    if (this.fileList.length > 0) {
      this.upstatus = !this.upstatus;
    }
    if (this.fileList[0].type !== 'text/plain') {
      this.msg.error('File format error!');
      for (let i = 0; i <= this.fileList.length; i++) {
        this.fileList.splice(0, i);
      }
      this.upstatus = !this.upstatus;
    }
    const up = new Promise((r, e) => {
      const reader = new FileReader();
      reader.onload = (() => {
        if (reader.result) {
          r(reader.result.toString())
        }
      });
      reader.readAsText(file, 'utf-8');
    })
    up.then((res: any) => {
      var obj = JSON.parse(res);
      var pretty = JSON.stringify(obj, undefined, 4);
      this.inputValue = pretty;
    })
    this.didName = this.fileList[0].name;
    return false;
  };


  handleUpload(): void {
    this.uploading = true;
    this.didUploadService.upload({ didDocument: this.inputValue }).pipe(finalize(() => this.uploading = false)).subscribe((res: any) => {
      if (res.code === 0) {
        this.isSuccess = true;
      }
    })
  }

  handleRemove = (file: any) => new Observable<boolean>(() => {
    for (let i = 0; i <= this.fileList.length; i++) {
      this.fileList.splice(0, i)
    }
    this.upstatus = !this.upstatus;
  })

}
