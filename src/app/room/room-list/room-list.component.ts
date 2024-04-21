import { Component, OnInit } from '@angular/core';
import { FilterExpression } from '@progress/kendo-angular-filter';
import { PageChangeEvent } from "@progress/kendo-angular-pager";
import { RoomDTO, RoomService, RoomType, SearchRoomResponse } from '../../_services/room.service';
import { Size } from '@progress/kendo-drawing/dist/npm/geometry';
import { BuildingDTO } from '../../_services/building.service.service';
import { ListTypes, RoomTypeMap } from '../common/RoomType';
import { RoomExtendService } from '../../_services/room-extend.service';
import { Route, Router } from '@angular/router';

class Destination {
  destinationId: number | undefined;
  destinationName: string | undefined;
  destinationText: string | undefined;
}
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  public buildingMap: { [name: string]: number } | undefined
  public selcetFloor: number | null = null;
  public selectTypeRoom : string =""
  public selectBuilding: string =""
  public floor: number | undefined = undefined;
  public ListRoom: RoomDTO[] | undefined
  public pageSize = 10;
  public skip = 0;
  public pagedDestinations: Destination[] = [];
  buildongId: number | undefined;
  roomType: RoomType | undefined;
  public contentId = "content-1";
  public listTypes: Array<string> = ListTypes
  public listBuildings: Array<string> = []
  roomTypeMap: { [key: string]: RoomType } = RoomTypeMap

  constructor(private roomService: RoomService, private roomServiceExtend: RoomExtendService, private router: Router) {

  }

  public total: number = 0
  public ngOnInit(): void {
    this.getListBuilding()
    this.pageData();
  }
  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    this.pageData();
  }

  public onChange(value: string): void {
    if (value == "0")
      this.selcetFloor = null;

  }
  private pageData(): void {
    this.roomService.search(this.buildongId, this.floor, this.roomType, this.skip, this.pageSize).subscribe({
      next: (data: SearchRoomResponse) => {
        this.ListRoom = data.rooms;
        this.total = data.pageCount!
      },
      error: (error: any) => {
        console.error("Search ERROR",error)
      },
      complete: () => {
      }
    });
  }
  private getListBuilding(): void {
    this.roomServiceExtend.getListBuilding().subscribe({
      next: (data: { [name: string]: number }) => {
        this.buildingMap = data;
        this.listBuildings = Object.keys(data);
      },
      error: (error: any) => {
        console.error("getListBuilding ERROR", error)
      },
      complete: () => {
      }
    });
  }
  public NavigateToAdd() {
    this.router.navigate(['rooms/add']);
  }
  public NavigateToUpdate(id: number) {
    this.router.navigate(['rooms',id]);
  }
  
  public resetFilter(){
    this.selectTypeRoom = "";
    this.selcetFloor = null;
    this.selectBuilding = "";
    this.searchWithParametrs();
  }

  public searchWithParametrs() {
    if (this.selcetFloor === null)
      this.floor = undefined;
    else this.floor = this.selcetFloor;
    if(this.selectTypeRoom == "")
      this.roomType = undefined;
    else
      this.roomType = this.roomTypeMap[this.selectTypeRoom]
    if(this.selectBuilding == "")
      this.buildongId = undefined
    else
      this.buildongId = this.buildingMap![this.selectBuilding]
    this.skip = 0;
    this.pageData()
  }

  public deleteRoom(id: number){
    this.roomService.roomDELETE(id).subscribe({
      next: () => {
        const indexToRemove = this.ListRoom?.findIndex(listRoom => listRoom.id === id);
        if (indexToRemove !== -1) {
          this.ListRoom?.splice(indexToRemove!, 1);
        }
      },
      error: (error: any) => {
      },
      complete: () => {
      }
    });
  }


}





