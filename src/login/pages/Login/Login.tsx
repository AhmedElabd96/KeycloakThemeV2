import { useMemo, useState, type FormEventHandler } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import styles from "./Login.module.scss";
import { Checkbox } from "@mui/material";
import checkBoxIcon from "../../assets/checkbox.svg";
import arrow from "./Vector.svg";
import { ReactSVG } from "react-svg";
import Socials from "../../components/Socials";
import Input from "../../components/Input";

export default function Login(
    props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const [isChecked, setIsChecked] = useState(false);

    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        auth,
        client,
    } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(
        (e) => {
            e.preventDefault();

            setIsLoginButtonDisabled(true);

            const formElement = e.target as HTMLFormElement;

            //NOTE: Even if we login with email Keycloak expect username and password in
            //the POST request.
            formElement
                .querySelector("input[name='email']")
                ?.setAttribute("name", "username");

            formElement.submit();
        }
    );

    const commonSocials = useMemo(
        () => social?.providers?.filter((p) => p.displayName !== "UAE Pass"),
        [social?.providers]
    );

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={true}
            //@ts-ignore
            social={social}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            infoNode={
                <div id="kc-registration" className={styles["register"]}>
                    <span>{msg("noAccount")}</span>
                    {/* @ts-ignore */}
                    <a tabIndex={6} href={`${client?.baseUrl}/register`}>
                        {msg("doRegister")}
                    </a>
                </div>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={onSubmit}
                            action={url.loginAction}
                            method="post"
                        >
                            {realm?.name === "publicfans" && (
                                <Socials
                                    msg={msg}
                                    socialProviders={commonSocials}
                                />
                            )}
                            <div className={styles["input-group"]}>
                                {!usernameHidden &&
                                    (() => {
                                        const label =
                                            !realm.loginWithEmailAllowed
                                                ? "username"
                                                : realm.registrationEmailAsUsername
                                                    ? "email"
                                                    : "usernameOrEmail";

                                        const autoCompleteHelper: typeof label =
                                            label === "usernameOrEmail"
                                                ? "username"
                                                : label;

                                        return (
                                            <>
                                                <label
                                                    htmlFor={autoCompleteHelper}
                                                >
                                                    {msg(label)}
                                                </label>

                                                <Input
                                                    tabIndex={1}
                                                    id={autoCompleteHelper}
                                                    name={autoCompleteHelper}
                                                    defaultValue={
                                                        login.username ?? ""
                                                    }
                                                    isUsername={true}
                                                    autoFocus={true}
                                                    autoComplete="off"
                                                    icon={null}
                                                    placeholder={msgStr("user-placeholder")}
                                                />
                                            </>
                                        );
                                    })()}
                            </div>
                            <div className={styles["input-group"]}>
                                <label htmlFor="password">
                                    {msg("password")}
                                </label>
                                <Input
                                    tabIndex={2}
                                    id="password"
                                    name="password"
                                    isUsername={false}
                                    autoComplete="off"
                                    icon={null}
                                    placeholder={msgStr("password-placeholder")}
                                />
                            </div>
                            <div className={styles["actions"]}>
                                {realm.rememberMe && !usernameHidden && (
                                    <div id="kc-form-options">
                                        <div className="checkbox">
                                            <label
                                                className={
                                                    styles["remember-me"]
                                                }
                                            >
                                                <Checkbox
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    autoFocus={true}
                                                    checked={isChecked}
                                                    onChange={(e) =>
                                                        setIsChecked(
                                                            e.target.checked
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setIsChecked(
                                                                (prev) => !prev
                                                            );
                                                        }
                                                    }}
                                                    focusVisibleClassName="checkbox-focus-visible"
                                                    tabIndex={3}
                                                    icon={
                                                        <ReactSVG
                                                            className={
                                                                styles[
                                                                "checkboxCustomIcon"
                                                                ]
                                                            }
                                                            src={checkBoxIcon}
                                                        />
                                                    }
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 24,
                                                        },
                                                        color: "#72767B",
                                                        "&.Mui-checked": {
                                                            color: "#eb6d3b",
                                                        },
                                                    }}
                                                // {...(login.rememberMe === "on"
                                                // 	? {
                                                // 			defaultChecked: true,
                                                // 	  }
                                                // 	: {})}
                                                />
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a
                                                tabIndex={4}
                                                href={
                                                    url.loginResetCredentialsUrl
                                                }
                                                style={{ fontSize: "12px" , color:"black" }}
                                            >
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div id="kc-form-buttons" className={styles['kc-form-buttons']}>
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    {...(auth?.selectedCredential !== undefined
                                        ? {
                                            value: auth.selectedCredential,
                                        }
                                        : {})}
                                />
                                <button
                                    tabIndex={5}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    disabled={isLoginButtonDisabled}
                                >
                                    <span>{msgStr("doLogInSubmit")}</span>
                                    <ReactSVG src={arrow}  />
                                </button>

                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
