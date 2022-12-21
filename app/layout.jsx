import { Header } from "../components/header";
import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head />
      <body>
        <Header />
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
