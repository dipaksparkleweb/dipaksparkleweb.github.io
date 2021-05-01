import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from 'src/app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  title = "EagleSaloon";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      phone: ['', [Validators.required]],
      password: ['', Validators.required]
    });
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
    this.accountService.login(this.f.phone.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: (user) => {
         
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);   
        },
        error: error => { 
          console.log(error);
          this.alertService.error("MobileNo and password incorrect");
          this.loading = false;
        }
      });
  }
}
