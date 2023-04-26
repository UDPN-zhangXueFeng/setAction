import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinkBusinessService } from '@app/core/services/http/sand-account/link-business/link-business.service';
import { WindowsWidthService } from '@app/core/services/store/common-store/windows-width.service';
import { SearchCommonVO } from '@app/core/services/types';
import { AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize, Subscription } from 'rxjs';
interface SearchParam {
  businessAccount: string;
  did: string;
}


@Component({
  selector: 'app-link-business',
  templateUrl: './link-business.component.html',
  styleUrls: ['./link-business.component.less']
})
export class LinkBusinessComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  searchParam: Partial<SearchParam> = {
    businessAccount: '',
    did: ''
  };
  validateForm!: FormGroup;
  tableConfig!: AntTableConfig;
  checkedCashArray: NzSafeAny[] = [];
  dataList: NzSafeAny[] = [];
  platformType: any = "";
  platformApiArr: any[] = [];
  currencyApiArr: any[] = [];
  currencyType: any = "";
  currencyList: Array<any> = [];
  platformList: Array<any> = [];
  arrList: Array<any> = [];
  sortName: any = null;
  sortValue: any = null;
  isVisible: boolean = false;
  isConfirmLoading: boolean = false;
  type: any = 'add';
  bindingId: any = '';
  @ViewChild('operationTpl', { static: true })
  operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('currencyTypeTpl', { static: true })
  currencyTypeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('currencyAccountTpl', { static: true })
  currencyAccountTpl!: TemplateRef<NzSafeAny>;
  constructor(public message: NzMessageService, private cdr: ChangeDetectorRef, private modal: NzModalService, private linkBusinessService: LinkBusinessService, private formBuilder: FormBuilder) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Link UDPN DID to Business Account`,
      breadcrumb: ['Account Management', 'Link UDPN DID to Business Account'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }

  ngOnInit() {
    this.initTable();
    this.validateForm = this.formBuilder.group({
      did: ['', [Validators.required]],
      businessAccount: ['', [Validators.required]],
    });
  }

  selectedChecked(e: any): void {
    this.checkedCashArray = [...e];
  }

  reloadTable(): void {
    this.message.info('Has been refreshed');
    this.getDataList();
  }

  tableChangeDectction(): void {
    // this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  resetForm(): void {
    this.searchParam = {};
    this.dataList = [];
  }

  search(): void {
    if (this.sortName && this.sortValue) {
      this.dataList = this.dataList.sort((a, b) => (this.sortValue === 'desc') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.dataList = this.dataList;
    }
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.linkBusinessService.list(params.pageNum, params.pageSize, params.filters).pipe(finalize(() => {
      this.tableLoading(false);
    })).subscribe(((data: any) => {
      this.dataList = data.data;
      this.tableConfig.total = data.resultPageInfo?.total!;;

    }));
  }

  unbind(bindingId: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to Unbind ?',
      nzContent: '',
      nzOnOk: () => {
        this.tableLoading(true);
        this.linkBusinessService.unbind({ bindingId }).pipe(finalize(() => this.tableLoading(false))).subscribe(_ => {
          if (_.code === 0) {
            this.message.success('Unbind successfully!');
          }
          this.getDataList();
        });

      },
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    if (this.type === 'add') {
      this.linkBusinessService.add(this.validateForm.value).pipe(finalize(() => this.isConfirmLoading = false)).subscribe(_ => {
        if (_.code === 0) {
          this.message.success('Add successfully!');
        }
        this.validateForm.reset();
        this.isVisible = false;
      })
    } else {
      this.linkBusinessService.edit(
        {
          bindingId: this.bindingId,
          businessAccount: this.validateForm.get('businessAccount')?.value,
          did: this.validateForm.get('did')?.value
        }).pipe(finalize(() => this.isConfirmLoading = false)).subscribe(_ => {
          if (_.code === 0) {
            this.message.success('Edit successfully!');
            this.validateForm.reset();
          }
          this.isVisible = false;

        })
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateForm.reset();

  }

  showModal(type: string, bindingId: any, did: string, businessAccount: string): void {
    this.isVisible = true;
    this.type = type;
    if (this.type === 'edit') {
      this.validateForm.get('did')?.setValue(did);
      this.validateForm.get('businessAccount')?.setValue(businessAccount);
      this.bindingId = bindingId;
    }
  }
  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: 'Business account',
          field: 'businessAccount',
          width: 200,
          show: true,
        },
        {
          title: 'DID (linked to business account)',
          field: 'did',
          width: 300
        },
        {
          title: 'Currency type',
          tdTemplate: this.currencyTypeTpl,
          width: 200
        },
        {
          title: 'Currency account (linked to DID)',
          tdTemplate: this.currencyAccountTpl,
          width: 350
        },
        {
          title: 'Action',
          tdTemplate: this.operationTpl,
          fixed: true,
          width: 200
        },
      ],
      total: 0,
      showCheckbox: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
      border: true
    };
  }

}
