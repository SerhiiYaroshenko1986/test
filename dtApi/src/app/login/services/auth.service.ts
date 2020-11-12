import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}
    loginRequest(userName: string, password: string): Observable<any> {
        const url = 'https://dtapi.if.ua/api/login'
        const body = {
            username: userName,
            password: password,
        }
        return this.http.post(url, body)
    }
    logOutrequest() {
        const url = 'https://dtapi.if.ua/api/login/logout'
        return this.http.get(url, { observe: 'response' }).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.router.navigate(['/login'])
                }
            },
            (err) => {
                console.error(err)
            }
        )
    }
    isLogged() {
        const url = 'https://dtapi.if.ua/api/login/isLogged'
        return this.http.get(url).pipe(
            map((result) => {
                return result
            })
        )
    }
}
