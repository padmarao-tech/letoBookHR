import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}
  getAuth() {
    return localStorage.getItem("token");
  }
}
