import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ThemeService } from '@app/core/services/store/common-store/theme.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'a15-udpn-tem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();

  constructor(private themesService: ThemeService) {}
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `About UDPN`,
      breadcrumb: ['Home'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }


  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
}
