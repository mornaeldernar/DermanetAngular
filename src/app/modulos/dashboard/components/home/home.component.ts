import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { AppointmentApiService } from 'src/app/services/api/appointment.api.service';
import { DashboardApiService, DashboardStats, DailyStats } from 'src/app/services/api/dashboard.api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stats: DashboardStats = {
    totalPatients: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  };

  dailyStats: DailyStats = {
    statusCounts: {},
    totalToday: 0
  };

  upcomingAppointments: AppointmentModel[] = [];

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective> | undefined;

  // Monthly Chart Configuration
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.4, // Smooth curves
        fill: 'origin'
      }
    },
    scales: {
      x: {},
      y: {
        min: 0,
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        data: [],
        label: `Año ${new Date().getFullYear()}`,
        borderColor: '#36A2EB', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Light Blue
        fill: 'origin'
      },
      {
        data: [],
        label: `Año ${new Date().getFullYear() - 1}`,
        borderColor: '#FFCE56', // Yellow
        backgroundColor: 'rgba(255, 206, 86, 0.5)', // Light Yellow
        fill: 'origin'
      }
    ]
  };

  // Daily Chart Configuration
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  constructor(private dashboardApi: DashboardApiService, private appointmentApi: AppointmentApiService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }
  loadAppointments(): void {
    let fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
    this.appointmentApi.listAppointments({ size: 5, page: 0, startDate: fecha }).subscribe({
      next: (response) => {
        this.upcomingAppointments = response.content;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      }
    });
  }
  loadDashboardData() {
    // Load Stats
    this.dashboardApi.getStats().subscribe(data => {
      this.stats = data;
    });

    // Load Daily Stats
    this.dashboardApi.getDailyStats().subscribe(data => {
      this.dailyStats = data;

      // Map status counts to chart data
      const labels = Object.keys(data.statusCounts);
      const values = Object.values(data.statusCounts);

      this.pieChartData.labels = labels;
      this.pieChartData.datasets[0].data = values;

      // Update the second chart (Daily)
      this.charts?.toArray()[1]?.update();
    });

    // Load Monthly Stats
    this.dashboardApi.getMonthlyStats().subscribe(data => {
      let fecha = new Date();
      fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
      const currentYear = fecha.getFullYear();
      const prevYear = currentYear - 1;

      // Initialize arrays with 0 for all 12 months
      const currentYearData = new Array(12).fill(0);
      const prevYearData = new Array(12).fill(0);

      data.forEach(d => {
        // Month is 1-12, array index is 0-11
        const monthIndex = d.month - 1;

        if (d.year === currentYear) {
          currentYearData[monthIndex] = d.count;
        } else if (d.year === prevYear) {
          prevYearData[monthIndex] = d.count;
        }
      });

      this.lineChartData.datasets[0].data = currentYearData;
      this.lineChartData.datasets[1].data = prevYearData;

      // Update the first chart (Monthly)
      this.charts?.toArray()[0]?.update();
    });

    this.loadAppointments();
  }
}
