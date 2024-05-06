import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import { MessageKey } from "keycloakify/login/i18n/i18n";
import styles from "./LoginConfigTotp.module.scss";

export default function LoginConfigTotp(
    props: PageProps<
        Extract<KcContext, { pageId: "login-config-totp.ftl" }>,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

 

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } =
        kcContext;

    const { msg, msgStr } = i18n;

    const algToKeyUriAlg: Record<
        (typeof kcContext)["totp"]["policy"]["algorithm"],
        string
    > = {
        HmacSHA1: "SHA1",
        HmacSHA256: "SHA256",
        HmacSHA512: "SHA512",
    };

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={msg("loginTotpTitle")}
        >
            <>
                <ol id="kc-totp-settings">
                    <li>
                        <p>{msg("loginTotpStep1")}</p>

                        <ul id="kc-totp-supported-apps">
                            {totp.supportedApplications.map((app) => (
                                <li>{msg(app as MessageKey)}</li>
                            ))}
                        </ul>
                    </li>

                    {mode && mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p>
                                    <span id="kc-totp-secret-key">
                                        {totp.totpSecretEncoded}
                                    </span>
                                </p>
                                <p>
                                    <a href={totp.qrUrl} id="mode-barcode">
                                        {msg("loginTotpScanBarcode")}
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>{msg("loginTotpManualStep3")}</p>
                                <p>
                                    <ul>
                                        <li id="kc-totp-type">
                                            {msg("loginTotpType")}:{" "}
                                            {msg(
                                                `loginTotp.${totp.policy.type}`
                                            )}
                                        </li>
                                        <li id="kc-totp-algorithm">
                                            {msg("loginTotpAlgorithm")}:{" "}
                                            {algToKeyUriAlg?.[
                                                totp.policy.algorithm
                                            ] ?? totp.policy.algorithm}
                                        </li>
                                        <li id="kc-totp-digits">
                                            {msg("loginTotpDigits")}:{" "}
                                            {totp.policy.digits}
                                        </li>
                                        {totp.policy.type === "totp" ? (
                                            <li id="kc-totp-period">
                                                {msg("loginTotpInterval")}:{" "}
                                                {totp.policy.period}
                                            </li>
                                        ) : (
                                            <li id="kc-totp-counter">
                                                {msg("loginTotpCounter")}:{" "}
                                                {totp.policy.initialCounter}
                                            </li>
                                        )}
                                    </ul>
                                </p>
                            </li>
                        </>
                    ) : (
                        <li>
                            <p>{msg("loginTotpStep2")}</p>
                            <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                            />
                            <br />
                            <p>
                                <a href={totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </p>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol>

                <form
                    action={url.loginAction}
                    id="kc-totp-settings-form"
                    method="post"
                >
                    <div className={styles['input-container']}>
                        <div>
                            <label htmlFor="totp">
                                {msg("authenticatorCode")}
                            </label>{" "}
                        </div>
                        <div>
                            <input
                                type="text"
                                id="totp"
                                name="totp"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError(
                                    "totp"
                                )}
                            />

                            {messagesPerField.existsError("totp") && (
                                <span
                                    id="input-error-otp-code"
                                    aria-live="polite"
                                >
                                    {messagesPerField.get("totp")}
                                </span>
                            )}
                        </div>
                        <input
                            type="hidden"
                            id="totpSecret"
                            name="totpSecret"
                            value={totp.totpSecret}
                        />
                        {mode && <input type="hidden" id="mode" value={mode} />}
                    </div>

                    <div className={styles['input-container']}>
                        <div>
                            <label htmlFor="userLabel">
                                {msg("loginTotpDeviceName")}
                            </label>{" "}
                            {totp.otpCredentials.length >= 1 && (
                                <span className="required">*</span>
                            )}
                        </div>
                        <div className={styles['input-container']}>
                            <input
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError(
                                    "userLabel"
                                )}
                            />
                            {messagesPerField.existsError("userLabel") && (
                                <span
                                    id="input-error-otp-label"
                                    aria-live="polite"
                                >
                                    {messagesPerField.get("userLabel")}
                                </span>
                            )}
                        </div>
                    </div>

                    {isAppInitiatedAction ? (
                        <>
                            <input
                                type="submit"
                                id="saveTOTPBtn"
                                value={msgStr("doSubmit")}
                            />
                            <button
                                type="submit"
                                id="cancelTOTPBtn"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </button>
                        </>
                    ) : (
                        <input
                            type="submit"
                            id="saveTOTPBtn"
                            value={msgStr("doSubmit")}
                        />
                    )}
                </form>
            </>
        </Template>
    );
}
