import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { registerEmployee } from './registerEmployee';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  selectedEmployee!:Employee
  
  //selectedRole!:Employee
  selectedEmp!: Employee;
  url = 'http://localhost:8080/';
  update = 'http://localhost:8080';


  loginUrl = 'http://localhost:8080/login'
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';

  private httpOptions = {
    headers: new HttpHeaders()
      .set("content-Type", "application/json")
  };

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from storage
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  constructor(private http: HttpClient, private router: Router) { }


  //--- register employee
  createEmployee(emp: any) {
    return this.http.post<any>
      (this.url + 'employees', emp, this.httpOptions);
  }
  //getUsers(): Observable<registerEmployee[]> {
  // return this.http.get<registerEmployee[]>(this.url);
  //}

  //get roles values
  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.url+'roles');
  }
  // addd employee
  AddUsers(employee: any) {
    return this.http.post<any>
      (this.url + 'register', this.getAuthHeaders)
  }

  createLogin(emp: any) {
    return this.http.post<any>
      (this.url + 'login', emp, {headers:this.getAuthHeaders()});
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  };
  LogOut() {
    localStorage.removeItem("token");
    this.router.navigate(["/dashboard"])
  }
  logout() {
    window.sessionStorage.clear();
  }
  
    // update employee data
    updateEmp(emp: any, id: String) {
      return this.http.put<any>(
        this.update + '/register/:id',
        emp,
        {headers:this.getAuthHeaders()}
      );
    }

  // get all users details 

  // get admin all users route
  getAllUsers(): Observable<Employee[]> {
    let headers={
      'Authorization' : "Bearer " + localStorage.getItem('token')
    }
    return this.http.get<Employee[]>(this.url+'all-users',{headers:this.getAuthHeaders()});
  }

  // get manager routes 
  getManagerRoutesData(): Observable<Employee[]> {
    let headers={
      'Authorization' : "Bearer " + localStorage.getItem('token')
    }
    return this.http.get<Employee[]>(this.url+'manager',{headers:this.getAuthHeaders()});
  }

  // update users data role 
  updateUser(emp: any,id: String) {
    return this.http.patch<any>(`${this.update}/${id}`,
      emp,
      this.httpOptions
      );
  }
 getSingleUser(id:string){
  	return this.http.get<Employee>(`${this.url+'user'}/${id}`);
  }

  getEmployeeById(loggedInEmployeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.update}/${loggedInEmployeeId}`);
  }
  getProfile():Observable<any>{
    let headers={
      'Authorization' : "Bearer " + localStorage.getItem('token')
    }
    
    return this.http.get(`${this.url +'login/profile'}`, {headers:headers});
  }
  // get admin profile
  getAdminProfile():Observable<any>{
    let headers={
      'Authorization' : "Bearer " + localStorage.getItem('token')
    }
    
    return this.http.get(`${this.url +'login/admin'}`, {headers:headers});
  }

  // get manager profile 
  deleteUser(id:string):Observable<any>{
    return this.http.delete(`${this.update}/${id}`,this.httpOptions);
  }
}
