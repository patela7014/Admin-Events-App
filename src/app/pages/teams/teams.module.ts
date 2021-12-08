import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams/teams.component';
import {UIModule} from "../../shared/ui/ui.module";
import {WidgetModule} from "../../shared/widget/widget.module";
import {NgbDropdownModule, NgbNavModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TeamsRoutingModule} from "./teams-routing.module";
import {TeamsService} from "../../shared/services/teams.service";
import {ErrorInterceptor} from "../../core/helpers/error.interceptor";
import {JwtInterceptor} from "../../core/helpers/jwt.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [
    TeamsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    WidgetModule,
  ],
  providers: [
    TeamsService
  ]
})
export class TeamsModule { }
