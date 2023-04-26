import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { DateFormat } from '@app/shared/pipes/map.pipe';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.less']
})
export class InfoComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumbs: [],
    extra: '',
    desc: '',
    footer: ''
  };
  headers: any;
  time = new Date();
  dateFormat = DateFormat.DateTime;
  // data = this.date;
  getDate = new Date().getFullYear() + '-' + (this.time.getMonth() + 1) + '-' + this.time.getDate();
  getTime = new Date().getHours() + ':' + this.time.getMinutes() + ':' + this.time.getSeconds() + '';
  newDate = this.getDate + ' ' + this.getTime;
  infoList: any = {};
  constructor(public routeInfo: ActivatedRoute, private date: DatePipe) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Detail`,
      breadcrumbs: [
        {name: 'Network Access Configuration'},
        {name: 'BN Onboarding and Configuration', url: '/sand-box/sand-network/onboard'},
        {name: 'Detail'}
      ],
      extra: this.headerExtra,
      desc: '',
      footer: ''
    };
  }
  ngOnInit() {
    this.routeInfo.queryParams.subscribe((res: any) => {
      this.infoList = res;
    });
  }
  download(filename:any ,content:any ,contentType:any ) {
    if (!contentType) contentType = 'application/octet-stream';
    var a = document.createElement('a');
    var blob = new Blob([content], { 'type': contentType });
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    
  }

}
