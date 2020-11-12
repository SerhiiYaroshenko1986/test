import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}
    userLoginRequest(userName, password): Observable<any> {
        const url = 'https://dtapi.if.ua/api/login'
        const body = {
            username: userName,
            password: password,
        }
        return this.http.post(url, body)
    }
}
