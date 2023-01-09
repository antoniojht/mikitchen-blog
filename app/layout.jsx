import { Footer } from "../components/Footer";
import Header from "../components/header";
import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head />
      <body>
        <Header />
        <main className={styles.container}>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
