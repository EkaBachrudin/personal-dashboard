import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ChartSeries } from '../../types/chart.types';
import { DealDetail } from '../../types';
import * as Plot from "@observablehq/plot";
import * as htl from "htl";
import { analytics1, analytics2, sales, salesA, salesB } from './dashboard.data';
import { PlotFigure } from '../../shared/lib/plot-figure/plot-figure';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../shared/lib/card';
import { Slide } from '../../types/slider.type';
import { ImageSlider } from '../../shared/lib/image-slider/image-slider';
import { PieChartComponent } from '../../shared/lib/pie-chart/pie-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PlotFigure, NgFor, CardComponent, ImageSlider, PieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild('salesChart') salesChartRef!: ElementRef;

  chartData: ChartSeries[] = [];
  chartWidth = 800; // Default width
  dealsData: DealDetail[] = [];
  selectedMonth: string = 'October';
  currentSlide: number = 0;

  salesOption= {
    marks: [
      () => htl.svg`<defs>
        <linearGradient id="salesGradient" gradientTransform="rotate(90)">
          <stop offset="20%" stop-color="#007AFF" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#007AFF" stop-opacity="0.1" />
        </linearGradient>
      </defs>`,
      Plot.areaY(sales, {x: "Amount", y: "Percent", fill: "url(#salesGradient)", curve: "linear"}),
      Plot.lineY(sales, {x: "Amount", y: "Percent", stroke: "#007AFF", strokeWidth: 1, curve: "linear"}),
      Plot.dot(sales.filter((_, i) => i % 1 === 0), {x: "Amount", y: "Percent", fill: "#007AFF", r: 3}),
      Plot.ruleY([0])
    ],
    style: { width: "100%", fontSize: '7px' },
    height: 200,
    y: {grid: true, label: "Percent"},
    x: {label: "Amount"}
  };

  dualLineChartOptions = {
    marks: [
      () => htl.svg`<defs>
        <linearGradient id="gradientA" gradientTransform="rotate(90)">
          <stop offset="20%" stop-color="#DBA5FF" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#DBA5FF" stop-opacity="0.4" />
        </linearGradient>
        <linearGradient id="gradientB" gradientTransform="rotate(90)">
          <stop offset="20%" stop-color="#ff8f6dff" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#ff8f6dff" stop-opacity="0.4" />
        </linearGradient>
      </defs>`,
      // Product A line with coral red color
      Plot.areaY(salesA, {x: "Amount", y: "Percent", fill: "url(#gradientA)", curve: "catmull-rom"}),
      // Plot.lineY(salesA, {x: "Amount", y: "Percent", stroke: "#c062ffff", strokeWidth: 3, curve: "catmull-rom"}),
      // Plot.dot(salesA, {x: "Amount", y: "Percent", fill: "#c062ffff", r: 5}),

      // Product B line with turquoise color
      Plot.areaY(salesB, {x: "Amount", y: "Percent", fill: "url(#gradientB)", curve: "catmull-rom"}),
      // Plot.lineY(salesB, {x: "Amount", y: "Percent", stroke: "#ff6e41ff", strokeWidth: 3, curve: "catmull-rom"}),
      // Plot.dot(salesB, {x: "Amount", y: "Percent", fill: "#ff6a3cff", r: 5}),

      Plot.ruleY([0])
    ],
    style: { width: "100%", fontSize: '7px' },
    height: 200,
    y: {grid: true, label: "Sales (Units)"},
    x: {label: "Month"}
  };

  analyticsOption = {
    marks: [
      // Product A line with coral red color
      // Plot.areaY(this.analytics1, {x: "Year", y: "Percent", fill: "url(#analytics1Gra)", curve: "catmull-rom"}),
      Plot.lineY(analytics1, {x: "Year", y: "Percent", stroke: "#00B69B", strokeWidth: 3, curve: "catmull-rom"}),
      Plot.dot(analytics1, {x: "Year", y: "Percent", fill: "#00B69B", r: 5}),

      // Product B line with turquoise color
      // Plot.areaY(analytics2, {x: "Year", y: "Percent", fill: "url(#analytics2Gra)", curve: "catmull-rom"}),
      Plot.lineY(analytics2, {x: "Year", y: "Percent", stroke: "#4880FF", strokeWidth: 3, curve: "catmull-rom"}),
      Plot.dot(analytics2, {x: "Year", y: "Percent", fill: "#4880FF", r: 5}),

      Plot.ruleY([0])
    ],
    style: { width: "100%", fontSize: '12px' },
    height: 300,
    y: {grid: true, label: "Sales (Units)"},
    x: {label: "Month"},
    title: "Revenue"
  };

  slides: Slide[] = [
    {url: '/assets/products/watch-image2.png', title: 'watch4'},
    {url: '/assets/products/watch-image.png', title: 'watch3'}
  ];

  parentComponentData = { 
    'New Customers': 120, 
    'Repeated': 85
  };

  constructor() {}

  ngOnInit(): void {
    this.dealsData = this.generateDealsData();
  }

  ngAfterViewInit() {
    console.log(this.salesChartRef.nativeElement.clientWidth)
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

  getCurrentSlide(index: number): void {
    this.currentSlide = index;
  }
}