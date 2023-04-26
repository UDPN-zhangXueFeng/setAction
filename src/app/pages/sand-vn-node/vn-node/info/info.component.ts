import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from '@app/core/services/http/sand-transaction/transactions/transactions.service';
import { VnNodeService } from '@app/core/services/http/sand-vn-node/vn-node/vn-node.service';
import { TimeLine } from '@app/pages/sand-transaction/transactions/refactor/timeLine.refactor';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.less']
})
export class InfoComponent implements OnInit {

  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerDesc', { static: false }) headerDesc!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };

  @Input() transactionKey: any;
  @Input() transactionType: any;
  info: any = {
    amount: "0",
    details: '',
    did: "",
    fromCurrencyType: "",
    fromPlatformType: "",
    instance: "",
    nodeCode: "",
    rate: "",
    serviceFee: "",
    sourceAccountAddress: "",
    sourceCurrency: "",
    status: "",
    submitDate: "",
    targetAccountAddress: "",
    targetCurrency: "",
    toCurrencyType: "",
    toPlatformType: "",
    transactionKey: "",
    transactionType: 1,
    originalTnName: '',
    originalTnCode: '',
    targetTnName: '',
    targetTnCode: ''
  }
  timeLineList: any[] = [];

  constructor(private vnNodeService: VnNodeService, private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: ``,
      breadcrumb: [],
      extra: this.headerExtra,
      desc: this.headerDesc,
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
      if (this.timeLineList[0].color === 1) {
        up = 0;
      };
      if (this.timeLineList[1].color === 1) {
        up = 1;
      };
      if (this.timeLineList[2].color === 1) {
        up = 2;
        point = 0;
      };
      if (this.timeLineList[2].color === 1 && this.info.transactionType === 1) {
        up = 3;
        point = 2;
      };
      if (this.timeLineList[4].color === 1) {
        up = 3;
        point = 0;
      };
      if (this.timeLineList[5].color === 1) {
        up = 5;
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
    this.route.queryParams.subscribe(params => {// details
      console.log(params);
      this.vnNodeService.getInfo({ transactionKey: params['transactionKey'], transactionType: params['transactionType'] }).subscribe(res => {
        console.log(res.data);
        
        this.info = res.data;
        const timeLine = new TimeLine();
        // console.log(timeLine.doData(res.data));
        this.timeLineList = timeLine.doData(res.data);
        this.setDom();
      })
    })

  }
  private compare(p: any) {
    return function (m: any, n: any) {
      var a = m[p];
      var b = n[p];
      return a - b;
    }
  }
}
