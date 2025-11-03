import { Injectable } from '@angular/core';
import { ChartSeries } from '../types/chart.types';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  generateSampleData(): ChartSeries[] {
    return [
      {
        name: 'Sales Performance',
        data: [
          { percentage: 35, value: 5000 },
          { percentage: 85, value: 10000 },
          { percentage: 45, value: 15000 },
          { percentage: 95, value: 20000 },
          { percentage: 30, value: 25000 },
          { percentage: 75, value: 30000 },
          { percentage: 55, value: 35000 },
          { percentage: 90, value: 40000 },
          { percentage: 40, value: 45000 },
          { percentage: 80, value: 50000 },
          { percentage: 60, value: 55000 },
          { percentage: 85, value: 60000 },
        ],
        color: '#3b82f6' // blue-500
      }
    ];
  }
}