import Image from "next/image";

import { LOGO } from "../../constants/AssetConstants";
import styles from "./Header.module.scss";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <Image src={LOGO} alt="Cadcore Logo" />
      <button
        className={styles.menuIcon}
        onClick={() => props.setSidebar((prevMode) => !prevMode)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;
