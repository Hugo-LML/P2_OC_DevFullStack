import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Single } from '../core/models/NgxChart';
import { ChartsService } from '../core/services/charts.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  colorScheme: Color = {
    name: '',
    selectable: false,
    group: ScaleType.Linear,
    domain: []
  };

  single: Single = [];

  defaultView: [number, number] = this.chartsService.getChartView('PIE_CHART_DEFAULT_VIEW');
  view: [number, number] = this.defaultView;

  olympicSubscription!: Subscription;

  constructor(private olympicService: OlympicService, private chartsService: ChartsService, private router: Router) {}

  // Navigation to the detail page of the country clicked
  onSelect(event: { name: string, value: number, label: string }) {
    const selectedOlympic = this.olympicService.getOlympicByName(event.name);
    if (selectedOlympic) this.router.navigateByUrl(`olympics/${selectedOlympic.id}`);
  }

  // Resize of the chart based on the window size
  @HostListener('window:resize')
  onResize(): void {
    this.view = window.innerWidth < 768 ? this.chartsService.getChartView('CHART_MOBILE_VIEW') : this.defaultView;
  }

  ngOnInit(): void {
    this.olympicSubscription = this.olympicService.getOlympics().subscribe(olympics => {
      this.colorScheme.domain = this.chartsService.getColors();
      this.single = olympics?.map(olympic => {
        return {
          name: olympic.country,
          value: olympic.participations.reduce((totalMedals, participation) => {
            return totalMedals + participation.medalsCount;
          }, 0),
        }})
    });

    this.view = window.innerWidth < 768 ? this.chartsService.getChartView('CHART_MOBILE_VIEW') : this.defaultView;
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }
}
