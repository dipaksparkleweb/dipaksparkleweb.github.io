import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AccountService } from 'src/app/_services';

@Component({ templateUrl: 'list.component.html',
styleUrls: [ 'list.component.css' ] })
export class ListComponent implements OnInit {
    users = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.ServicesgetAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    // deleteUser(id: string) {
    //     const user = this.users.find(x => x.id === id);
    //     user.isDeleting = true;
    //     this.accountService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    // }
    deleteUser(serviceId: any){
        Swal.fire({
          title: 'Are you sure want to remove?',
          text: 'You will not be able to recover this file!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.users.splice(serviceId-1,1);
            this.accountService.DeleteServices(serviceId).subscribe((result)=>{ 
              // this.users.splice(id-1,1);
              const refreshlist = this.users.find(x => x.id === serviceId);
              this.users.splice(this.users.indexOf(refreshlist), 1);
            })
            // const user = this.users.find(x => x.id === id);
            // user.isDeleting = true;
            // this.accountService.delete(id)
            //     .pipe(first())
            //     .subscribe(() => this.users = this.users.filter(x => x.id !== id));
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        })
}
}
