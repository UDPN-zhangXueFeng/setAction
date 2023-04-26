import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '@app/core/services/http/sand-transaction/search/search.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface SearchParam {
  key: string;

}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  loading: boolean = false;
  searchParam: Partial<SearchParam> = {
    key: ''
  };
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  constructor(private formBuilder: FormBuilder, private searchService: SearchService, private router: Router) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Search by Transaction Key`,
      breadcrumb: ['Transaction Management', 'Search by Transaction Key'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }
  ngOnInit() {
  }

  onQuery() {
    this.loading = true;
    this.searchService.search(this.searchParam).subscribe(res => {
      this.loading = false;
      if (res.code === 0) {
        this.router.navigate(['/sand-box/sand-transaction/transactions/info'], { queryParams: { 'transType': res.data.transType, 'transId': res.data.transId } })
      }
    });
  }

  resetForm(): void {
    this.searchParam = {};
  }

}
