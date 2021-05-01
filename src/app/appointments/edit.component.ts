import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from 'src/app/_services';//'@app/_services';

@Component({ templateUrl: 'edit.component.html' })
export class EditComponent implements OnInit {
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;
  emailFormArray: Array<any> = [];
  Services=[];
  service=[];
  isChecked = true;
 
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  Updateproject = new FormGroup({
    appointmentId:new FormControl(''),
    name: new FormControl('',Validators.required),
    mobileNo: new FormControl('', Validators.required),
    dateTime: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    services: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  })
  ngOnInit() {
    this.accountService.appointmentsgetById(this.route.snapshot.params.id).subscribe((result: any) => {
      this.emailFormArray=result.appointments['services'].split(',');
      console.log(this.emailFormArray)
    // this.id = this.route.snapshot.params['id'];
    this.Updateproject = new FormGroup({
      appointmentId:new FormControl(result.appointments['appointmentId']),
      name: new FormControl(result.appointments['name']),
    mobileNo: new FormControl(result.appointments['mobileNo']),
    dateTime: new FormControl(result.appointments['dateTime']),
    gender: new FormControl(result.appointments['gender']),
    services: new FormControl(),
    service: new FormControl(result.appointments['services']),
    status: new FormControl(result.appointments['status']),
    })
    this.Services=result['services'];
   
    
    //this.emailFormArray=this.service
  })
      // this.accountService.appointmentsgetById(this.id)
      //   .pipe(first())
      //   .subscribe(x => this.form.patchValue(x));
    
  }
  
  onChange(event) {
    let index = this.emailFormArray.indexOf(event.target.value);    
    if(index== -1) {
       console.log(this.service)
      this.emailFormArray.push(event.target.value);
    } else {
      
        this.emailFormArray.splice(index,1);
    }
}
get f() { return this.Updateproject.controls; }

  onSubmit() {
    // this.submitted = true;
    // const selectedRoles= this.Updateproject.value.this.Services
    // // reset alerts on submit
    // this.alertService.clear();

    // // stop here if form is invalid
    // // if (this.form.invalid) {
    // //   return;
    // // }

    // this.loading = true; 
    this.Updateproject.controls['services'].setValue(this.emailFormArray.toString());
    console.log(this.Updateproject.value)
    this.accountService.UpdateAppointment(this.Updateproject.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.alertService.success('Update successful', { keepAfterRouteChange: true });
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    });
  }  
}
