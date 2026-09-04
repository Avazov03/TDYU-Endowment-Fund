'use client'

import type { ApexOptions } from 'apexcharts'
import Chart from './Chart'

/**
 * Apex area/line — options from TailAdmin StatisticsChart (structure preserved).
 */
export default function StatisticsAreaChart({
  labels,
  contacts,
  donations,
  title = '6 oylik tendensiya',
  hint = 'Murojaat va xayriya oylar bo‘yicha',
}: {
  labels: string[]
  contacts: number[]
  donations: number[]
  title?: string
  hint?: string
}) {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#465FFF', '#9CB9FF'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 310,
      type: 'line',
      toolbar: { show: false },
    },
    stroke: {
      curve: 'straight',
      width: [2, 2],
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: { format: 'dd MMM yyyy' },
    },
    xaxis: {
      type: 'category',
      categories: labels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: ['#5B7380'],
        },
      },
      title: {
        text: '',
        style: { fontSize: '0px' },
      },
    },
  }

  const series = [
    { name: 'Murojaat', data: contacts },
    { name: 'Xayriya', data: donations },
  ]

  return (
    <div className="apex-wrap">
      <div className="apex-title">{title}</div>
      <p className="apex-hint">{hint}</p>
      <Chart options={options} series={series} type="area" height={310} />
    </div>
  )
}
