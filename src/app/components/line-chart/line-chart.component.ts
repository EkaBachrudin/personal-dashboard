import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ChartDataPoint, ChartSeries } from '../../types/chart.types';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div>
  `,
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart', { static: true }) private chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: ChartSeries[] = [];
  @Input() width = 800;
  @Input() height = 400;

  private ctx: CanvasRenderingContext2D | null = null;
  private dataPoints: { x: number; y: number; series: ChartSeries; point: ChartDataPoint }[] = [];
  private tooltip: HTMLDivElement | null = null;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.data.length > 0) {
      const canvas = this.chartCanvas.nativeElement;
      this.ctx = canvas.getContext('2d');

      // Handle high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = this.width * dpr;
      canvas.height = this.height * dpr;
      canvas.style.width = `${this.width}px`;
      canvas.style.height = `${this.height}px`;

      // Scale the context to account for device pixel ratio
      if (this.ctx) {
        this.ctx.scale(dpr, dpr);
      }

      // Create tooltip element
      this.createTooltip();

      // Add mouse event listeners
      this.addEventListeners();

      // Draw the chart
      this.drawChart();
    }
  }

  ngOnDestroy(): void {
    // Clean up resources
    this.ctx = null;
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }

  private createTooltip(): void {
    this.tooltip = document.createElement('div');
    this.tooltip.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-family: sans-serif;
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(this.tooltip);
  }

  private addEventListeners(): void {
    const canvas = this.chartCanvas.nativeElement;

    canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    canvas.style.cursor = 'crosshair';
  }

  private handleMouseMove(event: MouseEvent): void {
    const canvas = this.chartCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();

    // Calculate actual mouse position accounting for canvas scaling
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    // Check if hovering over any data point
    let hoveredPoint = null;
    const hoverRadius = 10; // Slightly larger hover area for better UX

    for (const dataPoint of this.dataPoints) {
      const distance = Math.sqrt(
        Math.pow(x - dataPoint.x, 2) + Math.pow(y - dataPoint.y, 2)
      );

      if (distance <= hoverRadius) {
        hoveredPoint = dataPoint;
        break;
      }
    }

    if (hoveredPoint && this.tooltip) {
      // Show tooltip
      this.tooltip.innerHTML = `
        <div style="margin-bottom: 4px; font-weight: bold; color: ${hoveredPoint.series.color}">
          ${hoveredPoint.series.name}
        </div>
        <div style="font-size: 11px; opacity: 0.9">
          ${hoveredPoint.point.percentage}%
        </div>
        <div style="font-size: 13px; font-weight: bold;">
          $${hoveredPoint.point.value.toLocaleString()}
        </div>
      `;

      this.tooltip.style.left = `${event.pageX + 12}px`;
      this.tooltip.style.top = `${event.pageY - 40}px`;
      this.tooltip.style.opacity = '1';

      // Change cursor to pointer
      canvas.style.cursor = 'pointer';

      // Redraw chart with highlighted point
      this.drawChart(hoveredPoint);
    } else {
      // Hide tooltip
      if (this.tooltip) {
        this.tooltip.style.opacity = '0';
      }
      canvas.style.cursor = 'crosshair';
      this.drawChart();
    }
  }

  private handleMouseLeave(): void {
    // Hide tooltip when mouse leaves canvas
    if (this.tooltip) {
      this.tooltip.style.opacity = '0';
    }
    this.chartCanvas.nativeElement.style.cursor = 'crosshair';
    this.drawChart();
  }

  private drawChart(highlightedPoint?: { x: number; y: number; series: ChartSeries; point: ChartDataPoint } | null): void {
    if (!this.ctx) return;

    const ctx = this.ctx;
    const width = this.width;
    const height = this.height;
    const padding = 50;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Clear data points array
    this.dataPoints = [];

    // Fixed ranges as specified in the requirements
    const minValue = 5000; // Fixed minimum value (5k)
    const maxValue = 60000; // Fixed maximum value (60k)
    const minPercentage = 20; // Fixed minimum percentage (20%)
    const maxPercentage = 100; // Fixed maximum percentage (100%)

    const xScale = (value: number) => {
      return padding + ((value - minValue) / (maxValue - minValue)) * (width - 2 * padding);
    };

    const yScale = (percentage: number) => {
      return height - padding - ((percentage - minPercentage) / (maxPercentage - minPercentage)) * (height - 2 * padding);
    };

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * (height - 2 * padding)) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 4; i++) {
      const x = padding + (i * (width - 2 * padding)) / 4;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    ctx.setLineDash([]);

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';

    // X-axis labels (exact revenue values)
    const exactValues = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000];
    exactValues.forEach(value => {
      const x = xScale(value);
      const label = value >= 1000 ? `${value/1000}k` : value.toString();
      ctx.fillText(label, x, height - padding + 20);
    });

    // Y-axis labels (percentages)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const percentage = minPercentage + (i * (maxPercentage - minPercentage)) / 4;
      const y = height - padding - (i * (height - 2 * padding)) / 4;
      ctx.fillText(`${percentage}%`, padding - 10, y + 5);
    }

    // Draw data lines
    this.data.forEach(series => {
      ctx.strokeStyle = series.color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      series.data.forEach((point, index) => {
        const x = xScale(point.value);
        const y = yScale(point.percentage);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    });

    // Draw data points
    this.data.forEach(series => {
      ctx.fillStyle = series.color;
      series.data.forEach(point => {
        const x = xScale(point.value);
        const y = yScale(point.percentage);

        // Store data point for hover detection
        this.dataPoints.push({ x, y, series, point });

        // Check if this point is highlighted
        const isHighlighted = highlightedPoint &&
          highlightedPoint.series === series &&
          highlightedPoint.point === point;

        if (isHighlighted) {
          // Draw larger outer circle for highlighted point
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fillStyle = series.color;
          ctx.fill();

          // Draw white inner circle
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = 'white';
          ctx.fill();

          // Draw colored center
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fillStyle = series.color;
          ctx.fill();
        } else {
          // Draw normal point
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fillStyle = series.color;
          ctx.fill();
        }
      });
    });

    // Draw legend
    let legendY = 20;
    this.data.forEach(series => {
      ctx.fillStyle = series.color;
      ctx.fillRect(width - 150, legendY, 12, 12);

      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(series.name, width - 150 + 18, legendY + 9);

      legendY += 25;
    });

    // Draw title
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Percentage vs Revenue Analysis', width / 2, 20);
  }
}