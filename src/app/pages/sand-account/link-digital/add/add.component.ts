import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinkDigitalService } from '@app/core/services/http/sand-account/link-digital/link-digital.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { finalize, Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  isOkLoading = false;
  validateForm!: FormGroup;
  radioValue = '0';
  currencyType: any = "";
  platformTypeOption: any[] = [];
  platformType: any[] = [];
  platformList: Array<any> = [];
  currencyIndex = 0;
  currencyApiArr: any[] = [];
  arrList:Array<any> = [];
  currencyList:Array<any> = [];
  addSubscription!: Subscription;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumbs: [],
    extra: '',
    desc: '',
    footer: ''
  };
  constructor(private formBuilder: FormBuilder, private linkDigitalService: LinkDigitalService, private message: NzMessageService, private location: Location) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Create a Binding`,
      breadcrumbs: [
        {name: 'Account Management'},
        {name: 'Link Digital Currency Account to UDPN DID', url: '/sand-box/sand-account/digital'},
        {name: 'Create a Binding'}
      ],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }
  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      did: [null, [Validators.required]],
      platformType: [this.platformType, [Validators.required]],
      currencyType: [this.currencyType, [Validators.required]],
      currencyAccount: [null, [Validators.required]],
      briefIntroduction: [null, [Validators.required]],
      isDefault: [this.radioValue, [Validators.required]],
    });
    this.initPage();
  }

  private initPage():void{
    this.linkDigitalService.bnActiveTypes().subscribe(
      data => {
        this.arrList = data.data;
      }
    )

    this.linkDigitalService.currencyActive().subscribe(
      data => {
        this.currencyApiArr = data.data;   
      }
    )
  }
  
  onBind() {
    this.isOkLoading = true;
    this.addSubscription = this.linkDigitalService.add(this.validateForm.value).pipe(finalize(() => this.isOkLoading = false)).subscribe(_ => {
      if (_.code === 0) {
        this.message.success('Add successfully!');
        this.validateForm.reset();
        this.location.back();
      }
    })
  }


  onFiledChange(e: any) {
    this.validateForm.get('platformType')?.setValue([]);
    this.arrList.forEach((item, i) => {
      if (e === item.currencyName) {
        this.platformList = item.platformList;
      } else if (e === '') {
        this.platformList = [];
      }
    })
  }
}
