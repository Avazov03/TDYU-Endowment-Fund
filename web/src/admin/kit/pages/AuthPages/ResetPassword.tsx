'use client'
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import { Link, useNavigate } from "@/admin/kit/next-nav";
import { useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { ChevronLeftIcon } from "../../icons";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";
import { useDemoWorkspace } from "@/admin/kit/context/DemoWorkspace";

export default function ResetPassword() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { notify } = useDemoWorkspace();
  const [email, setEmail] = useState("");

  return (
    <>
      <PageMeta title={t("demo.resetTitle")} description={t("demo.resetHint")} />
      <AuthLayout>
        <div className="flex flex-col flex-1">
          <div className="w-full max-w-md pt-10 mx-auto">
            <Link
              to="/signin"
              className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ChevronLeftIcon className="size-5" />
              {t("demo.backSignIn")}
            </Link>
          </div>
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
              {t("demo.resetTitle")}
            </h1>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              {t("demo.resetHint")}
            </p>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                notify("sent", t("demo.resetSent"));
                window.setTimeout(() => navigate("/signin"), 800);
              }}
            >
              <div>
                <Label>{t("common.email")}</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@gmail.com"
                />
              </div>
              <Button type="submit" className="w-full" size="sm">
                {t("demo.sendReset")}
              </Button>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
