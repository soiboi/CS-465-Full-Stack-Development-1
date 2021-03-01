import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TripDataService} from '../services/trip-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

export class EditTripComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode){
      alert("Something wrong, could'nt find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('EditTripComponent#onInit found tripCode' + tripCode);

    this.editForm = this.formBuilder.group({
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

    console.log('EditTripComponent#onInit calling TripDataService#getTrip()' + tripCode);

    this.tripService.getTrip(tripCode)
      .then(data=>{
        console.log(data)
        this.editForm.patchValue(data[0])
      })
  }

  onSubmit(){
    this.submitted = true;
    if(this.editForm.valid){
      this.tripService.addTrips(this.editForm.value)
      .then( data => {
        console.log(data);
        this.router.navigate(['']);
      })
    }
  }

  c


  //Get form short name to access form fields
  get f() {return this.editForm.controls}

}
