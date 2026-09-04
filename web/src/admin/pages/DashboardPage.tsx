'use client'

import EcommerceMetrics from '../kit/components/ecommerce/EcommerceMetrics'
import MonthlySalesChart from '../kit/components/ecommerce/MonthlySalesChart'
import StatisticsChart from '../kit/components/ecommerce/StatisticsChart'
import MonthlyTarget from '../kit/components/ecommerce/MonthlyTarget'
import RecentOrders from '../kit/components/ecommerce/RecentOrders'
import DemographicCard from '../kit/components/ecommerce/DemographicCard'
import PageMeta from '../kit/components/common/PageMeta'
import { useAdminDashboard } from '../kit/hooks/useAdminDashboard'
import { useI18n } from '../kit/i18n/I18nProvider'

/** 1:1 TailAdmin / Yurist Home dashboard layout */
export default function DashboardPage() {
  const { stats, geo } = useAdminDashboard()
  const { t } = useI18n()

  return (
    <>
      <PageMeta title={t('dash.metaTitle')} description={t('dash.metaDesc')} />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics live stats={stats} />

          <MonthlySalesChart live labels={stats?.month.labels} values={stats?.month.questions} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget live stats={stats} />
        </div>

        <div className="col-span-12">
          <StatisticsChart live labels={stats?.chart.labels} questions={stats?.chart.questions} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard geo={geo || { countries: [], total_ips: 0 }} />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders live recent={stats?.recent} />
        </div>
      </div>
    </>
  )
}
