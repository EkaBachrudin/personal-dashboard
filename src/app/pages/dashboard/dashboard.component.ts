import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { ChartSeries } from '../../types/chart.types';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  chartData: ChartSeries[] = [];

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartData = this.chartService.generateSampleData();
  }
}