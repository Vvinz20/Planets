import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../../services/stars-api.service';
import { Planet } from '../../models/planet-model';
import { Subject, forkJoin, takeUntil } from 'rxjs';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  planets: Planet[] = [];
  currentPage = 1
  totalPages = 6
  private readonly unsubscribe$ = new Subject<void>()
  constructor(private planetService: PlanetService) { }

  isLoading:boolean = true;

  ngOnInit(): void {
    this.loadPlanetDetails(this.currentPage)
  }

  

  loadPlanetDetails(pageNumber:number){
    this.currentPage=pageNumber
    this.planetService.getPlanets(pageNumber).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {

      this.planets = data.results;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}