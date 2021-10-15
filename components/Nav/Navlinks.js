import styles from "./Navlinks.module.scss";

const Navlinks = (props) => {
  return (
    <div
      className={`${styles.backdrop} ${props.active ? styles.active : "inactive"}`}
    >
      <ul className={`${styles.navlinks} ${props.active ? styles.active : "inactive"}`}>
        <li>Home</li>
        <li>Services</li>
        <li>About</li>
        <li>Contact</li>
        <li><button onClick={() => props.setSidebar(prevMode => !prevMode)} >Close</button></li>
      </ul>
    </div>
  );
};

export default Navlinks;
