import { Component } from '@angular/core';

import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  user:any;
  title = "EagleSaloon";
  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
    
   
  }
}
