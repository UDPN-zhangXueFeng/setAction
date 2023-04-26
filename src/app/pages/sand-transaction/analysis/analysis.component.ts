import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnalysisService } from '@app/core/services/http/sand-transaction/analysis/analysis.service';
import { SwapService } from '@app/core/services/http/sand-transaction/swap/swap.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Chart } from '@antv/g2';
import { inNextTick } from 'ng-zorro-antd/core/util';
import { G2 } from '@antv/g2plot';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
})
export class AnalysisComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  validateForm!: FormGroup;
  validateForm1!: FormGroup;
  nzOptions: any[] = [];
  nzOption: any[] = [];
  multi: any[] = [];
  multi1: any[] = [];
  // set value
  value: string[] = [];
  values: string[] = [];

  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: '',
    selectable: false,
    group: ScaleType.Linear
  };
  view: [number, number] = [1200, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisHeight: number = 100
  yAxisWidth: number = 100
  xAxisLabel: string = 'Total Transaction Value :0';
  yAxisLabel: string = 'Population';
  xAxisLabel1: string = 'Total Transactions :0';
  yAxisLabel1: string = 'Population';
  timeline: boolean = true;
  getScreenWidth: any;
  multi2 = [
    {
      "name": "Germany",
      "series": [
        {
          "type": "1990",
          "value": 62000000
        },
        {
          "type": "2010",
          "value": 73000000
        },
        {
          "type": "2011",
          "value": 89400000
        }
      ]
    },
  ];

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  constructor(private formBuilder: FormBuilder, private analysisService: AnalysisService, private swapService: SwapService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    setInterval(() => {
      this.cdr.markForCheck();
    }, 1000);
  }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Data Analysis`,
      breadcrumb: ['Transaction Management', 'Data Analysis'],
      extra: this.headerExtra,
      desc: '',
      footer: ''
    };
  }

  ngOnInit() {
    this.initValidateFrom();
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth > 900) {
      this.legend = true;
      this.view = [this.getScreenWidth - 400, 300];
    } else if (this.getScreenWidth > 500 && this.getScreenWidth < 900) {
      this.legend = false;
      this.view = [this.getScreenWidth - 200, 300];
    }
    else {
      this.legend = false;
      this.view = [300, 300];
    }
    this.fetchNumber();
    this.getPalt();
  }

  private initValidateFrom() {
    this.validateForm = this.formBuilder.group({
      currencyType: ['',],
      transDateType: ["1"],
      transType: ['']
    });
    this.validateForm1 = this.formBuilder.group({
      currencyType: ['',],
      transDateType: ["1"],
      transType: ['']
    });
  }

  private getPalt() {
    this.swapService.fetchTypes().subscribe(
      data => {
        let option = [
          {
            value: 'All',
            label: 'All',
            children: [{
              value: 'All',
              label: 'All',
              isLeaf: true
            }]
          }
        ];
        data?.data.forEach((element: any) => {
          let optionChildren: any = [
          ];
          element.platformList.forEach((item: any) => {
            optionChildren.push({
              value: item,
              label: item,
              isLeaf: true
            });
          });
          option.push({
            value: element.currencyName,
            label: element.currencyName,
            children: optionChildren
          });

        });
        this.nzOptions = option;
        this.nzOption = option.slice(1);
        this.values = ['All', 'All'];
        this.value = [this.nzOption[0].value, this.nzOption[0].children[0].value];
        this.validateForm1.get('currencyType')?.setValue(this.value);
        this.fetchAmount(this.validateForm1.value);
      }
    );
  }

  fetchAmount(data = this.validateForm1.value) {
    let rData = {
      currencyType: data.currencyType[0],
      platformType: data.currencyType[1],
      transDateType: data.transDateType,
      transType: data.transType === 'All' ? '' : data.transType,
    }
    this.analysisService.amount(rData).subscribe(res => {
      if (res.code === 0) {
        this.xAxisLabel1 = 'Total Transaction Value :' + ' ' + String(res.data.totalAmount).replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,') + res.data.currencyType;
        let multi1: any = [];
        if (res.data.outTransferManageTransactionAmountSelectSubList.length > 0) {
          let series: any = [];
          res.data.outTransferManageTransactionAmountSelectSubList.forEach((item: any) => {
            series.push({
              "name": item.transDate,
              "value": (item.transAmount).toString().replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,')
            });
          })
          multi1.push({
            "name": res.data.currencyType,
            'series': series
          });
          this.multi1 = multi1;
          Object.assign(this, { multi1 });
        } else {
          this.multi1 = multi1;
          Object.assign(this, { multi1 });
        }
      }
      // this.cdr.markForCheck();
    })
  }

  fetchNumber(data = this.validateForm.value) {
    this.analysisService.number(data).subscribe(res => {
      if (res.code === 0) {
        this.xAxisLabel = 'Total Transactions :' + ' ' + String(res.data.totalNum).replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,');
        let multi: any = [];
        if (res.data.outTransferManageTransactionNumberSelectSubList.length > 0) {
          res.data.outTransferManageTransactionNumberSelectSubList.forEach((item: any) => {
            let series: any = [];
            item.outTransferManageTransactionNumberSelectSubSubList.forEach((items: any) => {
              series.push({
                "name": items.transDate,
                "value": (items.transNum).toString().replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,')
              });
            })
            multi.push({
              "name": item.currencyType,
              'series': series
            });
            this.multi = multi;
            Object.assign(this, { multi });
            console.log(this.multi);

          })
        } else {
          this.multi = multi;
          Object.assign(this, { multi });
        }
      }
      // this.cdr.markForCheck();
    })
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth > 900) {
      this.legend = true;
      this.view = [this.getScreenWidth - 400, 300];
    } else if (this.getScreenWidth > 500 && this.getScreenWidth < 900) {
      this.legend = false;
      this.view = [this.getScreenWidth - 200, 300];
    }
    else {
      this.legend = false;
      this.view = [300, 300];
    }
  }

  onQuery() {
    let data;
    if (this.validateForm.get('currencyType')?.value !== '') {
      data = {
        currencyType: this.validateForm.get('currencyType')?.value[0] === 'All' ? '' : this.validateForm.get('currencyType')?.value[0],
        platformType: this.validateForm.get('currencyType')?.value[1] === 'All' ? '' : this.validateForm.get('currencyType')?.value[1],
        transDateType: this.validateForm.get('transDateType')?.value,
        transType: this.validateForm.get('transType')?.value,
      }
    } else {
      data = {
        currencyType: '',
        platformType: '',
        transDateType: this.validateForm.get('transDateType')?.value,
        transType: this.validateForm.get('transType')?.value,
      }
    }
    this.fetchNumber(data);
  }

  onQuery1() {
    let data;
    if (this.validateForm1.get('currencyType')?.value !== '') {
      data = {
        currencyType: this.validateForm1.get('currencyType')?.value,
        platformType: this.validateForm1.get('currencyType')?.value,
        transDateType: this.validateForm1.get('transDateType')?.value,
        transType: this.validateForm1.get('transType')?.value,
      }
    } else {
      data = {
        currencyType: '',
        platformType: '',
        transDateType: this.validateForm1.get('transDateType')?.value,
        transType: this.validateForm1.get('transType')?.value,
      }
    }
    this.fetchAmount(data);
  }
}
