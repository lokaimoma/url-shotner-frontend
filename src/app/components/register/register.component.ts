import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from './validators';

@Component({
  selector: 'linksly-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      uname: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
      confPwd: ['', [Validators.required]],
    },
    { validators: ConfirmedValidator('pwd', 'confPwd') }
  );

  ngOnInit(): void {}

  onSubmit() {}
}
