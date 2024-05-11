// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useEffect } from "react";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import backgroundImage from "./assets/background.png";
import styles from "./Template.module.scss";
import PageHeader from "./components/PageHeader/index";
import UAEPassButton from "./components/UAEPassButton";
import { FaRegCircleXmark, FaRegCircleCheck } from "react-icons/fa6";
import { PiWarningBold } from "react-icons/pi";
import { ImInfo } from "react-icons/im";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children,
        //@ts-ignore
        social
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction, pageId } =
        kcContext;

    const { isReady } = usePrepareTemplate({
        doFetchDefaultThemeResources: doUseDefaultCss,
        styles: [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`,
        ],
        htmlClassName: getClassName("kcHtmlClass"),
        bodyClassName: getClassName("kcBodyClass"),
        htmlLangProperty: locale?.currentLanguageTag,
        documentTitle: i18n.msgStr("loginTitle", kcContext.realm.displayName),
    });

    const realmName = realm?.displayName ?? realm?.name;
    const loginText =
        realm?.name === "publicfans"
            ? `${msgStr("logInIndiv")}`
            : `${msgStr("loginTo")} ${realmName}`;
    // @ts-ignore
    const UAEPassProvider = social?.providers?.find(p => p.displayName === 'UAE Pass')
    useEffect(() => {
        if (realmName) {
            document.title = loginText;
        } else {
            document.title = msgStr('doLogIn');
        }
    }, [realmName]);

    useEffect(() => {
        if(currentLanguageTag === 'ar') {
            document.documentElement.dir = 'rtl'
        } else {
            document.documentElement.dir = 'ltr'

        }
    }, [currentLanguageTag])

    if (!isReady) {
        return null;
    }

    return (
        <div className={`${styles["container"]} ${currentLanguageTag === 'ar' && styles['rtl']}`}>
            <div className={styles["imageContainer"]}>
                <img src={backgroundImage} alt="FGIC_Background" />
            </div>
            <div className={styles["content"]}>
                <PageHeader msg={msg} pageId={pageId} text={loginText} />

                <header className={styles["content-header"]}>
                    {!(
                        auth !== undefined &&
                        auth.showUsername &&
                        !auth.showResetCredentials
                    ) ? (
                        displayRequiredFields ? (
                            <div>
                                <div>
                                    <span className="subtitle">
                                        <span className="required">*</span>
                                        {msg("requiredFields")}
                                    </span>
                                </div>
                                <div className="col-md-10">
                                    <h1 id="kc-page-title">{headerNode}</h1>
                                </div>
                            </div>
                        ) : (
                            <h1
                                id="kc-page-title"
                                className={`${styles["page-header"]} ${realm?.name !== 'publicfans' && styles['indiv']}`}
                            >
                                {headerNode}
                            </h1>
                        )
                    ) : displayRequiredFields ? (
                        <div>
                            <div>
                                <span className="subtitle">
                                    <span className="required">*</span>{" "}
                                    {msg("requiredFields")}
                                </span>
                            </div>
                            <div className="col-md-10">
                                {showUsernameNode}
                                <div
                                    className={getClassName("kcFormGroupClass")}
                                >
                                    <div id="kc-username">
                                        <label id="kc-attempted-username">
                                            {auth?.attemptedUsername}
                                        </label>
                                        <a
                                            id="reset-login"
                                            href={url.loginRestartFlowUrl}
                                        >
                                            <div className="kc-login-tooltip">
                                                <i
                                                    className={getClassName(
                                                        "kcResetFlowIcon"
                                                    )}
                                                ></i>
                                                <span className="kc-tooltip-text">
                                                    {msg("restartLoginTooltip")}
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {showUsernameNode}
                            <div className={getClassName("kcFormGroupClass")}>
                                <div id="kc-username">
                                    <label id="kc-attempted-username">
                                        {auth?.attemptedUsername}
                                    </label>
                                    <a
                                        id="reset-login"
                                        href={url.loginRestartFlowUrl}
                                    >
                                        <div className="kc-login-tooltip">
                                            <i
                                                className={getClassName(
                                                    "kcResetFlowIcon"
                                                )}
                                            ></i>
                                            <span className="kc-tooltip-text">
                                                {msg("restartLoginTooltip")}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </header>

                <div id="kc-content" className={styles["content-body"]}>
                    <div
                        id="kc-content-wrapper"
                        className={styles["content-body-wrapper"]}
                    >
                        {displayMessage &&
                            message !== undefined &&
                            (message.type !== "warning" ||
                                !isAppInitiatedAction) && (
                                <div
                                    className={`${styles[`${message.type}`]} ${styles["alert"]}`}
                                >
                                    {message.type === "success" && (
                                        <FaRegCircleCheck />
                                    )}
                                    {message.type === "warning" && (
                                        <PiWarningBold />
                                    )}
                                    {message.type === "error" && (
                                        <FaRegCircleXmark />
                                    )}
                                    {message.type === "info" && <ImInfo />}
                                    <span
                                        className="kc-feedback-text"
                                        dangerouslySetInnerHTML={{
                                            __html: message.summary,
                                        }}
                                    />
                                </div>
                            )}
                        {children}
                        {auth !== undefined &&
                            auth.showTryAnotherWayLink &&
                            showAnotherWayIfPresent && (
                                <form
                                    id="kc-select-try-another-way-form"
                                    action={url.loginAction}
                                    method="post"
                                >
                                    <div>
                                        <div>
                                            <input
                                                type="hidden"
                                                name="tryAnotherWay"
                                                value="on"
                                            />
                                            <a
                                                href="#"
                                                id="try-another-way"
                                                onClick={() => {
                                                    document.forms[
                                                        "kc-select-try-another-way-form" as never
                                                    ].submit();
                                                    return false;
                                                }}
                                            >
                                                {msg("doTryAnotherWay")}
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            )}
                        {displayInfo && (
                            <div id="kc-info">
                                <div id="kc-info-wrapper">{infoNode}</div>
                            </div>
                        )}
                        {pageId === "login.ftl" &&
                            realm?.name === "publicfans" && (
                                <UAEPassButton msg={msg} provider={UAEPassProvider}/>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
