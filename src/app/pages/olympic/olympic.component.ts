import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-olympic',
  templateUrl: './olympic.component.html',
  styleUrls: ['./olympic.component.scss']
})
export class OlympicComponent implements OnInit {
  olympic: Olympic | undefined;
  totalMedals: number | undefined;
  totalAthletes: number | undefined;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const olympicId = +this.route.snapshot.params['id'];
    this.olympic = this.olympicService.getOlympicById(olympicId);
    
    this.totalMedals = this.olympic?.participations.reduce((totalMedals, participation) => {
      return totalMedals + participation.medalsCount;
    }, 0);
    this.totalAthletes = this.olympic?.participations.reduce((totalAthletes, participation) => {
      return totalAthletes + participation.athleteCount;
    }, 0);
  }

}
