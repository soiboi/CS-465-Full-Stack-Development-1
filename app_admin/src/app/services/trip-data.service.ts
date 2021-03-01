import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {User} from '../models/user'
import {BROWSER_STORAGE} from '../storage'
import {Authresponse} from '../models/authresponse'
import {Trip} from '../models/trip';

@Injectable()
export class TripDataService {

  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) private storage : Storage
    ) { }

  private apiBaseUrl = "http://localhost:3000/api/";
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips')
    return this.http
      .get(this.tripUrl)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  public addTrips(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrips')
    return this.http
      .post(this.tripUrl, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrip')
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip[]> {
    console.log('Inside TripDataService#updateTrip')
    return this.http
      .put(this.tripUrl + formData.code, formData)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

  public handleError(error: any): Promise<any> { 
    console.error('Something is wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user : User): Promise<Authresponse> {
    return this.makeAuthApiCall('login' , user);
  }

  public register(user : User): Promise<Authresponse> {
    return this.makeAuthApiCall('register' , user);
  }

  public makeAuthApiCall(urlPAth:String , user : User): Promise<Authresponse> {
    const url: string = '$(this.apiBaseUrl)/$(urlPAth)';
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response.json() as Authresponse)
      .catch(this.handleError)
  }


}
