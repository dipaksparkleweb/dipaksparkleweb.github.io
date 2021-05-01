import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from 'src/app/_services';

@Component({
  templateUrl: './changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
  form: FormGroup;

  users:any;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  title = "EagleSaloon";

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) {
      this.users = this.accountService.userValue.email;
     }
   
  ngOnInit(): void {
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(8)];
    this.isAddMode = true;
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      email:this.users,
      oldpassword: ['', passwordValidators],
      newpassword: ['', passwordValidators],
      confirmpassword: ['', passwordValidators],
    }, { validator: this.mustMatch('newpassword', 'confirmpassword') });
  }
  
  mustMatch(controlName: string, matchingControlName: string) {
    return (group: FormGroup) => {
      const control = group.controls[controlName];
      const matchingControl = group.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  // convenience getter for easy access to form fields
  get f() {

     return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.changepassword(this.f.oldpassword.value, this.f.newpassword.value,this.f.email.value)
      .pipe(first())
      .subscribe({
        next: (user) => {
          this.loading = false;
          if (user.isSuccess) {
            this.alertService.success("Password Changed Successfully.");
            this.form.reset();
          }
          else {
            this.alertService.error(user.errors[0]);
          }
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
