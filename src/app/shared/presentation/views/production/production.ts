import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ProductionFacade } from '../../../application/production-facade';
import { ProductionOverview } from '../../../domain/model/production-overview';
import { ProductionBatch } from '../../../domain/model/production-batch';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-production',
  imports: [
    CommonModule,
    MatToolbarModule,
    TranslatePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './production.html',
  styleUrl: './production.css',
})
export class Production {
  protected readonly title = signal('PRODUCTION');
  protected readonly overview = signal<ProductionOverview | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly selectedShift = signal('mañana');
  protected readonly selectedChartRange = signal('week');

  protected readonly shiftOptions = [
    { value: 'mañana', label: 'Mañana' },
    { value: 'tarde', label: 'Tarde' },
    { value: 'noche', label: 'Noche' },
  ];

  protected readonly chartRangeOptions = [
    { value: 'week', label: 'Esta semana' },
    { value: '7-days', label: 'Últimos 7 días' },
  ];

  protected readonly productProduction = [
    { label: 'Pan francés', value: 850 },
    { label: 'Croissant', value: 620 },
    { label: 'Muffin', value: 480 },
    { label: 'Molde', value: 720 },
    { label: 'Dona', value: 310 },
    { label: 'Otros', value: 190 },
  ];

  protected readonly dailyProduction = [
    { label: 'Lun', value: 980 },
    { label: 'Mar', value: 880 },
    { label: 'Mié', value: 1100 },
    { label: 'Jue', value: 950 },
    { label: 'Vie', value: 1200 },
    { label: 'Sáb', value: 750 },
    { label: 'Hoy', value: 1240 },
  ];

  protected readonly summaryTiles = computed(() => {
    const dashboard = this.overview();

    if (!dashboard) {
      return [];
    }

    return [
      {
        icon: 'kitchen',
        label: 'production.ovens_in_operation',
        value: `${dashboard.runningLines} de ${dashboard.totalLines}`,
        accent: 'success',
      },
      {
        icon: 'donut_large',
        label: 'production.average_efficiency',
        value: `${dashboard.averageEfficiency}%`,
        accent: 'success',
      },
      {
        icon: 'notifications_active',
        label: 'production.active_alerts',
        value: `${dashboard.activeAlerts}`,
        accent: 'warning',
      },
    ];
  });

  protected readonly selectedShiftLabel = computed(() => {
    return this.shiftOptions.find((option) => option.value === this.selectedShift())?.label ?? '';
  });

  protected readonly selectedChartRangeLabel = computed(() => {
    return this.chartRangeOptions.find((option) => option.value === this.selectedChartRange())?.label ?? '';
  });

  private readonly facade = new ProductionFacade();

  constructor() {
    void this.loadOverview();
  }

  async loadOverview(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await this.facade.getOverview();
      this.overview.set(data);
    } catch (exception) {
      this.error.set(exception instanceof Error ? exception.message : 'No se pudo cargar la producción.');
      this.overview.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  protected formatDateTime(value: string): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }

  protected formatTime(value?: string): string {
    if (!value) {
      return 'Pendiente';
    }

    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }

  protected formatRemainingTime(batch: ProductionBatch): string {
    if (batch.status === 'stopped') {
      return 'Detenido';
    }

    const remainingMinutes = Math.max(10, Math.round(batch.quantity / 6) + (batch.status === 'warning' ? 18 : 10));
    return `${this.formatDuration(remainingMinutes)} restante`;
  }

  protected formatDuration(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (totalMinutes % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  protected getBatchStatusLabel(batch: ProductionBatch): string {
    switch (batch.status) {
      case 'running':
        return 'production.running';
      case 'warning':
        return 'production.warning';
      case 'stopped':
        return 'production.stopped';
      default:
        return 'production.pending';
    }
  }

  protected getBatchStatusTone(batch: ProductionBatch): 'success' | 'warning' | 'danger' | 'neutral' {
    if (batch.status === 'warning') {
      return 'warning';
    }

    if (batch.status === 'stopped') {
      return 'neutral';
    }

    return 'success';
  }

  protected isTemperatureAlert(batch: ProductionBatch): boolean {
    return batch.temperatureSetpoint !== undefined && batch.temperature > batch.temperatureSetpoint;
  }

  protected isHumidityAlert(batch: ProductionBatch): boolean {
    return batch.humiditySetpoint !== undefined && batch.humidity !== undefined && batch.humidity > batch.humiditySetpoint;
  }

  protected isElectricAlert(batch: ProductionBatch): boolean {
    return batch.currentElectricFlow !== undefined && batch.currentElectricFlow > 12.0;
  }

  protected getMetricTone(value: boolean, status: ProductionBatch['status']): 'success' | 'warning' {
    return value || status === 'warning' ? 'warning' : 'success';
  }

  protected getStatusIcon(batch: ProductionBatch): string {
    switch (batch.status) {
      case 'running':
        return 'check_circle';
      case 'warning':
        return 'warning_amber';
      case 'stopped':
        return 'pause_circle';
      default:
        return 'schedule';
    }
  }

  protected onShiftChange(value: string): void {
    this.selectedShift.set(value);
  }

  protected onChartRangeChange(value: string): void {
    this.selectedChartRange.set(value);
  }

  protected trackById(_: number, item: ProductionBatch): string {
    return item.id;
  }

  protected trackByLabel(_: number, item: { label: string }): string {
    return item.label;
  }

  protected barHeight(value: number, base = 900): number {
    return Math.max(18, Math.round((value / base) * 180));
  }

  protected pointTop(value: number, base = 1400): number {
    return Math.max(10, 190 - Math.round((value / base) * 160));
  }

  protected pointLeft(index: number, total: number): string {
    if (total <= 1) {
      return '0%';
    }

    return `${(index / (total - 1)) * 100}%`;
  }

  protected buildLinePoints(series: Array<{ value: number }>, width = 340, height = 210): string {
    if (series.length === 0) {
      return '';
    }

    const values = series.map((entry) => entry.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const innerWidth = width - 48;
    const innerHeight = height - 48;

    return series
      .map((entry, index) => {
        const x = 24 + (series.length === 1 ? innerWidth / 2 : (index / (series.length - 1)) * innerWidth);
        const y = this.chartValueToY(entry.value, minValue, maxValue, innerHeight, 24);
        return `${x},${y}`;
      })
      .join(' ');
  }

  protected chartPointX(index: number, total: number, width = 340): number {
    const innerWidth = width - 48;
    return 24 + (total === 1 ? innerWidth / 2 : (index / (total - 1)) * innerWidth);
  }

  protected chartPointY(value: number, series: Array<{ value: number }>, height = 210): number {
    const values = series.map((entry) => entry.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    return this.chartValueToY(value, minValue, maxValue, height - 48, 24);
  }

  private chartValueToY(value: number, minValue: number, maxValue: number, innerHeight: number, offset = 24): number {
    const normalized = maxValue === minValue ? 0.5 : (value - minValue) / (maxValue - minValue);
    return offset + (1 - normalized) * innerHeight;
  }

  protected batchEfficiency(batch: ProductionBatch): number {
    if (batch.status === 'stopped') {
      return 0;
    }

    const temperatureScore = batch.temperatureSetpoint ? Math.max(0, 100 - Math.abs(batch.temperature - batch.temperatureSetpoint) * 1.8) : 100;
    const humidityScore = batch.humiditySetpoint && batch.humidity !== undefined ? Math.max(0, 100 - Math.abs(batch.humidity - batch.humiditySetpoint) * 2) : 100;
    return Math.round((temperatureScore + humidityScore) / 2);
  }
}
