import { ReactNode } from "react";
import styles from "../styles/Layout.module.css"
import MultiTierNavbar from "./navbar"
import Sidebar from "./sidebar";
import Link from "next/link";

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
            name: "Pitch Accent",
            relPath: "pitch-accent",
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
              },
              {
                name: "te-form/ta-form",
                relPath: "te-ta-form",
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
              },
              {
                name: "Chinese originated 2+1",
                relPath: "chinese-2-1"
              },
              {
                name: "Gairaigo",
                relPath: "gairaigo"
              },
              {
                name: "Compound nouns",
                relPath: "compound-nouns"
              }
            ]
          },
          {
            name: "Names",
            relPath: "names",
          },
        ]
      }/>
      <div className={styles.contentContainer}>
        <div className={styles.pageContainer}>
          <Link href="/"><h1>Japanese Pronunciation Pro</h1></Link>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}