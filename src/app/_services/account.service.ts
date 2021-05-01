import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';//'@environments/environment';
import { User } from 'src/app/_models';

// '@app/_models';
//import { debug } from 'console';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public apiUrl: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
  console.log(this.userSubject.value)
    return this.userSubject.value;
  }

  login(phone,password) {
    return this.http.post<User>(`${this.apiUrl}/Account/Login`, {phone,password })
      .pipe(map(user => {
       
        // if (user != null) {
        //   // store user details and jwt token in local storage to keep user logged in between page refreshes
        //   user.phone = MobileNo;
         
          //user.authentication = user.authentication;
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        
        //else {
        //  user.message = user.message;
        //}
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
   
    //console.warn(user);
    //return this.http.post(`${environment.apiUrl}/users/register`, user);
    return this.http.post(`${this.apiUrl}/Account/register`, user);
   
  }

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}/User`);
  }
  
  getById(id: string) {
    return this.http.get<User>(this.apiUrl+"/User/id?id="+id);
  }

  update(id, params) {
    return this.http.put(`${this.apiUrl}/User/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }
 
  delete(id: string) {
     return this.http.delete(this.apiUrl+"/User?id="+id);
    // return this.http.delete(`${this.apiUrl}/User/${id}`);
    //   .pipe(map(x => {
    //     // auto logout if the logged in user deleted their own record
    //     if (id == this.userValue.id) {
    //       this.logout();
    //     }
    //     return x;
    //   }));
  }

  appointmentsgetAll(data) {
    return this.http.get(`${this.apiUrl}/Appointment`,data);
  }
  searchByName(Search,columnname): Observable<any> {
    return this.http.get(`${this.apiUrl}/Appointment?Search=${Search}&columnname=${columnname}`);
   
  }
  appointmentsgetById(appointmentId: string) {
    return this.http.get<User>(this.apiUrl+"/Appointment/GetAppointmentById?id="+appointmentId);
  }
  GetServiceListgetById(appointmentId: string) {
    return this.http.get<User>(this.apiUrl+"/Appointment/GetServiceList?id="+appointmentId);
  }
  Addappointment(data){
    return this.http.post(`${this.apiUrl}/Appointment/AddAppointment`,data); 
  }
  UpdateAppointment(params) {
    return this.http.put(`${this.apiUrl}/Appointment/UpdateAppointment`, params);
      // .pipe(map(x => {
      //   // update stored user if the logged in user updated their own record
      //   if (id == this.userValue.id) {
      //     // update local storage
      //     const user = { ...this.userValue, ...params };
      //     localStorage.setItem('user', JSON.stringify(user));

      //     // publish updated user to subscribers
      //     this.userSubject.next(user);
      //   }
      //   return x;
      // }));
  }
  deleteAppointment(id: string) {
    return this.http.delete(this.apiUrl+"/Appointment/DeleteAppointment?id="+id);
  }
  ServicesgetAll() {
    return this.http.get(`${this.apiUrl}/Services`);
  }
  ServicesgetById(serviceId: string) {
    return this.http.get<User>(this.apiUrl+"/Services/GetServicesById?id="+serviceId);
  }
  DeleteServices(id: string) {
    return this.http.delete(this.apiUrl+"/Services/DeleteServices?id="+id);
  }
  UpdateServices(id, params) {
    return this.http.put(`${this.apiUrl}/Services/UpdateServices`, params);
  }
  AddServices(data){
    return this.http.post(`${this.apiUrl}/Services/AddServices`,data); 
  }
  changepassword(oldpassword, newpassword,email) {
    
    return this.http.post<User>(`${this.apiUrl}/Account/changepassword`,{oldpassword,newpassword,email})
      .pipe(map(user => {
        return user;
      }));
  }
  resetpassword(email) {
    //return this.http.get(`${environment.apiUrl}/Account/resetpassword/${email}`);
    return this.http.get<User>(`${this.apiUrl}/Account/resetpassword/${email}`)
      .pipe(map(user => {
        return user;
      }));
  }
  verifypassword(token, newPassword, email) {
    //token = encodeURIComponent(token);
    console.log(token);
    return this.http.post<User>(`${this.apiUrl}/Account/verifypassword`, { token, newPassword, email })
      .pipe(map(user => {
        console.warn(user);
        return user;
      }));
  }
}
