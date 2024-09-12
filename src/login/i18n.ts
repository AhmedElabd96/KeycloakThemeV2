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
        doLogIn: "Sign in with organization account",
        logInIndiv: "Sign In with Individual Account",
        signInUsing: "You can sign in using",
        createIndiv: "Create Individual Account",
        regisNow: "Register Now",
        loginUAE: "Sign In with UAE Pass",
        loginOrg: "Sign In with Organization Account",
        noAccount: "Don't have an account?",
        loginTo: "Sign in to",
        passwordAlert:
            "Password must have at least 8 characters that contain numeric, uppercase, lowercase and symbol",
        missingUsernameMessage: "Please specify username or email.",
        realmNotEnabledMessage: 'Your organization is no longer activated. Contact the system administrator for assistance',
        "password-placeholder" : "Enter password",
        "user-placeholder":"Enter Username or Email",
        "forgetUser-placeholder":"Enter Username",
        doLogInSubmit:"SIGN IN",
        doRegister: "Register Now",
        loginOtpOneTime:"Enter Your OTP Code",
        passwordConfirm : "Confirm Password",
    },
    ar: {
        back: "الرجوع",
        usernameOrEmail: "اسم المستخدم أو البريد الإلكتروني",
        doForgotPassword: "نسيت كلمة المرور ؟",
        doLogIn: "تسجيل الدخول للجهة",
        signInUsing: "يمكنك تسجيل الدخول باستخدام",
        logInIndiv: "تسجيل الدخول باستخدام الحساب الفردي",
        createIndiv: "إنشاء حساب فردي",
        regisNow: "سجل الان",
        loginUAE: "قم بتسجيل الدخول باستخدام بطاقة الهوية الإماراتية",
        loginOrg: "تسجيل الدخول باستخدام حساب المنظمة",
        noAccount: "ليس لديك حساب؟",
        loginTo: "تسجيل الدخول إلى",
        passwordAlert:
            "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل تحتوي على أرقام وأحرف كبيرة وصغيرة ورمز",
			missingUsernameMessage: "يرجى تحديد اسم المستخدم أو البريد الإلكتروني.",
        realmNotEnabledMessage: "لم تعد مؤسستك مفعلة. اتصل بمسؤول النظام للحصول على المساعدة",
        "password-placeholder":"أدخل الرقم السري",
        "user-placeholder":"أدخل اسم المستخدم أو البريد الإلكتروني",
        "forgetUser-placeholder":"أدخل اسم المستخدم",
        doLogInSubmit:"تسجيل الدخول",
        doRegister:"سجل الآن",
        loginOtpOneTime:"أدخل رمز OTP الخاص بك",
        passwordConfirm:"تأكيد الرقم السري",
        

    },
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
