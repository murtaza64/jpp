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
      <h1> te-form and ta-form </h1>
      <p> 
      The accent of the te-form and plain past form is determined by the accent of the dictionary form.  
      There are two patterns of accents in verbs.  Thus, there are 2 patterns of accent for the te-form and plain past form as well. 
      They are Up-Down Type (Type -2 & Type -3) and Flat Type (Type 0).
      </p>

      <div className={styles.languageNote}>
      The important thing is to recognize that te-form and plain past form (ta-form) can only be Up-Down Type (Type -2 & Type -3) 
      or Flat Type (Type 0), so if you know that one of the accent types is not correct, it has to be the other type. For example, 
      if you know the verb is not Up-Down Type, then it has to be Flat Type.
      </div>
      <br/><br/>
      <h2> Up-Down type (Type -2 & Type -3) </h2>
      <p>
      Aside from two-mora verbs, for the te- and plain past form, the accent drop-off always occurs at the third-to-last mora 
      (two mora before て or た) and the pitch goes down right after it.  For two-mora verbs, the accent dropoff is placed at the 
      second-to-last mora.
      </p>
      <PitchDisplay 
        words={[
          "食べて", "食べた", "話して", "話した", "読んで", "読んだ", "見て",
          "見た", "帰って", "帰った", "考えて", "考えた"
        ]}
        wordmap={wordmap}
      />

      <br/><br/>
      <h2> Flat Type </h2>
      <p>
      The pitch starts off low and hits its highest point at the second mora and stays up.  
      There is no accent drop-off for te-form and the plain past form.  
      </p>
      <PitchDisplay 
        words={[
          "して", "した", "言って", "言った", "貸して", "貸した",
          "教えて", "教えた", "遊んで", "遊んだ", "働いて", "働いた"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/ta te.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}