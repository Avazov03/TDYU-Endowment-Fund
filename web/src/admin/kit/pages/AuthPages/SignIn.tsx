'use client'
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";

export default function SignIn() {
  const { t } = useI18n();
  return (
    <>
      <PageMeta
        title={t("login.title")}
        description={t("login.subtitle")}
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
