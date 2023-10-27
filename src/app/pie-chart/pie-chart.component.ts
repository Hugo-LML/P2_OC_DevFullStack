import { Component, HostListener, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

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

  defaultView: [number, number] = [700, 400];
  view: [number, number] = this.defaultView;

  constructor(private olympicService: OlympicService, private router: Router) {}

  onSelect(event: { name: string, value: number, label: string }) {
    const selectedOlympic = this.olympicService.getOlympicByName(event.name);
    if (selectedOlympic) this.router.navigateByUrl(`olympics/${selectedOlympic.id}`);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.view = window.innerWidth < 768 ? [350, 300] : this.defaultView;
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

    this.view = window.innerWidth < 768 ? [350, 300] : this.defaultView;
  }
}
