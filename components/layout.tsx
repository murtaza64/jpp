import { ReactNode } from "react";
import styles from "../styles/Layout.module.css"
import MultiTierNavbar from "./navbar"
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <>
      <Sidebar rootSections={
        [
          {
            name: "Home",
            relPath: "",
          },
          {
            name: "Verbs",
            relPath: "verbs",
            subsections: [
              {
                name: "Masu form",
                relPath: "masu-form",
              },
              {
                name: "Dictionary form",
                relPath: "dictionary-form",
              }
            ]
          },
          {
            name: "Nouns",
            relPath: "nouns",
            subsections: [
              {
                name: "Chinese originated 2+2",
                relPath: "chinese-2-2"
              },
              {
                name: "Chinese originated 1+2",
                relPath: "chinese-1-2"
              }
            ]
          }
        ]
      }/>
      <div className={styles.contentContainer}>
        <div className={styles.pageContainer}>
          <a href="/"><h1>Japanese Pronunciation Pro</h1></a>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}