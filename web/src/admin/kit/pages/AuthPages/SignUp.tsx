'use client'
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";

export default function SignUp() {
  const { t } = useI18n();
  return (
    <>
      <PageMeta
        title={t("nav.signUp")}
        description={t("demo.signUpHint")}
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
