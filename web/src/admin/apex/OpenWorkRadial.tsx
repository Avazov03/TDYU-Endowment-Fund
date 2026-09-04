'use client'

import type { ApexOptions } from 'apexcharts'
import Chart from './Chart'

/**
 * Radial progress — options from TailAdmin MonthlyTarget (structure preserved).
 */
export default function OpenWorkRadial({
  rate,
  label = 'Ochiq ishlar',
  hint = 'Navbatdagi yozuvlar ulushi',
  foot,
}: {
  rate: number
  label?: string
  hint?: string
  foot?: string
}) {
  const value = Math.max(0, Math.min(100, Number(rate) || 0))
  const options: ApexOptions = {
    colors: ['#465FFF'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'radialBar',
      height: 330,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: '80%' },
        track: {
          background: '#E4E7EC',
          strokeWidth: '100%',
          margin: 5,
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '36px',
            fontWeight: '600',
            offsetY: -40,
            color: '#1D2939',
            formatter: function (val) {
              return val + '%'
            },
          },
        },
      },
    },
    fill: {
      type: 'solid',
      colors: ['#465FFF'],
    },
    stroke: { lineCap: 'round' },
    labels: ['Progress'],
  }

  return (
    <div className="apex-wrap apex-radial">
      <div className="apex-title">{label}</div>
      <p className="apex-hint">{hint}</p>
      <Chart options={options} series={[value]} type="radialBar" height={330} />
      {foot ? <p className="apex-foot">{foot}</p> : null}
    </div>
  )
}
