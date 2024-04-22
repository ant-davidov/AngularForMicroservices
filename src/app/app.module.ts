import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildingListComponent } from './building/building-list/building-list.component';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IconsModule } from "@progress/kendo-angular-icons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { ICON_SETTINGS } from "@progress/kendo-angular-icons";
import { NavComponent } from './nav/nav.component';
import { BuildingViewComponent } from './building/building-view/building-view.component';
import { BuildingService } from './_services/building.service.service';
import { HttpClientModule } from '@angular/common/http';
import { BuildingCreateComponent } from './building/building-create/building-create.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { PagerModule } from "@progress/kendo-angular-pager";
import { RoomUpdateComponent } from './room/room-update/room-update.component';
import { RoomCreateComponent } from './room/room-create/room-create.component';
import { environment } from '../environments/environment';
import { NotificationModule } from "@progress/kendo-angular-notification";


@NgModule({
  declarations: [
    AppComponent,
    BuildingListComponent,
    NavComponent,
    BuildingViewComponent,
    BuildingCreateComponent,
    RoomListComponent,
    RoomUpdateComponent,
    RoomCreateComponent,      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    IconsModule,
    InputsModule,
    LabelModule,
    DialogsModule,
    DropDownsModule,
    HttpClientModule,
    PagerModule,
    NotificationModule
  ],
  providers: [{ provide: ICON_SETTINGS, useValue: { type: "font" } }, BuildingService,
    {provide: "API_BUILDING_URL", useValue: environment.API_BUILDING},
    {provide: "API_ROOM_URL", useValue: environment.API_ROOM}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
