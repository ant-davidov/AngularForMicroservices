import { Injectable } from '@angular/core';
import { BuildingDTO, RoomService } from './room.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomExtendService {

  constructor(private roomService: RoomService) { }

  public getListBuilding(): Observable<{ [name: string]: number }> {
    return new Observable((observer) => {
      this.roomService.building().subscribe({
        next: (data: BuildingDTO[]) => {
          const buildingMap = data.reduce((acc: { [name: string]: number }, building) => {
            if (building.name !== undefined && building.id !== undefined) {
              const name: string = building.name;
              const id: number = building.id;
              acc[name] = id;
            }
            return acc;
          }, {});
          observer.next(buildingMap); // Отправляем полученный объект buildingMap через observer
          observer.complete(); // Завершаем Observable после отправки данных
        },
        error: (error: any) => {
          console.error("Search ERROR");
          observer.error(error); // Если произошла ошибка, отправляем ее через observer
          observer.complete(); // Завершаем Observable после отправки ошибки
        }
      });
    });
  }
}
