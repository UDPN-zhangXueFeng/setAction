import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
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
  info: any = {};
  constructor(public routeInfo: ActivatedRoute) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Detail`,
      breadcrumbs: [
        {name: 'Contract Deployment', url: '/sand-box/sand-contract/contract'},
        {name: 'Detail'}
      ],
      extra: this.headerExtra,
      desc: '',
      footer: ''
    };
  }

  ngOnInit() {
    this.routeInfo.queryParams.subscribe(params => {
      this.info = params;
    });
  }

}
