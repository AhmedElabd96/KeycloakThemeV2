import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import userIcon from "../../assets/userIcon.svg";
import Input from "../../components/Input";
import styles from "./LoginResetPassword.module.scss";
export default function LoginResetPassword(
    props: PageProps<
        Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, auth } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")}
            infoNode={msg("emailInstruction")}
        >
            <form
                id="kc-reset-password-form"
                action={url.loginAction}
                method="post"
            >
                <div className={styles["input-group"]}>
                    <div>
                        <label htmlFor="username">
                            {!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                  ? msg("usernameOrEmail")
                                  : msg("email")}
                        </label>
                    </div>
                    <div>
                        <Input
                            icon={userIcon}
                            isUsername={true}
                            id="username"
                            name="username"
                            autoFocus={true}
                            defaultValue={
                                auth !== undefined && auth.showUsername
                                    ? auth.attemptedUsername
                                    : undefined
                            }
                        />
                    </div>
                </div>
                <div>
                    <div id="kc-form-buttons">
                        <input type="submit" value={msgStr("doSubmit")} />
                    </div>
                </div>
            </form>
        </Template>
    );
}
