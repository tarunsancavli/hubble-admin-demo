import { NgClass } from '@angular/common';
import {Component} from '@angular/core';



@Component({
  selector: 'app-app-basic',
  templateUrl: './app-basic.component.html',
  styleUrls: ['./app-basic.component.scss']
})

export class AppBasicComponent{
  items: Array<{title: string, src: any, subTitle: Array< any >, expanded: boolean}>

  constructor() {

    this.items = [
      {title: 'Products', src:'../../assets/icon/png/products.png', subTitle: [{title:'Product List', route:'#'}], expanded:false},
      {title: 'Customers', src:'../../assets/icon/png/customer.png', subTitle: [{title:'Customer Details', route:'users/list'},{title:'Orders', route:'#'},{title:'Hubble Plan', route:'#'},{title:'Internal Users', route:'#'},{title:'Change Password', route:'#'}], expanded:true},
      {title: 'Carrier', src:'../../assets/icon/svg/global.svg', subTitle:[{title:'Network Operator', route:'#'}], expanded:false},
      {title: 'Inventory', src:'../../assets/icon/png/inventory.png', subTitle: [{title:'Inventory Information', route:'#'},{title:'IMSI Information', route:'#'}], expanded:false},
      {title: 'Review', src:'../../assets/icon/png/review.png', subTitle: [{title:'Termination Requests', route:'#'},{title:'Billing Information', route:'#'}], expanded:false},
      {title: 'Firmware', src:'../../assets/icon/png/firmware.png', subTitle: [{title:'Firmware Management', route:'#'}], expanded:false},
      {title: 'Security', src:'../../assets/icon/png/security.png', subTitle: [{title:'Blacklisted Domains', route:'#'}], expanded:false}
    ];
    
  }
  
}

