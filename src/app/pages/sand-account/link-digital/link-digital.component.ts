import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LinkDigitalService } from '@app/core/services/http/sand-account/link-digital/link-digital.service';
import { ThemeService } from '@app/core/services/store/common-store/theme.service';
// import { linkDigitalService } from '@app/core/services/http/it-system/account-did.service';
import { WindowsWidthService } from '@app/core/services/store/common-store/windows-width.service';
import { SearchCommonVO } from '@app/core/services/types';
import { AntTableConfig, SortFile } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize, Subscription } from 'rxjs';
interface SearchParam {
  currencyAccount: string;
  currencyType: string;
  platformType: string;
  did: string;
}

@Component({
  selector: 'app-link-digital',
  templateUrl: './link-digital.component.html',
  styleUrls: ['./link-digital.component.less']
})
export class LinkDigitalComponent implements OnInit {
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
    currencyType: '',
    platformType: '',
    did: ''
  };
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
  listSubscription!: Subscription;
  defaultSubscription!: Subscription;
  bindSubscription!: Subscription;
  isOverMode$ = this.themesService.getIsOverMode();
  @ViewChild('operationTpl', { static: true })
  operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('currencyAccountTpl', { static: true })
  currencyAccountTpl!: TemplateRef<NzSafeAny>;
  constructor(public message: NzMessageService, private cdr: ChangeDetectorRef, private modal: NzModalService,
    private linkDigitalService: LinkDigitalService, private winWidthService: WindowsWidthService, private themesService: ThemeService) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Link Digital Currency Account to UDPN DID`,
      breadcrumb: ['Account Management', 'Link Digital Currency Account to UDPN DID'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }

  ngOnInit() {
    this.initTable();
    this.initPage();
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

  changeSort(e: SortFile): void {
    this.sortName = e.fileName;
    this.sortValue = e.sortDir;
    this.search();

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

  private initPage(): void {
    this.linkDigitalService.bnFetchTypes().subscribe(
      data => {
        this.arrList = data.data;
      }
    )
    this.linkDigitalService.currencyApi().subscribe(
      data => {
        this.currencyApiArr = data.data;
      }
    )
  }

  onFiledChange(e: any) {
    this.searchParam.platformType = '';
    this.arrList.forEach((item, i) => {
      if (e === item.currencyName) {
        this.platformList = item.platformList;
      } else if (e === '') {
        this.platformList = [];
      }
    })
  }

  getDataList(e?: NzTableQueryParams): void {
    if (!this.searchParam.did) {
      return;
    }
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.listSubscription = this.linkDigitalService.list(params.pageNum, params.pageSize, params.filters).pipe(finalize(() => {
      this.tableLoading(false);
    })).subscribe(((data: any) => {
      this.dataList = data.data;
      this.tableConfig.total = data.resultPageInfo?.total!;
      this.tableLoading(false);
    }));
  }

  unbind(accountBindingId: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to Unbind ?',
      nzContent: '',
      nzOnOk: () => {
        this.tableLoading(true);
        this.bindSubscription = this.linkDigitalService.unbind({ accountBindingId }).pipe(finalize(() => {})).subscribe(_ => {
          if (_.code === 0) {
            this.message.success('Unbind successfully!');
          }
          this.getDataList();
        }, error => this.tableLoading(false));

      },
    });
  }

  isDefault(accountBindingId: string) {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to change the default binding account ?',
      nzContent: '',
      nzOnOk: () => {
        this.defaultSubscription = this.linkDigitalService.default({ accountBindingId, isDefault: 1 }).pipe(finalize(() => this.tableLoading(true))).subscribe(_ => {
          if (_.code === 0) {
            this.message.success('Set as Default Account successfully!');
          }
          this.getDataList();
        }, error => this.tableLoading(false));

      },
    });
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: 'Currency type',
          field: 'currencyType',
          showSort: true,
          width: 200,
          show: true,
        },
        {
          title: 'Digital Currency Account Address',
          field: 'currencyAccount',
          tdTemplate: this.currencyAccountTpl,
          width: 350
        },
        {
          title: 'Binding Time',
          field: 'createDate',
          showSort: true,
          width: 200
        },
        {
          title: 'Action',
          tdTemplate: this.operationTpl,
          fixed: true,
          width: 250
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

  ngOnDestroy(): void {
    this.listSubscription?.unsubscribe();
    this.bindSubscription?.unsubscribe();
    this.defaultSubscription?.unsubscribe();
  }


}
