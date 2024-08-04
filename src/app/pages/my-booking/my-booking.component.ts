import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { IAPIResponse, User } from '../../model/model';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css',
})
export class MyBookingComponent implements OnInit {
  eventSrv = inject(EventService);
  userObj: User = new User();
  bookingList: any[] = [];

  ngOnInit(): void {
    const loggedData = localStorage.getItem('eventUser');
    if (loggedData != null) {
      this.userObj = JSON.parse(loggedData);
      this.getBookingByUserId();
    }
  }

  getBookingByUserId() {
    this.eventSrv
      .getBookedEventsByUserId(this.userObj.userId)
      .subscribe((res: IAPIResponse) => {
        this.bookingList = res.data;
      });
  }
}
