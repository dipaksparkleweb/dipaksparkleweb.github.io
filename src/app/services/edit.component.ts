import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from 'src/app/_services';//'@app/_services';

@Component({ templateUrl: 'edit.component.html' })
export class EditComponent implements OnInit {
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }
  Updateproject = new FormGroup({
    serviceName: new FormControl(''),
    price: new FormControl(''),
    status: new FormControl(''),
    serviceId:new FormControl('')
  })
  ngOnInit() {
    this.accountService.ServicesgetById(this.route.snapshot.params.id).subscribe((result: any) => {
      this.Updateproject = new FormGroup({
        serviceName: new FormControl(result['serviceName']),
        price: new FormControl(result['price']),
        status: new FormControl(result['status']),
        serviceId: new FormControl(result['serviceId']),
    
    })
  })
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.Updateproject.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.Updateproject.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.UpdateServices(this.id, this.Updateproject.value)
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
