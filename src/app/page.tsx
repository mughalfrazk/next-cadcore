import Image from "next/image";
import styles from "./page.module.css";
import { ModelViewer } from "@/components/viewer";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello World</h1>
      <ModelViewer />
    </main>
  );
}
