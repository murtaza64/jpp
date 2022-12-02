import { ReactNode } from "react";
import styles from "../styles/Layout.module.css"
import MultiTierNavbar from "./navbar"

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <>
      <div className={styles.container}>
        <a href="/"><h1>Japanese Pronunciation Pro</h1></a>
        <div className={styles.navbar}>
          <MultiTierNavbar rootSections={
            [
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
            }
          />
        </div>
        <main>{children}</main>
      </div>
    </>
  )
}