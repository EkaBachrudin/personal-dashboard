import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { ChartSeries } from '../../types/chart.types';
import { DealDetail } from '../../types';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineChartComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  chartData: ChartSeries[] = [];
  chartWidth = 800; // Default width
  dealsData: DealDetail[] = [];
  selectedMonth: string = 'October';
  private resizeObserver: ResizeObserver | null = null;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartData = this.chartService.generateSampleData();
    this.dealsData = this.generateDealsData();
    this.updateChartWidth();
  }

  ngAfterViewInit(): void {
    this.setupResizeObserver();
    // Initial width calculation
    setTimeout(() => this.updateChartWidth(), 0);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      // Observe the window for resize events
      this.resizeObserver = new ResizeObserver(() => {
        this.updateChartWidth();
      });

      // Observe the document body or a specific container
      this.resizeObserver.observe(document.body);
    } else {
      // Fallback to window resize event
      window.addEventListener('resize', this.updateChartWidth.bind(this));
    }
  }

  private updateChartWidth(): void {
    // Get the width of the parent container minus padding
    const container = document.querySelector('.chart-container');
    if (container) {
      const containerWidth = container.clientWidth;
      // Account for padding (16px on each side) and some margin
      this.chartWidth = Math.max(containerWidth - 32, 300); // Minimum width of 300px
    } else {
      // Fallback: use window width minus container padding and margins
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1024) { // lg screens
        this.chartWidth = windowWidth - 400; // Account for sidebar and padding
      } else if (windowWidth >= 768) { // md screens
        this.chartWidth = windowWidth - 100;
      } else {
        this.chartWidth = windowWidth - 50;
      }
    }
  }

  private generateDealsData(): DealDetail[] {
    return [
      {
        id: '1',
        productName: 'Apple Watch',
        location: '6096 Marjolaine Landing',
        date: '12.09.2019',
        time: '12.53 PM',
        pieces: 423,
        amount: 34295,
        status: 'delivered'
      },
      {
        id: '2',
        productName: 'Apple Watch',
        location: '6096 Marjolaine Landing',
        date: '12.09.2019',
        time: '12.53 PM',
        pieces: 423,
        amount: 34295,
        status: 'pending'
      },
      {
        id: '3',
        productName: 'Apple Watch',
        location: '6096 Marjolaine Landing',
        date: '12.09.2019',
        time: '12.53 PM',
        pieces: 423,
        amount: 34295,
        status: 'rejected'
      }
    ];
  }

  getStatusColor(status: DealDetail['status']): string {
    switch (status) {
      case 'delivered':
        return '#00b69b';
      case 'pending':
        return '#fcbe2d';
      case 'rejected':
        return '#fd5454';
      default:
        return '#6b7280';
    }
  }

  getStatusText(status: DealDetail['status']): string {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}