import { HttpHandler, HttpInterceptor } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { DataServiceService } from "../../service/data-service.service";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AuthService } from "../../service/auth.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(req, next): any {
    const dataService = this.injector.get(AuthService);
    const token = dataService.getAuth();
    let tokenizedReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
    return next.handle(tokenizedReq);
  }
}
