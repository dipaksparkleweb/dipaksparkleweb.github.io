import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AccountService } from 'src/app/_services';

@Component({ templateUrl: 'list.component.html',
styleUrls: [ 'list.component.css' ] })
export class ListComponent implements OnInit {
    users = null;
    Search:string;
    columnname:string;
    currentTutorial = null;
    currentIndex = -1;
    title = '';
  
    page = 1;
    count = 0;
    pageSize = 10;
    pageSizes = [10 ,20,30];
    constructor(private accountService: AccountService) {
      console.log("appointments")
    }

    getRequestParams(page, pageSize): any {
      // tslint:disable-next-line:prefer-const
      let params = {};
  
      if (page) {
        params[`page`] = page - 1;
      }
  
      if (pageSize) {
        params[`size`] = pageSize;
      }
  
      return params;
    }
    ngOnInit() {
      const params = this.getRequestParams(this.page, this.pageSize);
        this.accountService.appointmentsgetAll(params)
            .pipe(first())
            .subscribe(
              users => this.users = users,
              count=>this.count=count
              );
              error => {
                console.log(error);
              }
    }

    
    handlePageChange(event): void {
      this.page = event;
      this.ngOnInit();
    }
  
    handlePageSizeChange(event): void {
      this.pageSize = event.target.value;
      this.page = 1;
      this.ngOnInit();
    }
    searchByName(): void {
      this.accountService.searchByName(this.Search,this.columnname)
        .subscribe(
          users => {
            this.users = users;
            console.log(users);
          },
          error => {
            console.log(error);
          });
    }
    // deleteUser(id: string) {
    //     const user = this.users.find(x => x.id === id);
    //     user.isDeleting = true;
    //     this.accountService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    // }
    deleteUser(id: any){
        Swal.fire({
          title: 'Are you sure want to remove?',
          text: 'You will not be able to recover this file!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            // this.users.splice(id-1,1);
            this.accountService.deleteAppointment(id).subscribe((result)=>{ 
              const params = this.getRequestParams(this.page, this.pageSize);
              this.accountService.appointmentsgetAll(params)
            .pipe(first())
            .subscribe(
              users => this.users = users,
              count=>this.count=count
              );
              // const refreshlist = this.users.find(x => x.id === id);
              // this.users.splice(this.users.indexOf(id-1,1));
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
