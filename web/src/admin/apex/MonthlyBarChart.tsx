'use client'

import type { ApexOptions } from 'apexcharts'
import Chart from './Chart'

/**
 * Apex bar chart — ApexOptions taken from TailAdmin MonthlySalesChart (kit left untouched).
 * Series/labels come from endowment /api/admin/stats.
 */
export default function MonthlyBarChart({
  labels,
  series,
  title = '6 oylik harakat',
}: {
  labels: string[]
  series: { name: string; data: number[] }[]
  title?: string
}) {
  const options: ApexOptions = {
    colors: ['#465fff', '#9CB9FF', '#B54708', '#067647'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '39%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories: labels,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Outfit',
    },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `${val}` },
    },
  }

  return (
    <div className="apex-wrap">
      <div className="apex-title">{title}</div>
      <div className="apex-scroll">
        <Chart options={options} series={series} type="bar" height={180} />
      </div>
    </div>
  )
}
