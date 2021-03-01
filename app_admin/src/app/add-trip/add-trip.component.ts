import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TripDataService} from '../services/trip-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id:[],
      code: ['',Validators.required],
      name: ['',Validators.required],
      length: ['',Validators.required],
      start: ['',Validators.required],
      resort: ['',Validators.required],
      perperson: ['',Validators.required],
      image: ['',Validators.required],
      description: ['',Validators.required],
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.addForm.valid){
      this.tripService.addTrips(this.addForm.value)
      .then( data => {
        console.log(data);
        this.router.navigate(['']);
      })
    }
  }

  //Get form short name to access form fields
  get f() {return this.addForm.controls}

}
