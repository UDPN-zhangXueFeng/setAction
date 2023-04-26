import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

interface List {
  keys: string;
  title: string;
}

@Component({
  selector: 'app-access-currency',
  templateUrl: './access-currency.component.html',
  styleUrls: ['./access-currency.component.less']
})
export class AccessCurrencyComponent implements OnInit {
  permissionList: List[] = [
    {
      keys: '1',
      title: 'Account Creation'
    },
    {
      keys: '2',
      title: 'Link Digital Currency account to UDPN DID'
    },
    {
      keys: '3',
      title: 'Transfer'
    },
    {
      keys: '4',
      title: 'Swap'
    }
  ]
  dataList: NzSafeAny[] = [
    {
      key: '1',
      currencyType: 'USDC-ETH',
      status: 'Enabled',
      link: 'https://www.circle.com/en/usdc'
    },
    {
      key: '2',
      currencyType: 'USDP-ETH',
      status: 'Enabled',
      link: 'https://paxos.com/usdp/#'
    },
    {
      key: '3',
      currencyType: 'EURS-ETH',
      status: 'Available',
      link: 'https://stasis.net/'
    },
    {
      key: '4',
      currencyType: 'XSGD-ETH',
      status: 'Coming Soon',
      link: 'https://www.straitsx.com/sg/xsgd'
    },
    {
      key: '5',
      currencyType: 'CBDC-XXX',
      status: 'Under Research',
      link: 'https://ethereum.org/en/'
    }
  ];
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('currencyTypeTpl', { static: true }) currencyTypeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<NzSafeAny>;
  checkedCashArray: NzSafeAny[] = [];
  tableConfig!: AntTableConfig;
  isVisible:boolean =  false;
  isVisibles:boolean = false;
  // validateForm!: FormGroup;
  isOkLoading = false;
  radioValue = 'Yes';
  confirmModal?: NzModalRef;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  constructor(public message: NzMessageService, private formBuilder: FormBuilder) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Access Digital Currencies`,
      breadcrumb: ['Network Access Configuration', 'Access Digital Currencies'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }
  ngOnInit() {
    this.initTable();
    // this.validateForm = this.formBuilder.group({
    //   transfer: [null, [Validators.required]],
    //   swap: [null, [Validators.required]],
    //   account: [null, [Validators.required]],
    //   link: [null, [Validators.required]],
    // });
  }

  onPermit(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleCancels(): void {
    this.isVisibles = false;
  }

  handleOks(): void {
    this.isVisibles = false;
    // this.listOfData[2].status = 'Enabled';
    this.message.success('confirm successfully!');
  }

  onEnable(): void {
    this.isVisibles = true;
  }
  selectedChecked(e: any): void {
    this.checkedCashArray = [...e];
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: 'Currency type',
          tdTemplate: this.currencyTypeTpl,
          width: 200,
          show: true,
        },
        {
          title: 'Status',
          field: 'status',
          width: 200
        },
        {
          title: 'Action',
          tdTemplate: this.operationTpl,
          fixed: true,
          width: 220
        },
      ],
      total: 0,
      showCheckbox: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
      border: false
    };
  }
}
