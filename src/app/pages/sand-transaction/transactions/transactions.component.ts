import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TransactionsService } from '@app/core/services/http/sand-transaction/transactions/transactions.service';
import { SearchCommonVO } from '@app/core/services/types';
import { AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize, Subscription } from 'rxjs';
interface SearchParam {
  did: string;
  transKey: string;
  transType: string;
  fromCurrencyType: string;
  fromPlatformType: string;
  toCurrencyType: string;
  toPlatformType: string;
  createTime: string;
  transStatus: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.less']
})
export class TransactionsComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  platfromArrList: any[] = [];
  curryArrList: any[] = [];
  isCollapse: boolean = true;
  checkedCashArray: NzSafeAny[] = [];
  tableConfig!: AntTableConfig;
  dataList: NzSafeAny[] = [];
  dateFormat = 'yyyy/MM/dd';
  @ViewChild('operationTpl', { static: true })
  operationTpl!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  searchParam: Partial<SearchParam> = {
    did: '',
    transKey: '',
    transType: '',
    fromCurrencyType: '',
    fromPlatformType: '',
    toCurrencyType: '',
    toPlatformType: '',
    createTime: '',
    transStatus: ''

  };
  constructor(private transactionsService: TransactionsService, private message: NzMessageService, private cdr: ChangeDetectorRef,) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Transactions Search`,
      breadcrumb: ['Transaction Management', 'Transactions Search'],
      extra: this.headerExtra,
      desc: '',
      footer: ''
    };
  }

  ngOnInit() {
    this.initTable();
    this.initData();
    console.log(this.tableConfig.xScroll);
    
  }

  initData() {
    this.transactionsService.getCurry().subscribe(res => {
      this.curryArrList = res.data;
    });
    this.transactionsService.getPlatm().subscribe(res => {
      this.platfromArrList = res.data;
    })
  }

  selectedChecked(e: any): void {
    this.checkedCashArray = [...e];
  }

  reloadTable(): void {
    this.message.info('Has been refreshed');
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
  resetForm() {
    this.searchParam = {};
    this.searchParam.createTime = '';
    this.getDataList();
  }

  onDetail() {

  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.transactionsService.search(params.pageNum, params.pageSize, params.filters).pipe(finalize(() => {
      this.tableLoading(false);
    })).subscribe(((data: any) => {
      this.dataList = data.data;
      this.tableConfig.total = data.resultPageInfo.total;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    }));
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: 'DID',
          field: 'did',
          width: 320,
        },
        {
          title: 'Txn Key',
          field: 'transKey',
          width: 300,
        },
        {
          title: 'Txn Type',
          field: 'transType',
          pipe: 'vnType',          
          width: 90,
        },
        {
          title: 'Source Currency',
          field: 'fromCurrencyType',
          width: 140,
        },
        {
          title: 'Amount',
          field: 'transAmount',
          width: 180,
        },
        {
          title: 'Target Currency',
          field: 'toCurrencyType',
          width: 140,
        },
        {
          title: 'Submission Time',
          field: 'submitTime',
          width: 180,
        },
        {
          title: 'Status',
          field: 'transStatus',
          pipe: 'vnStatus',
          width: 120,
        },
        {
          title: 'Action',
          tdTemplate: this.operationTpl,
          fixed: true,
          width: 80
        },
      ],
      total: 0,
      showCheckbox: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
    };
  }

}
