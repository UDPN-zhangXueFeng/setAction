import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subscription } from 'rxjs';
import { Country } from './country';

interface Table {
  key: string;
  nodeName: string;
  address: string;
  introduction: string;
}

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-bn-onboarding',
  templateUrl: './bn-onboarding.component.html',
  styleUrls: ['./bn-onboarding.component.less']
})
export class BnOnboardingComponent implements OnInit {
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  countryOptions: any[] = new Country().countryList;
  validateForm!: FormGroup;
  uploadState = false;
  isVisible = false;
  radioValue = '';
  isOkLoading = false;
  fileList: NzUploadFile[] = [];
  fileLists: any = [];
  imgUrl: any = '';
  previewImage: string | undefined = '';
  previewVisible = false;
  upstatus = false;
  uploading = false;
  counter = 15;
  status = 1;
  saveState = false;
  did = '';
  confirmModal?: NzModalRef;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  listOfData: Table[] = [
    {
      key: '1',
      nodeName: 'VN-test-node1',
      address: 'http://192.168.1.23(Beijing)',
      introduction: 'This is a vn node.'
    },
    {
      key: '2',
      nodeName: 'VN-test-node2',
      address: 'http://192.168.1.21(Sydney)',
      introduction: 'This is a vn node.'
    },
  ];
  constructor(private formBuilder: FormBuilder, private message: NzMessageService, private modal: NzModalService, private router: Router) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `BN Onboarding and Configuration`,
      breadcrumb: ['Network Access Configuration', 'BN Onboarding and Configuration'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      enterpriseName: [null, [Validators.required]],
      country: [null, [Validators.required]],
      nodeName: [null, [Validators.required]],
      connection: [null, [Validators.required]],
      description: [null, [Validators.required]],
      introduction: [null, [Validators.required]],
      didDocument: [null, [Validators.required]],
      email: [null, [Validators.required]],
      verificationCode: [null, [Validators.required]]
    });
  }

  handlePreview = (file: NzUploadFile): void => {
    if (!file.thumbUrl && !file['preview']) {
      file['preview'] = getBase64(file.originFileObj!);
    }
    this.previewImage = file.thumbUrl || file['preview'];
    this.previewVisible = true;
  };

  firmwareFileCustomRequest = (file: NzUploadXHRArgs): any => {
    const fd = new FormData();
    fd.append("file", file.file as any);
  }

  beforeUpload = (file: any): boolean => {
    this.fileList = this.fileList.concat(file);
    if (this.fileList.length > 0) {
      this.upstatus = !this.upstatus;
    }
    if (this.fileList[0].type !== 'text/plain') {
      this.message.error('File format error!');
      for (let i = 0; i <= this.fileList.length; i++) {
        this.fileList.splice(0, i);
      }
      this.upstatus = !this.upstatus;
    }
    const up = new Promise((r, e) => {
      const reader = new FileReader();
      reader.onload = (() => {
        if (reader.result) {
          r(reader.result.toString());

        }
      });
      reader.readAsText(file, 'utf-8');
    })
    up.then((res: any) => {
      var obj = JSON.parse(res);
      var pretty = JSON.stringify(obj, undefined, 4);
      this.validateForm.get('didDocument')?.setValue(pretty);
    })
    return false;
  };


  beforeUploads = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isImageType = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/bmp';
      if (!isImageType) {
        this.message.error('You can only upload PNG/JPG/GIF/BMP/JPEG file!');
        return;
      } else {
        observer.next(true);
        observer.complete();
      }
    });


  changed() {
    this.fileLists[0].status = 'done';
  }

  handleRemove = (file: any) => new Observable<boolean>((obs) => {
    for (let i = 0; i <= this.fileList.length; i++) {
      this.fileList.splice(0, i)
    }
    this.upstatus = !this.upstatus;
    location.reload();
  })

  change(value: string): void {
    this.radioValue = value;
  }

  save() {
    this.message.info('save successfully!');
    this.saveState = true;
  }

  submit(form: any) {
    // this.sharedService.setSnapFilter = { form };
    console.log(this.validateForm.value);
    
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Are you sure you want to submit this node?',
      nzContent: '',
      nzOnOk: () => {
        this.router.navigate(['/sand-box/sand-network/onboard/info'], { queryParams: this.validateForm.value })
      }
    });
  }

  send() {
    this.message.info('verification code sent!');
    this.status = 2;
    var timer = setInterval(() => {
      this.counter--;
      if (this.counter < 0) {
        clearInterval(timer);
        this.counter = 15;
        this.status = 1;
      }
    }, 1000)
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    if (this.radioValue === '1') {
      this.validateForm.get('connection')?.setValue(this.listOfData[0].nodeName);
    } else {
      this.validateForm.get('connection')?.setValue(this.listOfData[1].nodeName);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onDownload() {
    location.href = '../../../../assets/did/udpn-did-sdk-1.0.0.jar';
  }

  ngOnDestroy(): void {
    clearInterval(this.counter = 15);
  }
}
