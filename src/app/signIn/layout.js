import styles from "./css.module.css";

export default function RootLayout({ children }) {
  return <div className={styles.signInContainer}>{children}</div>;
}
