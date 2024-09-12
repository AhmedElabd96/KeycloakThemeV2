import React, { useEffect, useRef, useState } from "react";
import styles from "./Input.module.scss";
import BaseInput from "../BaseInput";

interface InputProps {
	name: string;
	id?: string;
	label?: string;
	placeholder?: string ;
	readOnly?: boolean;
	tabIndex?: number;
	isUsername?: boolean;
	icon: any;
	defaultValue?: string;
    autoFocus?: boolean;
    autoComplete?: string;
}
export default React.memo(
	({
		placeholder,
		label,
		id,
		name,
		readOnly,
		tabIndex,
		isUsername = false,
		icon,
		defaultValue,
        autoFocus = false,
        autoComplete = 'on'
	}: InputProps) => {
		const [showPassword, setShowPassword] = useState(false);
		const [isFocused, setIsFocused] = useState(false);
		const inputRef = useRef<any>(null);
		const onFocusHandler = () =>
			document.activeElement === inputRef.current
				? setIsFocused(true)
				: setIsFocused(false);

		const handleType = (): any => {
			if (isUsername || (!isUsername && showPassword)) return "text";
			return "password";
		};
		useEffect(() => {
			isUsername && inputRef.current.focus();
		}, [isUsername]);
		return (
			<BaseInput label={label}>
				<div
					className={`${styles["user-password"]} ${
						isFocused && styles["focused"]
					}`}
				>
					{icon && <img src={icon} />}
					<input
						ref={inputRef}
						onFocus={onFocusHandler}
						onBlur={onFocusHandler}
						defaultValue={defaultValue}
						tabIndex={tabIndex}
						onKeyDown={(e) => {
							if(e.key === ' ') {
								e.preventDefault()
							}
						}}
						type={handleType()}
						id={id}
						placeholder={placeholder}
						name={name}
                        autoFocus={autoFocus}
                        autoComplete={autoComplete}
					/>
					{!readOnly && !isUsername && (
						<i
							className={`${
								showPassword
									? `${styles["eye-shine"]} fa fa-eye`
									: "fa fa-eye-slash"
							}`}
							onClick={() => setShowPassword(!showPassword)}
						/>
					)}
				</div>
			</BaseInput>
		);
	}
);
