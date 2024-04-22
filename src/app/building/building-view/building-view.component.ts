import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingDTO, BuildingService } from '../../_services/building.service.service';
import { Router } from '@angular/router';
import { concatWith } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-building-view',
  templateUrl: './building-view.component.html',
  styleUrl: './building-view.component.css'
})
export class BuildingViewComponent {

  public form: FormGroup;
  public Id: number | undefined;
  public building = new BuildingDTO;



  ngOnInit(): void {
    this.Id = Number(this.route.snapshot.paramMap.get('id')!);
    this.GetandSetBuilding()
  }

  constructor(private route: ActivatedRoute, private buildingService: BuildingService, private router: Router,private notificationService: NotificationService) {
    this.form = new FormGroup({
      name: new FormControl(this.building!.name, [Validators.required]),
      address: new FormControl(this.building!.address, [Validators.required]),
      floors: new FormControl(this.building!.floors, [Validators.required]),
      other: new FormControl(this.building!.other),
    });
  }

  public GetandSetBuilding() {
    this.building = new BuildingDTO();
    this.buildingService.buildingGET(this.Id!).subscribe({
      next: (data: BuildingDTO) => {
        this.building = data;
        this.updateDataInForm()
      }
    });
  }

  public NavigateToBack() {
    this.router.navigate(['']);
  }

  updateDataInForm() {
    this.form.patchValue({
      name: this.building.name,
      address: this.building.address,
      floors: this.building.floors,
      other: this.building.other
    });
  }

  public  putForm() {
    Object.assign(this.building, this.form.value);
     this.buildingService.buildingPUT(this.Id!, this.building).subscribe({
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



