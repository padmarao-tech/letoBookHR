// import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { from, Observable } from "rxjs";
// import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return from(localStorage.getItem("token")).pipe(
      map((token) => {
        if (token) {
          return !!token;
        } else {
          this._router.navigate(["login"]);
          return false;
        }
      })
    );
  }
}
