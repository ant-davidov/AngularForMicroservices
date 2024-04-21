import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SortDescriptor } from '@progress/kendo-data-query';
import { cartIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { BuildingDTO, BuildingService } from '../../_services/building.service.service';
import { Router } from '@angular/router';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';


@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrl: './building-list.component.css',
  providers: []
})
export class BuildingListComponent {
  buildings: BuildingDTO[] | undefined
  public openedDeleteDioalog = false;

  constructor(private buildingService: BuildingService, private router: Router, private dialogService: DialogService) {

  }

  ngOnInit() {
    this.GetandSetAllBuildings()
  }

  public cover =
    "https://hedclub.com/data/article_bank/209/img/AZy9MjI7u6Ovc0nOO_wq.jpg";

  public GetandSetAllBuildings() {
    this.buildings = [];
    this.buildingService.all().subscribe({
      next: (data: BuildingDTO[]) => {
        this.buildings = data;
      }
    });

  }

  public deleteBuilding(id: number) {
    this.buildingService.buildingDELETE(id).subscribe({
      next: () => {
        const indexToRemove = this.buildings?.findIndex(building => building.id === id);
        if (indexToRemove !== -1) {
          this.buildings?.splice(indexToRemove!, 1);
        }
      },
        error: (error: any) => {

        },
          complete: () => {

          }
      });
  }
  public showDialogForDelete(id: number): void {
    this.dialogService.open({
      title: "Подтвердить ",
      content: "При удалении корпуса удалятся все аудитории этого корпуса. Продолжить ?",
      actions: [{ text: "Нет" }, { text: "Да", themeColor: "primary" }],
      width: 450,
      height: 200,
      minWidth: 250,
    }).result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
      } else {
        if (result.text === "Да")
          this.deleteBuilding(id);

      }
    });

  }


  public NavigateToView(id: number): void {
    this.router.navigate(['/building', id]);
  }
  public NavigateToAdd() {
    this.router.navigate(['building/add']);
  }
}
