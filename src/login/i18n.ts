import { createUseI18n } from "keycloakify/login";

export const { useI18n } = createUseI18n({
    // NOTE: Here you can override the default i18n messages
    // or define new ones that, for example, you would have
    // defined in the Keycloak admin UI for UserProfile
    // https://user-images.githubusercontent.com/6702424/182050652-522b6fe6-8ee5-49df-aca3-dba2d33f24a5.png
    en: {
        doForgotPassword: "Forgot Password ?",
        back: "Back",
        usernameOrEmail: "Username / Email",
        doLogIn: "Login",
        logInIndiv: "Log in with Individual Account",
        signInUsing: "You can log in using",
        createIndiv: "Create Individual Account",
        regisNow: "Register Now",
        loginUAE: "Log in with UAE Pass",
        loginOrg: "Log in with Organization Account",
        noAccount: "Don't have an account ?",
        loginTo: "Log in to",
        passwordAlert:
            "Password must have at least 8 characters that contain numeric, uppercase, lowercase and symbol",
        missingUsernameMessage: "Please specify username or email.",
        realmNotEnabledMessage: 'Your organization is no longer activated. Contact the system administrator for assistance',
    },
    ar: {
        back: "الرجوع",
        usernameOrEmail: "اسم المستخدم أو البريد الإلكتروني",
        doForgotPassword: "نسيت كلمة المرور ؟",
        doLogIn: "تسجيل الدخول",
        signInUsing: "يمكنك تسجيل الدخول باستخدام",
        logInIndiv: "تسجيل الدخول باستخدام الحساب الفردي",
        createIndiv: "إنشاء حساب فردي",
        regisNow: "سجل الان",
        loginUAE: "قم بتسجيل الدخول باستخدام بطاقة الهوية الإماراتية",
        loginOrg: "تسجيل الدخول باستخدام حساب المنظمة",
        noAccount: "ليس لديك حساب ؟",
        loginTo: "تسجيل الدخول إلى",
        passwordAlert:
            "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل تحتوي على أرقام وأحرف كبيرة وصغيرة ورمز",
			missingUsernameMessage: "يرجى تحديد اسم المستخدم أو البريد الإلكتروني.",
        realmNotEnabledMessage: "لم تعد مؤسستك مفعلة. اتصل بمسؤول النظام للحصول على المساعدة",

    },
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
