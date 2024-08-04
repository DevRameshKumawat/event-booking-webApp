import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IAPIResponse, User } from './model/model';
import { FormsModule } from '@angular/forms';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'event-booking-app';
  @ViewChild('model') model: ElementRef | undefined;
  isLoginForm: boolean = false;
  userObj: User = new User();
  eventService = inject(EventService);
  loginObj: any = {
    ContactNo: '',
    Password: '',
  };

  constructor() {
    const loggedData = localStorage.getItem('eventUser');
    if (loggedData != null) {
      this.userObj = JSON.parse(loggedData);
    }
  }

  openPopup() {
    if (this.model) {
      this.model.nativeElement.style.display = 'block';
    }
  }

  closePopup() {
    if (this.model) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  register() {
    this.eventService
      .userRegister(this.userObj)
      .subscribe((res: IAPIResponse) => {
        if (res.result) {
          alert('User is registered successfully');
          this.closePopup();
        } else {
          alert('Something went wrong in registration');
        }
      });
  }

  userLogin() {
    this.eventService
      .userLogin(this.loginObj)
      .subscribe((res: IAPIResponse) => {
        if (res.result) {
          alert('User is logged in successfully');
          console.log('user: ', res.data);
          localStorage.setItem('eventUser', JSON.stringify(res.data));
          this.userObj = res.data;
          this.closePopup();
        } else {
          alert('Something went wrong in login');
        }
      });
  }

  logout() {
    localStorage.removeItem('eventUser');
    this.userObj = new User();
  }
}
