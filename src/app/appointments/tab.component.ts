import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import { NgbNavChangeEvent, } from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { first } from 'rxjs/operators';
import {Appointment} from 'src/app/_models'

import { AccountService, AlertService } from 'src/app/_services';//'@app/_services';
import { from } from 'rxjs';

@Component({ templateUrl: 'tab.component.html' })
export class TabComponent implements OnInit {
active = 'Primary';
  users = null;
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;
  activeTab = 'customerinfo';
  selectedItemsList = [];
  scenarioItems: Array<any> = [];
  checkedIDs = [];
  addSiteRowArray = [];
  validateFlag: boolean = false;
  emailFormArray: Array<any> = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings :IDropdownSettings = {};
  name:string;
  mobileNo:string;
  gender:string
  dateTime:any;
  services:string;
  status:string;
  isactive:any;
  // serviceList: any = [
  //   this.accountService.ServicesgetAll()
  //   .subscribe(users => this.users = users)     
  // ];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
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
  removeEmptySites() {
    let tempArray = [];
    this.addSiteRowArray.filter((ele, i) => {
      if (!ele.selectedSite) {
        this.addSiteRowArray.slice(i, 1);
      } else {
        tempArray.push(ele);
      }
    });
    if (tempArray.length) {
      this.addSiteRowArray = tempArray;
    }
  }
  get f() { return this.form.controls; }
  validate(nav): boolean {
    
    if (this.active == "Primary" || this.submitted) {
      if (!this.name) {
        this.alertService.warn("name is required.");
        this.validateFlag = true;
        this.isactive = "Primary";
        return false;
      }
      if (!this.mobileNo) {
        this.alertService.warn("MobileNo is required.");
        this.validateFlag = true;
        this.isactive = "Primary";
        return false;
      }
      if (!this.dateTime) {
        this.alertService.warn("dateTime is required.");
        this.validateFlag = true;
        this.isactive = "Primary";
        return false;
      }
      if (!this.gender) {
        this.alertService.warn("Gender is required.");
        this.validateFlag = true;
        this.isactive = "Primary";
        return false;
      } 
      if (!this.submitted) {
        nav.select("services");
        return true;
      }
    }
    if (this.active == "services" || this.submitted) {
      if (!this.services) {
        this.alertService.warn("Please select at least one service.");
        this.validateFlag = true;
        this.active = "services";
        return false;
      }
      if (!this.status) {
        this.alertService.warn("status is required.");
        this.validateFlag = true;
        this.isactive = "services";
        return false;
      }
    }
   return ;
  }

  
  backManage() {
    if (this.active == "services") {
      this.scenarioItems.some(x => x.id == "Primary") ? this.active = 'Primary' : this.active = "Primary"
    }
  }


  onNavChange(changeEvent: NgbNavChangeEvent) {
    this.validateFlag = false;

    if (changeEvent.nextId == 1 && this.addSiteRowArray.length > 1) {
      this.removeEmptySites();
    }

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
    
 this.selectedItems=items;
 for (let index = 0; index < this.selectedItems.length; index++) {
  this.emailFormArray.push(this.selectedItems[index].serviceId)
   
 }
    
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
//   onChange(serviceName:string, isChecked: boolean) {
//     if(isChecked) {
//       this.emailFormArray.push(serviceName);
//     } else {
//       let index = this.emailFormArray.indexOf(serviceName);
//       this.emailFormArray.splice(index,1);
//     }
// }

onChange(event) {
  let index = this.emailFormArray.indexOf(event.target.value);    
  if(index== -1) {
    this.emailFormArray.push(event.target.value);
  } else {
    
      this.emailFormArray.splice(index,1);
  }
}
search(tab) {
    this.activeTab = tab;
    document.getElementById("site-tab").classList.remove("active");
    document.getElementById("admins-tab").classList.remove("active");
  }

  // convenience getter for easy access to form fields
  

  onSubmit() {
    debugger
    this.submitted = true;
    this.loading = true;
   
    // reset alerts on submit
    this.alertService.clear();
    if (!this.validate(null)) {
      this.submitted = false;
      this.loading = false;
      return false;
    }
    // stop here if form is invalid
   
var appointment:Appointment={
  name:this.name,
mobileNo:this.mobileNo,
dateTime:this.dateTime,
gender:this.gender,
services:this.services,
status:this.status
}


    this.AddApointment(appointment);
    this.loading = true;
   
    // console.warn(this.form.value)
    // this.form.controls['services'].setValue(this.emailFormArray.toString());
    // console.log(this.form.value);
    // this.accountService.Addappointment(this.form.value)
    // .pipe(first())
    // .subscribe({
    //   next: () => {
    //     this.alertService.success('Appointment added successfully', { keepAfterRouteChange: true });
    //     this.router.navigate(['../'], { relativeTo: this.route });
    //   },
    //   error: error => {
    //     this.alertService.error(error);
    //     this.loading = false;
    //   }
    // });
  
  }

  private AddApointment(appointment:Appointment)
  {
      this.spinner.show();
      appointment.services=this.emailFormArray.toString();
      this.accountService.Addappointment(appointment)
        .pipe(first())
        .subscribe({
          next: (createResult) => {
            this.spinner.hide();
            if (createResult!=null) {
              Swal.fire({ icon: 'success', text: 'Appointment successfully created!' });
              this.submitted = false;
              this.loading = false;
              this.router.navigateByUrl('');
            } else {
              this.loading = false;
              this.submitted = false;
              this.alertService.error("Error");
            }
          },
          error: error => {
            this.alertService.error(error);
            this.submitted = false;
            this.loading = false;
            this.spinner.hide();
          }
        });
    }

  }

