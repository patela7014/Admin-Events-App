import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  fpcode = '';
  email = '';

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.fpcode = this.route.snapshot.queryParamMap.get("code");
    this.email = this.route.snapshot.queryParamMap.get("email") ?? '...@gmail.com';


    this.resetForm = this.formBuilder.group({
      email: new FormControl(this.email, [Validators.required]),
      code: new FormControl(this.fpcode, []),
      password: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    this.authenticationService.resetPassword(this.resetForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.success = "Password reset successful. Redirecting to login page.";
          setTimeout( () => {
            this.router.navigate(['/account/login']);

          }, 2000 );
        },
        error => {
          this.error = error ? error : '';
        });
  }
}
