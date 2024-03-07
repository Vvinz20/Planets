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

  tooltipVisible: boolean = false;
  tooltipContent: any
  tooltipLeft: string = '';
  tooltipTop: string = '';

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

  showTooltip(event: MouseEvent, resident: any): void {
    this.tooltipContent = resident
    this.tooltipVisible = true;
    this.tooltipLeft = event.pageX + 'px';
    this.tooltipTop = event.pageY + 'px';
    
  }

  hideTooltip(): void {
    this.tooltipVisible = false;
  }

}
