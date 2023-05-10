import { Component, OnInit,OnDestroy } from '@angular/core';
import { ListUsersService } from '../services/list-users.service';
import { PagerService } from '../services/pager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit{ 

  customers: Array< any > = [];

  pager: any = {};

  userPageSelected : number = 0;

  searchKeyWord = '';

  data : any;

  constructor(
    private listService: ListUsersService,
    private pagerService: PagerService,
    private toastr: ToastrService
  ) { 
  }
  ngOnInit(): void {
    this.loadCustomers();
  }

  onKey(value: string){
    this.searchKeyWord = value;
    this.loadCustomers();
  }

  loadCustomers(page: number = 0, limit:number = 10){
    if(this.pagerService.pageNumberSelected !== 0){
      this.listService.getCustomerList(this.searchKeyWord, this.pagerService.pageNumberSelected, limit).subscribe(async (data: any)=> {
        this.data = await data;
        this.customers = await data.Users;
        let page = this.pagerService.pageNumberSelected;
        this.setPage(page);
        },
        error => {
          this.toastr.error('Something went wrong','Error');
        }
        ); 
    } else {
      this.listService.getCustomerList(this.searchKeyWord.trim())
      .subscribe(async(data: any) => {
        this.data = await data;
        this.customers = await data.Users;
        let page = this.pagerService.pageNumberSelected;
        this.setPage(page);
      },
      err => {
        this.toastr.error('Something went wrong','Error');
      })
    }
}

setPage(page: number) {
  this.userPageSelected = page;
  this.pagerService.pageNumberSelected = page;
  this.pager = this.pagerService.getPager(this.data['total'],page);
  this.listService.getCustomerList(this.searchKeyWord,this.pager.currentPage)
  .subscribe(async (data: any) => {
    this.customers = await data.Users;
  },
  err => {
    this.toastr.error('Something went wrong','Error');
  })
}

setPrevPage() {
  this.userPageSelected--;
  this.loadCustomers(this.userPageSelected);
}

setNextPage() {
  this.userPageSelected++;
  this.loadCustomers(this.userPageSelected);
}

}
