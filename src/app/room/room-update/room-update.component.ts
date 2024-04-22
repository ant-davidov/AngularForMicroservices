
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingDTO, BuildingService } from '../../_services/building.service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateRoomDTO, RoomDTO, RoomService, RoomType, UpdateRoomDTO } from '../../_services/room.service';
import { RoomExtendService } from '../../_services/room-extend.service';
import { ListTypes, RoomTypeMap } from '../common/RoomType';
import { NotificationService } from '@progress/kendo-angular-notification';
@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.css'
})
export class RoomUpdateComponent {
  public Id: number | undefined;
  public form: FormGroup;
  public room = new RoomDTO;
  public listTypes: Array<string> = ListTypes
  roomTypeMap: { [key: string]: RoomType } = RoomTypeMap

  public ngOnInit(): void {
    this.Id = Number(this.route.snapshot.paramMap.get('id')!);
    this.getRoomById(this.Id)
   
  }

  constructor( private roomService: RoomService, private router: Router,private roomServiceExtend: RoomExtendService,private route: ActivatedRoute,private notificationService: NotificationService) {
    this.form = new FormGroup({
      building:  new FormControl(),
      name: new FormControl(this.room!.name, [Validators.required]),
      type: new FormControl(this.room!.type, [Validators.required]),
      capacity: new FormControl(this.room!.capacity, [Validators.required]),
      floor: new FormControl(this.room!.floor, [Validators.required]),
      number: new FormControl(this.room!.number, [Validators.required]),
    });
  }
 
  private getRoomById(id:number){
    this.roomService.roomGET(id).subscribe({
      next: (data:RoomDTO) => {
      this.room = data;
      this.updateDataInForm()
      },
      error: (error: any) => {
        console.error("getRoomById ERROR")
      },
      complete: () => {
      }
    });
  }
  updateDataInForm() {
    console.debug( Object.keys(this.roomTypeMap).find(key => this.roomTypeMap[key] === this.room.type),)
    this.form.patchValue({
      building:  this.room.building?.name,
      name: this.room.name,
      type:  Object.keys(this.roomTypeMap).find(key => this.roomTypeMap[key] === this.room.type),
      capacity: this.room.capacity,
      floor: this.room.floor,
      number: this.room.number
    });
  }
 
  public putForm() {

    let dto = new UpdateRoomDTO
     dto.capacity = this.form.value["capacity"];
     dto.floor = this.form.value["floor"];
     dto.name = this.form.value["name"];
     dto.number = this.form.value["number"]
     dto.type = this.roomTypeMap[this.form.value["type"]];
   
    console.debug("fsdfsdf")
   this.roomService.roomPUT(this.Id!, dto).subscribe({
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
