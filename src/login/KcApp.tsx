import { lazy, Suspense } from "react";
import Fallback, { type PageProps } from "keycloakify/login";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Template from "./Template";
import "../mainStyles.scss";
import LoginResetPassword from "./pages/LoginResetPassword/LoginResetPassword";
import LoginUpdatePassword from "./pages/LoginUpdatePassword/LoginUpdatePassword";
import LoginOtp from "./pages/LoginOtp/LoginOtp";
import LoginConfigTotp from "./pages/LoginConfigTotp/LoginConfigTotp";
const Login = lazy(() => import("./pages/Login/Login"));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation

// This is like adding classes to theme.properties
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
const classes = {
    // NOTE: The classes are defined in ./KcApp.css
    kcHtmlClass: "my-root-class",
    kcHeaderWrapperClass: "my-color my-font",
} satisfies PageProps["classes"];

export default function KcApp(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const i18n = useI18n({ kcContext });

    if (i18n === null) {
        //NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
        //We could display a loading progress but it's usually a matter of milliseconds.
        return null;
    }

    /*
     * Examples assuming i18n.currentLanguageTag === "en":
     * i18n.msg("access-denied") === <span>Access denied</span>
     * i18n.msg("foo") === <span>foo in English</span>
     */

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, Template, classes }}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                {...{ kcContext, i18n, Template, classes }}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-update-password.ftl":
                        return (
                            <LoginUpdatePassword
                                {...{ kcContext, i18n, Template, classes }}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-otp.ftl":
                        return (
                            <LoginOtp
                                {...{ kcContext, i18n, Template, classes }}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-config-totp.ftl":
                        return (
                            <LoginConfigTotp
                                {...{ kcContext, i18n, Template, classes }}
                                doUseDefaultCss={false}
                            />
                        );
                    default:
                        return (
                            <Fallback
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}
