import { Component, OnInit } from '@angular/core'
import { AuthService } from './services/auth.service'
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { trigger, style, animate, transition } from '@angular/animations'
import { loginForm } from './interfaces/interfaces'

@Component({
    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1s ease-out', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('1s ease-in', style({ opacity: 0 })),
            ]),
        ]),
    ],
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    hide = true
    badRequest = false
    errorMessage: string
    loginForm: FormGroup
    private userName: string
    private password: string

    constructor(private request: AuthService, private router: Router) {
        this._createForm()
    }
    private _createForm() {
        this.loginForm = new FormGroup({
            userName: new FormControl(null),
            password: new FormControl(null),
        })
    }
    onSubmit(event) {
        event.preventDefault()
        const formValue: loginForm = this.loginForm.value
        this.userName = formValue.userName
        this.password = formValue.password
        this.loginForm.reset()
        this.request.loginRequest(this.userName, this.password).subscribe(
            (response) => {
                // if (response.username === 'admin') {
                //     this.router.navigate(['/admin/dashboard'])
                // }
                // if (response.username === 'student') {
                //     this.router.navigate(['/student'])
                // }
                console.log(response)
            },
            (err) => {
                this.handlerError(err)
            }
        )
    }
    handlerError(err) {
        this.badRequest = true
        this.errorMessage = err.error.response
        this.removeErrorMessage()
    }
    removeErrorMessage() {
        setTimeout(() => {
            this.badRequest = false
        }, 1500)
    }
    ngOnInit(): void {}
}
