import styles from "./Slider.module.scss";

const Slider = () => {
	return (
		<section className={styles.sliderBg}>
			<p className={`${styles.heading} ${styles.line1}`}>
				Architecture should<br />speak of its time and place,
			</p>
			<p className={`${styles.heading} ${styles.line2}`}>
				But yearn for timelessness
			</p>
			<p className={styles.subHeading}>- Frank Gehry</p>
		</section>
	);
};

export default Slider;
