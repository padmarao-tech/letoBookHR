import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  servPath = 'http://localhost:3001/api/';

  public apiurl;
  selected: any = {};
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  httpOptions = {
      headers: this.headers,
    };
  constructor(private http: HttpClient) { }
  private handleError(error: any) {
    return throwError(error);
  }


  // public getMessageById(id: number): Message {
  //   return this.messages[id];
  // }
  getEmployee(){
    return this.http.get<any>(this.servPath + "employee");
  }
  getDepartment(url){
    return this.http.get<any>(this.servPath + url);
  }
  getDepartmentId(id){
    return this.http.get<any>(this.servPath + 'departments' + id);
  }
  getEmployeeById(id){
    return this.http.get<any>(this.servPath + "employee/"+id);
  }
  

  // getEmployeeById(id){
  //   return this.http.get<any>(this.servPath + "employeeById/"+id);
  //    }
  // getDepartment(){
  //   return this.http.get<any>(this.servPath + "department");
  // }
  // getDepartmentId(id){
  //   return this.http.get<any>(this.servPath + "getdepartmentbyid/"+id);
  // }
  // getUpdateDepartment(department){
  //   return this.http.put<any>(this.servPath + '/getdepartment' , department);
  // }
  getDesignation(){
    return this.http.get<any>(this.servPath + "designation");
  }
  getDesignationId(id){
    return this.http.get<any>(this.servPath + "getdesignationbyid/"+id);
  }
  getLocation(){
    return this.http.get<any>(this.servPath + "location");
  }
  getSite(){
    return this.http.get<any>(this.servPath + "sitemaster");
  }
  getGrade(){
    return this.http.get<any>(this.servPath + "grade");
  }
  getBank(){
    return this.http.get<any>(this.servPath + "bankmaster");
  }
  getCompany(){
    return this.http.get<any>(this.servPath + "companymaster");
  }
  getPackageMaster(){
    return this.http.get<any>(this.servPath + "packagemaster");
  }
  getHolidays(){
    return this.http.get<any>(this.servPath + "holidaysetting");
  }
  getLeaveType(){
    return this.http.get<any>(this.servPath + "leavetype");
  }
  getLeaveRequest(){
    return this.http.get<any>(this.servPath + "leaverequest");
  }
  getLoanSetting(){
    return this.http.get<any>(this.servPath + "loansettings");
  }

  runQuery(sql) {
    let param = {}
    param['sql'] = sql
    return this.http.post<any>(`${this.servPath}runquery`, param);
  }

  // queryDML(user: any, table, pkey, querytype){
  //   this.apiurl = `${this.servPath}runquerydml`;
  //   return this.http.post<any>(this.apiurl, {obj:user,table:table,pkey:pkey, querytype:querytype}, this.httpOptions).pipe(
  //     map(() => user),
  //     catchError(this.handleError)
  //   );
  // }
}
