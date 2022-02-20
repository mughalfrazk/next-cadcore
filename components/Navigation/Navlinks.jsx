import Link from "next/link";
import Image from "next/image";
import { HiMail, HiPhone } from "react-icons/hi";

import { LOGO } from "../../constants/AssetConstants";
import { HOME_URL, SERVICES_URL } from "../../constants/UrlConstants";
import Button from "../Shared/Button";
import styles from "./Navlinks.module.scss";

const Navlinks = ({ active, setSidebar }) => {
	const sidebarState = () => (active ? styles.active : "inactive");
	const toggleSidebar = {
		onClick: () => setSidebar((prevMode) => !prevMode),
	};

	return (
		<div className={`${styles.backdrop} ${sidebarState()}`}>
			<div className={styles.notSidebarArea} {...toggleSidebar}></div>
			<div className={`${styles.sidebar} ${sidebarState()}`}>
				<ul className={styles.navlinks}>
					<li {...toggleSidebar}>
						<Link href={HOME_URL}>Home</Link>
					</li>
					<li {...toggleSidebar}>
						<Link href={SERVICES_URL}>Services</Link>
					</li>
					<li {...toggleSidebar}>
						<Link href={"/"}>About</Link>
					</li>
					<li {...toggleSidebar}>
						<Link href={"/"}>Contact</Link>
					</li>
					<li>
						<Button {...toggleSidebar}>
							Close
						</Button>
					</li>
				</ul>
				<div className={styles.sidebarBottomSection}>
					<div className={`${styles.contact} listItem`}>
						<HiPhone size={20} />
						<p>+92 300 XXX XX XX</p>
					</div>
					<div className={`${styles.contact} listItem`}>
						<HiMail size={22} />
						<p>info@cadcore.pk</p>
					</div>
					<hr />
					<Image src={LOGO} alt="Cadcore Logo" />
				</div>
			</div>
		</div>
	);
};

export default Navlinks;
