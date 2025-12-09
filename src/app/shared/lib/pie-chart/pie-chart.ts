import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.scss',
})
export class PieChartComponent implements AfterViewInit {

  // Input property to receive data from a parent component
  @Input() data: { [key: string]: number } = { a: 9, b: 20, c: 30, d: 8, e: 12 };

  // Use ViewChild to get a reference to the chart container div
  @ViewChild('my_dataviz', { static: true }) private chartContainer!: ElementRef;

  private width = 300;
  private height = 300;

  constructor() { }

  ngAfterViewInit(): void {
    this.createPieChart();
  }

  private createPieChart(): void {
    // Clear any existing SVG
    d3.select(this.chartContainer.nativeElement).select("svg").remove();

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(this.width, this.height) / 2 - 10;

    // Append the svg object to the div
    const svg = d3.select(this.chartContainer.nativeElement)
      .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
      .append("g")
        .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`);

    // Set the color scale
    const color = d3.scaleOrdinal<string>()
      .domain(Object.keys(this.data))
      .range(['#C0D2F0', '#4880FF']);

    // Convert object to array format for D3
    const data_array = Object.entries(this.data).map(([key, value]) => ({ key, value }));

  // Compute the position of each group on the pie:
    const pie = d3.pie<{key: string, value: number}>()
      .value(d => d.value); // Use arrow function

    const data_ready = pie(data_array);

    // Shape helper to build arcs:
    const arcGenerator = d3.arc<d3.PieArcDatum<{key: string, value: number}>>()
      .innerRadius(0)
      .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', d => color(d.data.key)) // Use arrow function
        .attr("stroke", "#ffffff")
        .style("stroke-width", "3px")
        .style("opacity", 0.9)
        .style("filter", "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))")
        .style("transition", "all 0.3s ease");

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
        .text(d => d.data.key) // Use arrow function - cleaner text
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`) // Use arrow function
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
        .style("fill", "#1a202c")
        .style("pointer-events", "none");
  }
}
