export interface ChartDataPoint {
  percentage: number;
  value: number;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color: string;
}