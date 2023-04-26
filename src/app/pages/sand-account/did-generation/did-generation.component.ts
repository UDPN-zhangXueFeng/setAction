import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-did-generation',
  templateUrl: './did-generation.component.html',
  styleUrls: ['./did-generation.component.less']
})
export class DidGenerationComponent implements OnInit ,AfterViewInit{

  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;

  // pageHeaderInfo: Partial<PageHeaderType> = {
  //   breadcrumb: ['Account Management', 'DID generation'],
  // };

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };

  constructor() { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `DID`,
      breadcrumb: ['Account Management', 'DID generation'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }

  ngOnInit() {
  }

  onSearch() {
    location.href = '../../../../assets/did/udpn-did-sdk-1.0.0.jar';
  }

}
