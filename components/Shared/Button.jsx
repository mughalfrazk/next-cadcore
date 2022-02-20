import React from "react";
import styles from "./Button.module.scss";

const Button = ({ children, secondary, onClick, fullWidth, small, large }) => {
	const buttonProps = () => {
		return `${styles.button} ${fullWidth ? styles.fullWidth : ""} ${
			small ? styles.small : large ? styles.large : styles.normal
		} ${secondary ? styles.secondary : styles.primary}`;
	};

	return (
		<button className={buttonProps()} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
