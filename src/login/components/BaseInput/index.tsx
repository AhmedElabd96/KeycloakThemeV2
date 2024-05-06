import React from "react";
import styles from "./BaseInput.module.scss";
interface BaseInputProps {
  label?: string;
  children: any;
}
export default React.memo(
  ({ label, children }: BaseInputProps) => (
    <div className={`${styles["input-container"]}`}>
      {label && (
        <BaseLabel
          label={label}
          className={styles["input-label"]}
        />
      )}
      {children}
    </div>
  )
);
interface BaseLabelProps {
  label: string;
  className: any;
}
export const BaseLabel = React.memo(
  ({ label, className }: BaseLabelProps) => (
    <label className={`${className} ${styles["base-label"]}`}>
      {label}
    </label>
  )
);
