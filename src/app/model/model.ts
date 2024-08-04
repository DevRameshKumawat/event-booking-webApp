export interface IAPIResponse {
  message: string;
  result: boolean;
  data: any;
}

export interface IEvent {
  description: any;
  endTime: any;
  organizerId: any;
  eventId: number;
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  organizerName: string;
  userId: number;
  price: number;
  location: string;
  imageUrl: string;
}

export interface IOrganizerEvent {
  eventId: number;
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  price: number;
  location: string;
  imageUrl: string;
}

export class User {
  UserId: number;
  Name: string;
  Email: string;
  Password: string;
  ContactNo: string;
  Role: string;
userId: any;

  constructor() {
    this.UserId = 0;
    this.Name = '';
    this.Email = '';
    this.Password = '';
    this.ContactNo = '';
    this.Role = 'Customer';
  }
}
