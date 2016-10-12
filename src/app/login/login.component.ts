import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

class User {
  constructor(
    // public id: number,
    public email: string,
    public password: string,
    // public username?: string
  ) {  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = new User('', '')

  // constructor(fb: FormBuilder) {
    // this.loginForm = fb.group({
    //   email: ["", Validators.required],
    //   password: ["", Validators.required]
    // });
  // }
  doLogin(event) {
    // console.log(this.loginForm.value);
    // event.preventDefault();
  }

  ngOnInit() {
  }

}
