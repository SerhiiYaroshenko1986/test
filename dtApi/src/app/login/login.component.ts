import { Component, OnInit } from '@angular/core'
import { RequestService } from './request.service'
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    hide = true
    loginForm: FormGroup
    private userName
    private password

    constructor(
        private requestService: RequestService,
        private router: Router
    ) {
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
        let formValue = this.loginForm.value
        this.userName = formValue.userName
        this.password = formValue.password
        console.log(typeof formValue.userName)
        this.loginForm.reset()
        this.requestService
            .getData(this.userName, this.password)
            .subscribe((data) => {
                // if (data.response === 'ok') {
                //     this.router.navigate(['/dashboard'])
                // }
                console.log(data)
            })
    }

    ngOnInit(): void {}
}
