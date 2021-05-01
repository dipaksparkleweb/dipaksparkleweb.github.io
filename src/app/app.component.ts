import { Component } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
  title = 'EagleSaloon';
  user: User;
  apiUrl: string;
  constructor(private accountService: AccountService, private httpClient: HttpClient) {
    this.accountService.user.subscribe(x => this.user = x);
    
  }
  ngOnInit() {
    this.httpClient.get("assets/config.json").subscribe(data => {
      this.apiUrl = data['apiUrl'];
      this.accountService.apiUrl = this.apiUrl;
    })
  }

  logout() {
    Swal.fire({
      title: 'Are you sure want to Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.accountService.logout();
        // const user = this.users.find(x => x.id === id);
        // user.isDeleting = true;
        // this.accountService.delete(id)
        //     .pipe(first())
        //     .subscribe(() => this.users = this.users.filter(x => x.id !== id));
        Swal.fire(
          'Logout!',
          'Logout has been successfully.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
        )
      }
    })

    
  }
}
