import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponse, IEvent, IOrganizerEvent, User } from '../model/model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  ApiUrl: string = 'https://freeapi.miniprojectideas.com/api/EventBooking/';

  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http.get<IAPIResponse>(`${this.ApiUrl}GetAllEvents`);
  }

  getEventById(eventId: number) {
    return this.http
      .get<IEvent>(`${this.ApiUrl}GetEventById?id=${eventId}`)
      .pipe(
        map((item: any) => {
          return item.data;
        })
      );
  }

  getEventByOrganizerId(organizerId: number) {
    return this.http
      .get<IOrganizerEvent>(
        `${this.ApiUrl}GetEventsByOrganizer?organizerId=${organizerId}`
      )
      .pipe(
        map((item: any) => {
          return item.data;
        })
      );
  }

  userRegister(data: User) {
    return this.http.post<IAPIResponse>(`${this.ApiUrl}CreateUser`, data);
  }

  userLogin(data: any) {
    return this.http.post<IAPIResponse>(`${this.ApiUrl}Login`, data);
  }

  bookEvent(data: any) {
    return this.http.post<IAPIResponse>(`${this.ApiUrl}BookEvent`, data);
  }

  getBookedEventsByUserId(id: number) {
    return this.http
      .get<IAPIResponse>(`${this.ApiUrl}GetBookingByCustomer?customerId=${id}`)
      .pipe(
        map((item: any) => {
          return item.data;
        })
      );
  }
}
