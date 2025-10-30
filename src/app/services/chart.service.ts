import { Injectable } from '@angular/core';
import { ChartSeries } from '../types/chart.types';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  generateSampleData(): ChartSeries[] {
    // Generate data with percentages (20-100) and values (5k-60k)
    const percentages = [20, 30, 40, 50, 60, 70, 80, 90, 100];

    return [
      {
        name: 'Revenue',
        data: [
          { percentage: 20, value: 15000 },
          { percentage: 30, value: 22000 },
          { percentage: 40, value: 28000 },
          { percentage: 50, value: 35000 },
          { percentage: 60, value: 42000 },
          { percentage: 70, value: 48000 },
          { percentage: 80, value: 52000 },
          { percentage: 90, value: 57000 },
          { percentage: 100, value: 60000 },
        ],
        color: '#3b82f6' // blue-500
      },
      {
        name: 'Profit',
        data: [
          { percentage: 20, value: 8000 },
          { percentage: 30, value: 12000 },
          { percentage: 40, value: 15000 },
          { percentage: 50, value: 18000 },
          { percentage: 60, value: 22000 },
          { percentage: 70, value: 26000 },
          { percentage: 80, value: 30000 },
          { percentage: 90, value: 34000 },
          { percentage: 100, value: 38000 },
        ],
        color: '#10b981' // green-500
      },
      {
        name: 'Expenses',
        data: [
          { percentage: 20, value: 12000 },
          { percentage: 30, value: 18000 },
          { percentage: 40, value: 22000 },
          { percentage: 50, value: 26000 },
          { percentage: 60, value: 30000 },
          { percentage: 70, value: 34000 },
          { percentage: 80, value: 38000 },
          { percentage: 90, value: 42000 },
          { percentage: 100, value: 45000 },
        ],
        color: '#f97316' // orange-500
      }
    ];
  }
}