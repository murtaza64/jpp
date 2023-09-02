import Head from 'next/head'
import PitchDisplay from '../../components/pitchdisplay'
import { WordMap, WordMapEntry } from '../../wordMap'
import parseWords from '../../wordMap'
import styles from "../../styles/Content.module.css"

export default function Home({wordmaplist}: {wordmaplist: Array<[string, WordMapEntry]>}) {
  const wordmap = new Map<string, WordMapEntry>(wordmaplist);
  console.log(wordmap)
  return (
    <>
      <h1> ない-Form </h1>
      <p> 
      The accent of the ない-form is determined by the accent of the dictionary form.
      Since there are two patterns of accents in verbs, there are 2 patterns of accents for the ない-form as well. 
      This rule also applies to the conjugation forms of “ない” including ~ないでください, ~なくて, ~なければ, etc.
      </p>

    
      <div className={styles.warning}>
        English speakers tend to add stress to the wrong syllable and stress な in ない too strongly, 
        similar to the stress of “don&apos;t” in “Don&apos;t eat that.” However, Japanese doesn&apos;t have a similar rule.
      </div>
      <br/><br/>

      <h2> Up-Down Type </h2>
      <p>
      The accent-drop off of an Up-Down type occurs on the mora right before ～ない. 
      </p>

      <p>
        Remember, the pitch type of ない-form verbs are determined by the pitch type of the regular dictionary form of the verb. 
        Therefore all -2 and -3 type plain verbs, which are all categorized as up-down type, are considered to be in this category when 
        changed to its ない-form.
      </p>

      <PitchDisplay 
        words={[
          "起きません", "行きません", "飲みません", "勉強しません", "寝ません",  "帰りません", "読みません",
          "食べません", "買いません", "来ません", "見ません", "聞きません", "しません"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Flat Type </h2>
      <p>
        Just like the flat type for plain dictionary form, the pitch starts off low and hits its highest point at the second mora, 
        which stays up with the same high pitch until the end of the verb, which often includes the first mora of the proceeding noun or particle. 
      </p>

      <p>
        Click on the examples below and notice how none of the words drop in pitch after the second mora.
      </p>

      <PitchDisplay 
        words={[
          "起きますか", "行きますか", "飲みますか", "勉強しますか", "寝ますか", "帰りますか", "読みますか",
          "食べますか", "買いますか", "来ますか", "見ますか", "聞きますか", "しますか"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/masu.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}