import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingDTO, BuildingService } from '../../_services/building.service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateRoomDTO, RoomService, RoomType } from '../../_services/room.service';
import { RoomExtendService } from '../../_services/room-extend.service';
import { ListTypes, RoomTypeMap } from '../common/RoomType';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent {
  public form: FormGroup;
  public room = new CreateRoomDTO;
  public buildingMap: { [name: string]: number } | undefined
  public listBuildings: Array<string> = []
  public listTypes: Array<string> = ListTypes
  roomTypeMap: { [key: string]: RoomType } = RoomTypeMap
  
  public ngOnInit(): void {
    this.getListBuilding()
   
  }
  constructor( private roomService: RoomService, private router: Router,private roomServiceExtend: RoomExtendService,private notificationService: NotificationService) {
    this.form = new FormGroup({
      building: new FormControl(),
      name: new FormControl(this.room!.name, [Validators.required]),
      type: new FormControl(this.room!.type, [Validators.required]),
      capacity: new FormControl(this.room!.capacity, [Validators.required]),
      floor: new FormControl(this.room!.floor, [Validators.required]),
      number: new FormControl(this.room!.number, [Validators.required]),
    });
  }
  private getListBuilding(): void {
    this.roomServiceExtend.getListBuilding().subscribe({
      next: (data:{ [name: string]: number }) => {
      this.buildingMap = data;
      this.listBuildings = Object.keys(data);
      },
      error: (error: any) => {
        console.error("getListBuilding ERROR")
      },
      complete: () => {
      }
    });
  }

  public postForm(){
    this.room.capacity = this.form.value['capacity']
    this.room.floor = this.form.value['floor']
    this.room.name = this.form.value['name']
    this.room.number= this.form.value['number']
    this.room.type = this.roomTypeMap[this.form.value['type']]
    this.room.buildingId = this.buildingMap![this.form.value['building']]

    this.roomService.roomPOST(this.room).subscribe({
      next: () => {
      },
      error: (error: Error) => {
        this.notificationService.show({
          content: error.message,
          hideAfter: 6000,
          position: { horizontal: "right", vertical: "bottom" },
          animation: { type: "fade", duration: 400 },
          type: { style: "error" },
  
        });
      },
      complete: () => {
       this.NavigateToBack()
      }
    });
  }
  public NavigateToBack() {
    this.router.navigate(['rooms']);
  }
}
