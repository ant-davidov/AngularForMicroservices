import { Component } from '@angular/core';
import { BuildingDTO, BuildingService, CreateBuildingDTO } from '../../_services/building.service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationModule, NotificationService } from "@progress/kendo-angular-notification";


@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrl: './building-create.component.css',
})
export class BuildingCreateComponent {
  public form: FormGroup;
  public building = new CreateBuildingDTO;
  constructor(private route: ActivatedRoute, private buildingService: BuildingService, private router: Router, private notificationService: NotificationService) {
    this.form = new FormGroup({
      name: new FormControl(this.building!.name, [Validators.required]),
      address: new FormControl(this.building!.address, [Validators.required]),
      floors: new FormControl(this.building!.floors, [Validators.required]),
      other: new FormControl(this.building!.other),
    });
  }

  public NavigateToBack() {
    this.router.navigate(['']);
  }
  public postForm() {
    Object.assign(this.building, this.form.value);
    this.buildingService.buildingPOST(this.building).subscribe({
      next: (data: BuildingDTO) => {
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
}
