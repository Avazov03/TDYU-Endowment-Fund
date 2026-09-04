'use client'
import { Link } from "@/admin/kit/next-nav";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import type { AdminRecentItem } from "@/admin/kit/hooks/useAdminDashboard";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";
import { countryLabel } from "@/admin/kit/i18n/translations";

interface Product {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
}

const tableData: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 13”",
    variants: "2 Variants",
    category: "Laptop",
    price: "$2399.00",
    status: "Delivered",
    image: "/admin-kit/images/product/product-01.jpg",
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    variants: "1 Variant",
    category: "Watch",
    price: "$879.00",
    status: "Pending",
    image: "/admin-kit/images/product/product-02.jpg",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    variants: "2 Variants",
    category: "SmartPhone",
    price: "$1869.00",
    status: "Delivered",
    image: "/admin-kit/images/product/product-03.jpg",
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    variants: "2 Variants",
    category: "Electronics",
    price: "$1699.00",
    status: "Canceled",
    image: "/admin-kit/images/product/product-04.jpg",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    variants: "1 Variant",
    category: "Accessories",
    price: "$240.00",
    status: "Delivered",
    image: "/admin-kit/images/product/product-05.jpg",
  },
];

export default function RecentOrders({
  recent,
  live,
}: {
  recent?: AdminRecentItem[];
  live?: boolean;
}) {
  const { t, locale } = useI18n();
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {live ? t("dash.recent") : t("dash.recentOrders")}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {live ? (
            <Link
              to="/admin/contacts"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              {t("common.seeAll")}
            </Link>
          ) : (
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              {t("common.seeAll")}
            </button>
          )}
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {live ? t("common.question") : t("dash.products")}
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {live ? t("questions.ipPlace") : t("common.category")}
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {live ? t("common.time") : t("dash.price")}
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {t("common.status")}
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {live
              ? (recent || []).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-3">
                      <Link
                        to={`/admin/contacts`}
                        className="font-medium text-gray-800 text-theme-sm dark:text-white/90 hover:text-brand-500"
                      >
                        {item.title}
                      </Link>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {item.value}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {item.user_ip || "—"}
                      <span className="block text-theme-xs">
                        {countryLabel(locale, item.country_code, item.country)}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {item.meta}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge size="sm" color={item.status === "ok" ? "success" : "error"}>
                        {item.status === "ok" ? t("common.ok") : t("common.error")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              : tableData.map((product) => (
                  <TableRow key={product.id} className="">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                          <img
                            src={product.image}
                            className="h-[50px] w-[50px]"
                            alt={product.name}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {product.name}
                          </p>
                          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {product.variants}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.price}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.category}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          product.status === "Delivered"
                            ? "success"
                            : product.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {live && !recent?.length ? (
          <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {t("dash.noQuestions")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
