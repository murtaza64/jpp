import { ReactNode } from "react";
import styles from "../styles/Layout.module.css"
import NavbarLink from "./navbarlink";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <>
      <div className={styles.container}>
        <a href="/"><h1>Japanese Pronunciation Pro</h1></a>
        <div className={styles.navbar}>
          <NavbarLink href="/verbs/masu-form">Masu form</NavbarLink>
          <NavbarLink href="/nouns/chinese-originated-2-2">Chinese Originated 2+2</NavbarLink>
        </div>
        <main>{children}</main>
      </div>
    </>
  )
}