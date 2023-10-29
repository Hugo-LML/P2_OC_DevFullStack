import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-olympic',
  templateUrl: './olympic.component.html',
  styleUrls: ['./olympic.component.scss']
})
export class OlympicComponent implements OnInit, OnDestroy {
  olympicsSubscription!: Subscription;
  olympic?: Olympic;
  totalMedals?: number;
  totalAthletes?: number;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const olympicId = +this.route.snapshot.params['id'];
    this.olympicsSubscription = this.olympicService.getOlympics().subscribe(value => {
      this.olympic = value?.find(olympic => olympic.id === olympicId);
      this.totalMedals = this.olympic?.participations.reduce((totalMedals, participation) => {
        return totalMedals + participation.medalsCount;
      }, 0);
      this.totalAthletes = this.olympic?.participations.reduce((totalAthletes, participation) => {
        return totalAthletes + participation.athleteCount;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.olympicsSubscription.unsubscribe();
  }
}
