export default interface Weather {
  date: Date;
  min: number;
  max: number;
  temp: number;
  feelsLike: number;
  condition: string;
  icon: string;
}
