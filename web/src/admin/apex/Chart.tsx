'use client'

import dynamic from 'next/dynamic'

/** Same dynamic Apex wrapper as TailAdmin kit — kept local so kit shell is unused. */
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default Chart
