import styles from "./PageHeader.module.scss";
import logo from "../../assets/logo.svg";
interface PageHeaderProps {
    text?: string;
    pageId: string;
    msg: any;
}
const PageHeader = ({ text = "", pageId, msg }: PageHeaderProps) => (
    <div className={styles["container"]}>
        <button
            onClick={() => history.go(-1)}
            className={`${styles["back-link"]}`}
        >
            <i className="fa fa-chevron-left" />
            {msg("back")}
        </button>
        <div className={`${styles["logo"]}`}>
            <div className={styles["logo-container"]}>
                <img src={logo} alt={"FGIC Logo"} />
                {pageId === "login.ftl" && (
                    <div className={styles["login-text"]}>{text}</div>
                )}
            </div>
        </div>
    </div>
);

export default PageHeader;
