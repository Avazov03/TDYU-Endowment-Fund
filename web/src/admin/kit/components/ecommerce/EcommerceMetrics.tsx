'use client'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import type { AdminStats } from "@/admin/kit/hooks/useAdminDashboard";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";

export default function EcommerceMetrics({
  stats,
  live,
}: {
  stats?: AdminStats | null;
  live?: boolean;
}) {
  const { t, localeTag } = useI18n();
  const users = live ? stats?.users_count ?? 0 : 3782;
  const questions = live ? stats?.total_questions ?? 0 : 5359;
  const userTrend = live ? stats?.trends.users ?? 0 : 11.01;
  const questionTrend = live ? stats?.trends.questions ?? 0 : -9.05;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {live ? t("dash.users") : t("dash.customers")}
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {users.toLocaleString(localeTag)}
            </h4>
          </div>
          <Badge color={userTrend >= 0 ? "success" : "error"}>
            {userTrend >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {Math.abs(userTrend)}%
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {live ? t("dash.questions") : t("dash.orders")}
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {questions.toLocaleString(localeTag)}
            </h4>
          </div>
          <Badge color={questionTrend >= 0 ? "success" : "error"}>
            {questionTrend >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {Math.abs(questionTrend)}%
          </Badge>
        </div>
      </div>
    </div>
  );
}
