import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from 'src/app/_services';

@Component({ templateUrl: 'resetpassword.component.html' })
export class ResetpasswordsComponent implements OnInit {
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;
  title = "EagleSaloon";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
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
    this.accountService.resetpassword(this.f.email.value)
      .pipe(first())
      .subscribe({
        next: (user) => {
          if (user.isSuccess) {
            this.alertService.success(user.message);
            this.loading = false;
            alert(user.message);
            //get return url from query parameters or default to home page
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          }
          else {
            this.alertService.error(user.errors[0]);
            this.loading = false;
            user.isSuccess = false;
          }
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
