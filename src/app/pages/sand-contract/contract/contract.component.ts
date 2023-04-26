import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.less']
})
export class ContractComponent implements OnInit {
  dataList: NzSafeAny[] = [
    {
      key: '1',
      contractName: 'Example contract',
      number: '0.8.0',
      description: "The basic functions of erc-20 token are simply realized.",
      deploymentTime: "--",
      status: 'Not deployed'
    },
    {
      key: '2',
      contractName: 'FiatTokenProxy',
      number: 'v0.4.24+commit.e67f0147',
      description: "Smart contract deployed by USDC on ETH.",
      deploymentTime: "--",
      status: 'Deploying'
    },
    {
      key: '3',
      contractName: 'AdminUpgradeabilityProxy',
      number: 'v0.4.24+commit.e67f0147',
      description: " Smart contract deployed by USDP on ETH.",
      deploymentTime: "2021-12-07 11:34:12 AM GMT+8	",
      status: 'Deployment successful'
    },
    {
      key: '4',
      contractName: 'FiatTokenProxy',
      number: 'v0.4.24+commit.e67f0147',
      description: "Smart contract deployed by USDC on ETH.",
      deploymentTime: "2021-11-22 10:18:14 AM GMT+8	",
      status: 'Deployment failed'
    },
  ];
  checkedCashArray: NzSafeAny[] = [];
  confirmModal?: NzModalRef;
  tableConfig!: AntTableConfig;
  validateForm!: FormGroup;
  isVisible = false;
  isOkLoading = false;
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true })
  operationTpl!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  constructor(private modal: NzModalService, private message: NzMessageService, private formBuilder: FormBuilder) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Contract`,
      breadcrumb: ['Contract Deployment'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }
  ngOnInit() {
    this.initTable();
    this.validateForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  selectedChecked(e: any): void {
    this.checkedCashArray = [...e];
  }

  download(key: any) {
    if (key === '1') {
      location.href = '../../../../assets/contract/example.sol.docx'
    } else if (key === '2') {
      location.href = '../../../../assets/contract/fiatTokenProxy.sol.docx'
    } else {
      location.href = '../../../../assets/contract/adminUpgradeabilityProxy.sol.docx'
    }
  }

  manage() {
    this.confirmModal = this.modal.confirm({
      nzTitle: '<i>Notice: This function is displayed for demo purposes only.It is not functional yet.</i>',
      nzContent: '',
      nzOnOk: () => {
        this.message.success('manage successfully!')
      }
    });
  }

  deploy(): void {
    this.isVisible = true;
  }
  
  handleOk(): void {
    this.isVisible = false;
    this.validateForm.reset();
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Are you sure you want to use this BN’s private key to deploy the contract?',
      nzContent: '',
      nzOnOk: () => {
        this.message.success('deploy successfully!')
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateForm.reset();
  }
  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: 'Contract name',
          field: 'contractName',
          width: 220,
          show: true,
        },
        {
          title: 'Version No.',
          field: 'number',
          width: 220
        },
        {
          title: 'Description',
          field: 'description',
          width: 380
        },
        {
          title: 'Deployment time',
          field: 'deploymentTime',
          width: 280
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
}
