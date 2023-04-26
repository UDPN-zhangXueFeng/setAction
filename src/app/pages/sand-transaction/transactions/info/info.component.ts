import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from '@app/core/services/http/sand-transaction/transactions/transactions.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { TimeLine } from '../refactor/timeLine.refactor';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.less']
})
export class InfoComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumbs: [],
    extra: '',
    desc: '',
    footer: ''
  };
  
  @Input() transactionKey: any;
  @Input() transactionType: any;
  info: any = {
    did: "",
    fromCurrencyType: "",
    fromPlatformType: "",
    fxRate: 0,
    outTransactionHistoryList: '',
    sourceAccountAddress: "",
    submitTime: "",
    targetAccountAddress: "",
    toAmount: 0,
    toCurrencyType: '',
    toPlatformType: "",
    totalAmount: 0,
    transAmount: 0,
    transFee: 0,
    transId: "",
    transKey: "",
    transStatus: 1,
    transType: "",
    originalTnName: '',
    originalTnCode: '',
    targetTnName: '',
    targetTnCode: ''
  }
  timeLineList: any[] = [];

  constructor(private transactionsService: TransactionsService, private route: ActivatedRoute) { }
  
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Detail`,
      breadcrumbs: [
        {name: 'Transaction Management'},
        {name: 'Transactions Search', url: '/sand-box/sand-transaction/transactions'},
        {name: 'Detail'}
      ],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }
  ngOnInit() {
    this.getInfo();
  }
  setDom() {
    setTimeout(() => {
      let up = 0;
      let point = 0;
      if (this.timeLineList[this.timeLineList.length - 1].color === 1) {
        up = 1;
      };
      if (this.timeLineList[0].color === 1) {
        up = 2;
      };
      if (this.timeLineList[1].color === 1) {
        up = 3;
      };
      if (this.timeLineList[2].color === 1) {
        up = 5;
        point = 1;
      };
      if (this.timeLineList[2].color === 1 && this.info.transactionType === 1) {
        up = 3;
        point = 2;
      };
      if (this.timeLineList[4].color === 1) {
        up = 5;
        point = 0;
      };
      if (this.timeLineList[5].color === 1) {
        up = 7;
        point = 2;
      };

      const el: any = document.getElementsByClassName('ant-timeline-item-tail');
      for (var i = 0; i < el.length; i++) {
        if (i > up) {
          el[i].style['border-left'] = '2px solid #cfcfcf'
        }
      }
      const elImg: any = document.getElementsByClassName('points');
      for (var i = 0; i < elImg.length; i++) {
        if (i > up) {
          elImg[i].style['filter'] = 'grayscale(1)';
        }
      }
      const elPoint: any = document.getElementsByClassName('lastPoints');
      for (var i = 0; i < elPoint.length; i++) {
        if (i > point) {
          elPoint[i].style['filter'] = 'grayscale(1)';
        }
      }
    }, 100)
  }
  getInfo() {
    this.route.queryParams.subscribe(params => {
      this.transactionsService.getInfo({ transKey: params['transId'], transType: params['transType'] }).subscribe((res: any) => {
        // sort
        // console.log(res);
        this.info = res.data;
        const timeLine = new TimeLine();
        this.timeLineList = timeLine.doData(res.data);
        this.setDom();
        return;

      })
    });

  }
  private compare(p: any) {
    return function (m: any, n: any) {
      var a = m[p];
      var b = n[p];
      return a - b;
    }
  }

}
