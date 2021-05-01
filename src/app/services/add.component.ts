import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from 'src/app/_services';//'@app/_services';

@Component({ templateUrl: 'add.component.html' })
export class AddComponent implements OnInit {
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
  add=new FormGroup({
    serviceName:new FormControl('', [Validators.required]),
    price:new FormControl('',[Validators.required]),
    status:new FormControl('',[Validators.required]),
  })
  ngOnInit() {
   
   
  }

  // convenience getter for easy access to form fields
  get f() { return this.add.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.add.invalid) {
      return;
    }
console.warn(this.add.value)
    this.loading = true;
    this.accountService.AddServices(this.add.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.alertService.success('Services added successfully', { keepAfterRouteChange: true });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    });
  
  }


}
