import { Injectable } from '@angular/core';
import { ChartSeries } from '../types/chart.types';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  generateSampleData(): ChartSeries[] {
    // Revenue values based on the screenshot pattern (5k-60k range)
    const revenueValues = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000];

    return [
      {
        name: 'Revenue',
        data: [
          { percentage: 25, value: 5000 },
          { percentage: 30, value: 10000 },
          { percentage: 35, value: 15000 },
          { percentage: 40, value: 20000 },
          { percentage: 45, value: 25000 },
          { percentage: 50, value: 30000 },
          { percentage: 55, value: 35000 },
          { percentage: 60, value: 40000 },
          { percentage: 65, value: 45000 },
          { percentage: 70, value: 50000 },
          { percentage: 75, value: 55000 },
          { percentage: 80, value: 60000 },
        ],
        color: '#3b82f6' // blue-500
      },
      {
        name: 'Target',
        data: [
          { percentage: 20, value: 5000 },
          { percentage: 28, value: 10000 },
          { percentage: 36, value: 15000 },
          { percentage: 44, value: 20000 },
          { percentage: 52, value: 25000 },
          { percentage: 60, value: 30000 },
          { percentage: 68, value: 35000 },
          { percentage: 76, value: 40000 },
          { percentage: 84, value: 45000 },
          { percentage: 92, value: 50000 },
          { percentage: 96, value: 55000 },
          { percentage: 100, value: 60000 },
        ],
        color: '#10b981' // green-500
      },
      {
        name: 'Previous',
        data: [
          { percentage: 22, value: 5000 },
          { percentage: 32, value: 10000 },
          { percentage: 38, value: 15000 },
          { percentage: 48, value: 20000 },
          { percentage: 54, value: 25000 },
          { percentage: 62, value: 30000 },
          { percentage: 70, value: 35000 },
          { percentage: 78, value: 40000 },
          { percentage: 86, value: 45000 },
          { percentage: 94, value: 50000 },
          { percentage: 97, value: 55000 },
          { percentage: 100, value: 60000 },
        ],
        color: '#f59e0b' // amber-500
      }
    ];
  }
}