import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  colorScheme: {
    name: string;
    selectable: boolean;
    group: ScaleType;
    domain: string[];
  } = {
    name: '',
    selectable: false,
    group: ScaleType.Linear,
    domain: []
  };

  single: {
    name: string;
    value: number;
  }[] | undefined = [];

  showLabels = true;

  constructor(private olympicService: OlympicService) {}

  onSelect(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(olympics => {
      this.colorScheme.domain = olympics?.map(olympic => olympic.color) || [];
      this.single = olympics?.map(olympic => {
        return {
          name: olympic.country,
          value: olympic.participations.reduce((totalMedals, participation) => {
            return totalMedals + participation.medalsCount;
          }, 0),
        }})
    });
  }
}
