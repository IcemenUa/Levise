import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss']
})
export class AdminHomePageComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.myForm = formBuilder.group({

      "userName": ["Tom", [Validators.required]]
    })

  }

  ngOnInit(): void {
  }


  log(): void {
    console.log(this.myForm);

  }


}
