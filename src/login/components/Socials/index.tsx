import styles from "./Socials.module.scss";
import googleIcon from "../../assets/google.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import facebookIcon from "../../assets/facebook.svg";
import githubIcon from "../../assets/github.svg";

interface SocialsProps {
    msg: any;
    socialProviders?: any[];
}

const Socials = ({ msg, socialProviders = [] }: SocialsProps) => (
    <div className={styles["container"]}>
        <p>{msg("signInUsing")}</p>
        <ul className={styles["providers"]}>
            {socialProviders?.map((p) => (
                <li
                    key={p.providerId}
                    onClick={() => window.open(p.loginUrl, "_self")}
                >
                    {p?.displayName?.toLowerCase() === "google" && (
                        <img src={googleIcon} />
                    )}
                    {p?.displayName?.toLowerCase() === "linkedin" && (
                        <img src={linkedinIcon} />
                    )}
                    {p?.displayName?.toLowerCase() === "facebook" && (
                        <img src={facebookIcon} />
                    )}
                    {p?.displayName?.toLowerCase() === "github" && (
                        <img src={githubIcon} />
                    )}
                </li>
            ))}
        </ul>
        <span className={styles["or"]}>Or</span>
    </div>
);

export default Socials;
