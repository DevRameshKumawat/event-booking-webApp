import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../service/event.service';
import { Observable } from 'rxjs';
import { IAPIResponse, IEvent, IOrganizerEvent, User } from '../../model/model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, FormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent {
  activatedRoute = inject(ActivatedRoute);

  eventService = inject(EventService);
  eventData$: Observable<IEvent> = new Observable<IEvent>();
  organizerEvent$: Observable<IEvent[]> = new Observable<IEvent[]>();
  @ViewChild('bookingModel') bookingModel: ElementRef | undefined;
  members: any = {
    Name: '',
    Age: 0,
    IdentityCard: '',
    CardNo: '',
    ContactNo: '',
  };

  bookingObj: any = {
    BookingId: 0,
    UserId: 0,
    EventId: 0,
    NoOfTickets: 0,
    EventBookingMembers: [],
  };

  userObj: User = new User();

  constructor() {
    const loggedData = localStorage.getItem('eventUser');
    if (loggedData != null) {
      this.userObj = JSON.parse(loggedData);
      this.bookingObj.UserId = this.userObj.userId;
    }

    this.activatedRoute.params.subscribe((res: any) => {
      this.bookingObj.EventId = res.id;
      this.eventData$ = this.eventService.getEventById(res.id);
      this.eventData$.subscribe((res: IEvent) => {
        this.organizerEvent$ = this.eventService.getEventByOrganizerId(
          res.organizerId
        );
      });
    });
  }

  openBookingModel() {
    if (this.bookingModel) {
      this.bookingModel.nativeElement.style.display = 'block';
    }
  }

  closeBookingModel() {
    if (this.bookingModel) {
      this.bookingModel.nativeElement.style.display = 'none';
    }
  }

  addMember() {
    const newObj = JSON.stringify(this.members);
    const obj = JSON.parse(newObj);
    this.bookingObj.EventBookingMembers.push(obj);
  }

  bookTicket() {
    this.bookingObj.NoOfTickets = this.bookingObj.EventBookingMembers.length;
    this.eventService
      .bookEvent(this.bookingObj)
      .subscribe((res: IAPIResponse) => {
        if (res.result) {
          alert('Ticket booked successfully');
          this.closeBookingModel();
        } else {
          alert('something went wrong at book event');
        }
      });
  }
}
