import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { RegisterScreenState } from 'src/app/states/RegisterScreenState';
import { ConfirmedValidator } from './validators';

@Component({
  selector: 'linksly-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  constructor(private fb: FormBuilder, private rs: RegisterService) {}

  state = new RegisterScreenState();

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

  onSubmit() {
    console.log(this.form.value);
  }

  ngAfterViewInit(): void {
    this.form.controls['uname'].valueChanges
      .pipe(
        filter((v) => v != ''),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: (v) => {
          this.rs.checkUserNameExists(v).then((isTaken) => {
            this.state.showUserNameTakenError = isTaken;
          });
        },
      });
  }
}
