import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  private colors: { id: number, hexacode: string }[] = [
    { id: 1, hexacode: '#956065' },
    { id: 2, hexacode: '#B8CBE7' },
    { id: 3, hexacode: '#89A1DB' },
    { id: 4, hexacode: '#793D52' },
    { id: 5, hexacode: '#9780A1' },
  ];

  private pieChartDefaultView: [number, number] = [700, 400];
  private lineChartDefaultView: [number, number] = [700, 300];
  private chartMobileView: [number, number] = [350, 300];

  constructor() {}

  // Get list of colors
  getColors(): string[] {
    return [...this.colors.map(color => color.hexacode)];
  }

  // Get one specific color based on its id
  getColor(id: number): string | undefined {
    return this.colors.find(color => color.id === id)?.hexacode;
  }

  // Get the size of the given chart 
  getChartView(chartView: 'PIE_CHART_DEFAULT_VIEW' | 'LINE_CHART_DEFAULT_VIEW' | 'CHART_MOBILE_VIEW'): [number, number] {
    switch (chartView) {
      case 'PIE_CHART_DEFAULT_VIEW':
        return this.pieChartDefaultView;
      case 'LINE_CHART_DEFAULT_VIEW':
        return this.lineChartDefaultView;
      case 'CHART_MOBILE_VIEW':
        return this.chartMobileView;
    }
  }
}
