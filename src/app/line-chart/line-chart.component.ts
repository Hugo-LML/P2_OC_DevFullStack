import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Olympic } from '../core/models/Olympic';
import { ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() olympic: Olympic | undefined;

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

  multi: {
    name: string;
    series: {
      name: string;
      value: number;
    }[]
  }[] | undefined = [];

  defaultView: [number, number] = [700, 300];
  view: [number, number] = this.defaultView;

  formatTick(val: number): string {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }

  constructor() {}

  @HostListener('window:resize')
  onResize(): void {
    this.view = window.innerWidth < 768 ? [350, 300] : this.defaultView;
  }

  ngOnInit(): void {
    this.colorScheme = {name: this.olympic!.country, selectable: true, group: ScaleType.Linear, domain: [this.olympic!.color]};

    this.multi = [{ name: this.olympic!.country, series: this.olympic!.participations.map(participation => {
      return { name: participation.year.toString(), value: participation.medalsCount }
    }) }]

    this.view = window.innerWidth < 768 ? [350, 300] : this.defaultView;
  }

}
