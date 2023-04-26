import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TransactionsService } from '@app/core/services/http/sand-transaction/transactions/transactions.service';
import { VnNodeService } from '@app/core/services/http/sand-vn-node/vn-node/vn-node.service';
import { SearchCommonVO } from '@app/core/services/types';
import { AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize, Subscription } from 'rxjs';
interface SearchParam {
  instance: string;
  did: string;
  transactionKey: string;
  transactionType: string;
  fromCurrencyType: string;
  fromPlatformType: string;
  toCurrencyType: string;
  toPlatformType: string;
  createTime: string;
  status: string;
}

@Component({
  selector: 'app-vn-node',
  templateUrl: './vn-node.component.html',
  styleUrls: ['./vn-node.component.less']
})
export class VnNodeComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerDesc', { static: false }) headerDesc!: TemplateRef<NzSafeAny>;
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
    instance: '',
    did: '',
    transactionKey: '',
    transactionType: '',
    fromCurrencyType: '',
    fromPlatformType: '',
    toCurrencyType: '',
    toPlatformType: '',
    createTime: '',
    status: ''

  };
  constructor(private vnNodeService: VnNodeService, private message: NzMessageService, private cdr: ChangeDetectorRef,) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: ``,
      breadcrumb: [],
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
    this.vnNodeService.getCurry().subscribe(res => {
      this.curryArrList = res.data;
    });
    this.vnNodeService.getPlatm().subscribe(res => {
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
    this.vnNodeService.search(params.pageNum, params.pageSize, params.filters).pipe(finalize(() => {
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
          title: 'BN Name',
          field: 'instance',
          width: 100,
        },
        {
          title: 'DID',
          field: 'did',
          width: 320,
        },
        {
          title: 'Txn Key',
          field: 'transactionKey',
          width: 300,
        },
        {
          title: 'Txn Type',
          field: 'transactionType',
          pipe: 'vnType',
          width: 90,
        },
        {
          title: 'Source Currency',
          field: 'sourceCurrency',
          width: 140,
        },
        {
          title: 'Amount',
          field: 'amount',
          width: 100,
        },
        {
          title: 'Target Currency',
          field: 'targetCurrency',
          width: 140,
        },
        {
          title: 'Transaction Submit Time',
          field: 'submitDate',
          pipe: 'date:yyyy-MM-dd HH:mm',
          width: 180,
        },
        {
          title: 'Status',
          field: 'status',
          pipe: 'vnStatus',
          width: 200,
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
