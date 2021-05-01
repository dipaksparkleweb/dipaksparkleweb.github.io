import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from 'src/app/_services';//'@app/_services';

@Component({ templateUrl: 'add.component.html' })
export class AddComponent implements OnInit {
  users = null;
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;
  selectedItemsList = [];
  checkedIDs = [];
  emailFormArray: Array<any> = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings :IDropdownSettings = {};
  // serviceList: any = [
  //   this.accountService.ServicesgetAll()
  //   .subscribe(users => this.users = users)     
  // ];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
    
      name:['',Validators.required],
      services:['',Validators.required],
    mobileNo:['',Validators.required],
    gender:['',Validators.required],
    dateTime:['',Validators.required],
    // services:new FormControl('',[Validators.required]),
    status:['',Validators.required],
    
    })
  }
  

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'serviceId',
      textField: 'serviceName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3
    };

     this.accountService.ServicesgetAll()
             .subscribe(users => this.users = users);          
    // this.fetchSelectedItems()
    // this.fetchCheckedIDs()                                                                     
  }

  onItemSelect(item: any) {
    this.emailFormArray.push(item.serviceId)
    console.log(this.emailFormArray);
  }
  onItemDeSelect(items: any) {
    let index = this.emailFormArray.indexOf(items.serviceId);
      this.emailFormArray.splice(index,1);
    console.log(items);
  }
  onSelectAll(items: any) {
   
    this.emailFormArray=items;
    console.log(this.emailFormArray);
  }
  onDeSelectAll(items: any) {
    this.emailFormArray = [];
    console.log(items);
  }
 
  // changeSelection() {
  //   this.fetchSelectedItems()
  // }

  // fetchSelectedItems() {
  //   this.selectedItemsList = this.serviceList.filter((value, index) => {
  //     return value.serviceId
  //   });
  // }
  onChange(serviceName:string, isChecked: boolean) {
    if(isChecked) {
      this.emailFormArray.push(serviceName);
    } else {
      let index = this.emailFormArray.indexOf(serviceName);
      this.emailFormArray.splice(index,1);
    }
}

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
   
    console.warn(this.form.value)
    this.form.controls['services'].setValue(this.emailFormArray.toString());
    console.log(this.form.value);
    this.accountService.Addappointment(this.form.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.alertService.success('Appointment added successfully', { keepAfterRouteChange: true });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    });
  
  }

  
}
