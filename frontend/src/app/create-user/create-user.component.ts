import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { CreateUserService } from '../services/create-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent{

  dropdownList : Array< any > = [];

  selectedList: Array < any > = [];

  dropdownSettings:IDropdownSettings={};

  dropDownForm: FormGroup;

  countryList : any

  profileForm: FormGroup;

  onSubmit() {
    let userData = {
      companyName: this.profileForm.get('companyName')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      email: this.profileForm.get('email')?.value,
      primaryContactNumber: this.profileForm.get('primaryContactNumber')?.value,
      billingAddress: {
        sameEmail: this.profileForm.get('billingAddress.sameEmail')?.value,
        billingEmail: this.profileForm.get('billingAddress.billingEmail')?.value,
        billingAddress: this.profileForm.get('billingAddress.billingAddress')?.value,
        billingCity: this.profileForm.get('billingAddress.billingCity')?.value,
        billingState: this.profileForm.get('billingAddress.billingState')?.value,
        billingCountry: this.profileForm.get('billingAddress.billingCountry')?.value,
        billingZipcode: this.profileForm.get('billingAddress.billingZipcode')?.value,
        billingContact: this.profileForm.get('billingAddress.billingContact')?.value
      },
      duePeriod: this.profileForm.get('duePeriod')?.value,
      CC: this.profileForm.get('CC')?.value,
      BCC: this.profileForm.get('BCC')?.value
    }
    console.log(this.profileForm.value);

    this.createUserService.createCustomer(userData).subscribe(async (data: any) => {
      if(data){
        this.toastr.success("User Created SuccessFully", "Success");
      }
      else {
        this.toastr.error("something Went Wrong, Please Try Again", "Error")
      }
      this.profileForm.reset();
    })
    this.router.navigate(['/users/list']);
  }

  constructor(
    private createUserService: CreateUserService,
    private countryService: CountryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.countryService.getCountries().subscribe((data) => {
      this.countryList = data;
    })

    this.profileForm = this.fb.group({
      companyName: ['',[Validators.minLength(3),Validators.required]],
      firstName: ['',[Validators.minLength(3),Validators.required]],
      lastName: [''],
      email: ['',[Validators.email,Validators.required]],
      primaryContactNumber: ['',[Validators.pattern('^[0-9]{10}$'),Validators.required]],
      billingAddress: this.fb.group({
        sameEmail: ['',Validators.required],
        billingEmail: ['',[Validators.email,Validators.required]],
        billingAddress: ['',[Validators.minLength(3),Validators.required]],
        billingCity: ['',[Validators.minLength(3),Validators.required]],
        billingState: ['',[Validators.minLength(3),Validators.required]],
        billingCountry: ['United States'],
        billingZipcode: ['',[Validators.pattern('^[0-9]{6}$'),,Validators.required]],
        billingContact: ['',[Validators.pattern('^[0-9]{10}$'),Validators.required]]
      }),
      duePeriod: [''],
      CC: [[]],
      BCC: [[]]
    })

    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };

    this.dropdownList = [
      { item_id: 1, item_text: 'Bharath | Bharath.pai@cavliwireless.com' },
      { item_id: 2, item_text: 'Patrick | patrick.prakash@cavliwireless.com' },
      { item_id: 3, item_text: 'Kiran | kiran.gopalan@cavliwireless.com' },
      { item_id: 4, item_text: 'Devika | devika.devdas@cavliwireless.com' },
      { item_id: 5, item_text: 'Nidesh | nidesh.k@cavliwireless.com' }
    ];

  this.selectedList = [];

    this.dropDownForm = this.fb.group({
      myItems: [this.selectedList]
  });

  }

  onAddCC(event: any) {
    let flag =  (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.value))
    this.profileForm.value["CC"].pop();
    if(flag) {
      this.profileForm.value["CC"].push(event.value);
    }
    else {
      this.toastr.error("Please Provide Valid Email!");
    }
  }

  onItemSelect(item : any) {
    this.profileForm.value["BCC"].push(item);
    console.log(this.profileForm.value["BCC"]);
  }

  onItemDeselect(item: any) {
    this.profileForm.value["BCC"] = this.profileForm.value["BCC"].filter((item1: any)=> {
      return item1["item_id"] !== item["item_id"];
    })
    console.log(this.profileForm.value["BCC"]);
  }

  onSelectAll(item: any) {
    this.profileForm.value["BCC"].length = 0;
    this.profileForm.value["BCC"].push(...item);
    console.log(this.profileForm.value["BCC"]);
  }

  onDeSelectAll(item: any) {
    this.profileForm.value["BCC"].length = 0;
    console.log(this.profileForm.value["BCC"]);
  }
}



