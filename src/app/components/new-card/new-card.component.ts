import { Component, Input, OnInit } from '@angular/core';
import { Planet } from '../../models/planet-model';
import { PlanetService } from '../../services/stars-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit {
  @Input()
  planet!: Planet;

  toggle= true;
  residentsData!: any[];

  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
  }

  onToggleCard(){
    this.toggle = !this.toggle;
    if(!this.toggle){
      this.fetchResidents()
    }
    
  }

  fetchResidents(): void {
    if (this.planet.residents.length > 0) {
      const requests = this.planetService.getResidents(this.planet.residents);
      forkJoin(requests).subscribe(data => {
        this.residentsData= data
      });
    } else {
      this.residentsData = []
    }
  }

}
