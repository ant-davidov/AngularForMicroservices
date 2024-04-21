import { NgModule } from '@angular/core'
import {BuildingViewComponent} from "./building/building-view/building-view.component"
import {BuildingListComponent} from "./building/building-list/building-list.component"
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { BuildingCreateComponent } from './building/building-create/building-create.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomCreateComponent } from './room/room-create/room-create.component';
import { RoomUpdateComponent } from './room/room-update/room-update.component';

const routes: Routes = [
  { path: 'building/add', component: BuildingCreateComponent },
  { path: 'building/:id', component: BuildingViewComponent },
  { path: 'rooms', component: RoomListComponent},
  { path: 'rooms/add', component: RoomCreateComponent},
  { path: 'rooms/:id', component: RoomUpdateComponent},
  {path: '',component: BuildingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
