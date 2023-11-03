import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Olympic } from '../core/models/Olympic';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Multi } from '../core/models/NgxChart';
import { ChartsService } from '../core/services/charts.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() olympic?: Olympic;

  colorScheme: Color = {
    name: '',
    selectable: false,
    group: ScaleType.Linear,
    domain: [],
  };

  multi: Multi = [];

  defaultView: [number, number] = this.chartsService.getChartView('LINE_CHART_DEFAULT_VIEW');
  view: [number, number] = this.defaultView;
  
  constructor(private chartsService: ChartsService) {}
  
  // Format tick to have integral number
  formatTick(val: number): string {
    return val % 1 === 0 ? val.toLocaleString() : '';
  }

  // Resize of the chart based on the window size
  @HostListener('window:resize')
  onResize(): void {
    this.view = window.innerWidth < 768 ? this.chartsService.getChartView('CHART_MOBILE_VIEW') : this.defaultView;
  }

  ngOnInit(): void {
    this.colorScheme = { name: this.olympic!.country, selectable: true, group: ScaleType.Linear, domain: [this.chartsService.getColor(this.olympic!.id) ?? ''] };

    this.multi = [{ name: this.olympic!.country, series: this.olympic!.participations.map(participation => {
      return { name: participation.year.toString(), value: participation.medalsCount }
    }) }]

    this.view = window.innerWidth < 768 ? this.chartsService.getChartView('CHART_MOBILE_VIEW') : this.defaultView;
  }

}
