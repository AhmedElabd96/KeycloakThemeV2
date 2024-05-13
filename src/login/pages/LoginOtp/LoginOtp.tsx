import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import styles from "./LoginOtp.module.scss";
//@ts-ignore
import OTPInput from "otp-input-react";
import { useState } from "react";
export default function LoginOtp(
    props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>
) {
    const [otp, setOtp] = useState("");
    // @ts-ignore
    const { kcContext, i18n, doUseDefaultCss, Template, classes, totp } = props;

    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    //@ts-ignore
    const handleSubmit = async (e) => {
        const form = document.getElementById("kc-otp-login-form");

        const otpInput = document.createElement("input");

        otpInput.type = "hidden";
        otpInput.name = "otp";
        otpInput.value = otp;
        form?.appendChild(otpInput);
    };

    return (
        <>
            <Template
                {...{ kcContext, i18n, doUseDefaultCss, classes }}
                headerNode={msg("doLogIn")}
            >
                <form
                    id="kc-otp-login-form"
                    className={styles["form"]}
                    action={url.loginAction}
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <div className={styles["input-container"]}>
                        <div>
                            <label htmlFor="otp">
                                {msg("loginOtpOneTime")}
                            </label>
                        </div>

                        <div>
                            <OTPInput
                                className={styles["otp-inputs-container"]}
                                value={otp}
                                // @ts-ignore
                                onChange={(e) => setOtp(e)}
                                autoFocus
                                OTPLength={totp?.policy?.digits}
                            />
                        </div>
                    </div>

                    <div>
                        <div id="kc-form-buttons">
                            <input
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                            />
                        </div>
                    </div>
                </form>
            </Template>
        </>
    );
}
