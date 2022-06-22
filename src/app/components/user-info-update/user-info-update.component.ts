import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { RegisterService } from 'src/app/services/register.service';
import { UserInfoUpdateServiceService as UserInfoUpdateService } from 'src/app/services/user-info-update-service.service';
import { UpdateUserInfoState } from 'src/app/states/screen';
import { environment } from 'src/environments/environment';
import { EventType } from '../reusables/event-notifier/event-notifier.component';

@Component({
  selector: 'linksly-user-info-update',
  templateUrl: './user-info-update.component.html',
  styleUrls: ['./user-info-update.component.css'],
})
export class UserInfoUpdateComponent implements AfterViewInit {
  constructor(
    fb: FormBuilder,
    private authStorageService: AuthStorageService,
    private rs: RegisterService,
    private updateService: UserInfoUpdateService
  ) {
    this.state = new UpdateUserInfoState(fb, this.authStorageService);
  }

  state: UpdateUserInfoState;

  ngAfterViewInit(): void {
    this.state.form.controls['username'].valueChanges
      .pipe(
        filter((v) => v != '' && v !== this.state.userinfo.username),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: (v) => {
          this.rs.checkUserNameExists(v).then((isTaken) => {
            this.state.showUserNameAlreadyTaken = isTaken;
          });
        },
      });
  }

  onSubmit() {
    if (!this.state.showUserNameAlreadyTaken) {
      const lastEventIndex = this.state.events.length;
      this.state.events.push({
        message: 'Updating account information',
        type: EventType.INPROGRESS,
      });
      setTimeout(
        () => {
          this.updateService
            .updateUserInfo({
              email: this.state.userinfo.email,
              username: this.state.form.get('username')?.value,
              first_name: this.state.form.get('fname')?.value,
              last_name: this.state.form.get('lname')?.value,
            })
            .then((v) => {
              this.authStorageService.saveUserInfo(v);
              this.state.events[lastEventIndex] = {
                message:
                  'Details Updated Successfully, reload page to see changes',
                type: EventType.SUCCESS,
              }; // RxJs BehaviourSubject can be used to eliminate page reload, but the user part wasn't a planned feature
              // hence the reason why am not putting much effort into making it ^^
              console.log(this.state.events);
            })
            .catch((_) => {
              this.state.events[lastEventIndex] = {
                message: 'Error Updating Account Info',
                type: EventType.ERROR,
              };
            })
            .finally(() =>
              setTimeout(() => {
                this.state.events[lastEventIndex] = {
                  message: null,
                  type: EventType.NONE,
                };
              }, 3000)
            );
        },
        environment.production ? 0 : 3000
      );
    }
  }
}
