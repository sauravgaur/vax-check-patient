// Angular
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'kt-widget1-tasks-overview',
  templateUrl: './widget1-tasks-overview.component.html',
  styles: [
    `
    
    
    `
  ]
})
export class Widget1TasksOverviewComponent {
  @Input() cssClasses = '';

  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions>;

  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions2: Partial<ChartOptions>;

  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions>;

  @ViewChild("chart4") chart4: ChartComponent;
  public chartOptions4: Partial<ChartOptions>;

  @ViewChild("chart5") chart5: ChartComponent;
  public chartOptions5: Partial<ChartOptions>;

  constructor() {
    this.chartOptions1 = {
      chart: {
        height: 130,
        type: "radialBar",
      },
      series: [67],
      // colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#333',
            startAngle: -90,
            endAngle: 90,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: "15px",
              show: true,
              offsetY: 1
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      // stroke: {
      //   lineCap: "butt"
      // },
      labels: ["Progress"]
    };

    this.chartOptions2 = {
      chart: {
        height: 130,
        type: "radialBar",
      },
      series: [80],
      // colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#333',
            startAngle: -90,
            endAngle: 90,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: "15px",
              show: true,
              offsetY: 1
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      // stroke: {
      //   lineCap: "butt"
      // },
      labels: ["Progress"]
    };

    this.chartOptions3 = {
      chart: {
        height: 130,
        type: "radialBar",
      },
      series: [27],
      // colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#333',
            startAngle: -90,
            endAngle: 90,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: "15px",
              show: true,
              offsetY: 1
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      // stroke: {
      //   lineCap: "butt"
      // },
      labels: ["Progress"]
    };

    this.chartOptions4 = {
      chart: {
        height: 130,
        type: "radialBar",
      },
      series: [37],
      // colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#333',
            startAngle: -90,
            endAngle: 90,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: "15px",
              show: true,
              offsetY: 1
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      // stroke: {
      //   lineCap: "butt"
      // },
      labels: ["Progress"]
    };

    this.chartOptions5 = {
      chart: {
        height: 130,
        type: "radialBar",
      },
      series: [87],
      // colors: ["#647"],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#333',
            startAngle: -90,
            endAngle: 90,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: "15px",
              show: true,
              offsetY: 1
            }
          }
        }
      },
      fill: {
        type: "",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100],
        }
      },
      // stroke: {
      //   lineCap: "butt"
      // },
      labels: ["Progress"]
    };

  }
}
