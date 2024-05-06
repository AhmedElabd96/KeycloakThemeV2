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
                <li key={p.providerId}>
                    {p?.displayName?.toLowerCase() === "google" && (
                        <a href={p.loginUrl}>
                            <img src={googleIcon} />
                        </a>
                    )}
                    {p?.displayName?.toLowerCase() === "linkedin" && (
                        <a href={p.loginUrl}>
                            <img src={linkedinIcon} />
                        </a>
                    )}
                    {p?.displayName?.toLowerCase() === "facebook" && (
                        <a href={p.loginUrl}>
                            <img src={facebookIcon} />
                        </a>
                    )}
                    {p?.displayName?.toLowerCase() === "github" && (
                        <a href={p.loginUrl}>
                            <img src={githubIcon} />
                        </a>
                    )}
                </li>
            ))}
        </ul>
        <span className={styles["or"]}>Or</span>
    </div>
);

export default Socials;
