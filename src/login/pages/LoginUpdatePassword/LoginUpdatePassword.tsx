import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import Input from "../../components/Input";
import passwordIcon from "../../assets/passwordIcon.svg";
import styles from "./LoginUpdatePassword.module.scss";
import { Tooltip, Typography } from "@mui/material";
import { Help } from "@mui/icons-material";

export default function LoginUpdatePassword(
    props: PageProps<
        Extract<KcContext, { pageId: "login-update-password.ftl" }>,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url, isAppInitiatedAction, username } = kcContext;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={msg("updatePasswordTitle")}
        >
            <form
                id="kc-passwd-update-form"
                action={url.loginAction}
                method="post"
            >
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    readOnly={true}
                    autoComplete="username"
                    style={{ display: "none" }}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    style={{ display: "none" }}
                />

                <div className={`${styles["input-group"]}`}>
                    <div>
                        <label
                            htmlFor="password-new"
                            className={styles["label-tooltip"]}
                        >
                            {msg("passwordNew")}
                            <Tooltip
                                placement="bottom"
                                leaveTouchDelay={5000}
                                enterTouchDelay={0}
                                title={
                                    <Typography fontSize={12}>
                                        {msg("passwordAlert")}
                                    </Typography>
                                }
                                sx={{ fontSize: "20px" }}
                            >
                                <Help color="disabled" fontSize="large" />
                            </Tooltip>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "1rem",
                                }}
                            ></div>
                        </label>
                    </div>
                    <div>
                        <Input
                            isUsername={false}
                            id="password-new"
                            name="password-new"
                            autoFocus={true}
                            autoComplete="new-password"
                            icon={null}
                        />
                    </div>
                </div>

                <div className={`${styles["input-group"]}`}>
                    <div>
                        <label htmlFor="password-confirm">
                            {msg("passwordConfirm")}
                        </label>
                    </div>
                    <div>
                        <Input
                            isUsername={false}
                            id="password-confirm"
                            name="password-confirm"
                            autoComplete="new-password"
                            icon={null}
                        />
                    </div>
                </div>

                <div>
                    <div id="kc-form-options">
                        <div>
                            {isAppInitiatedAction && (
                                <div className="checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            id="logout-sessions"
                                            name="logout-sessions"
                                            value="on"
                                            checked
                                        />
                                        {msgStr("logoutOtherSessions")}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div id="kc-form-buttons">
                        {isAppInitiatedAction ? (
                            <>
                                <input
                                    type="submit"
                                    defaultValue={msgStr("doSubmit")}
                                />
                                <button
                                    type="submit"
                                    name="cancel-aia"
                                    value="true"
                                >
                                    {msg("doCancel")}
                                </button>
                            </>
                        ) : (
                            <input type="submit" value={msgStr("doSubmit")} />
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}
