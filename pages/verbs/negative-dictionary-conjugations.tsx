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
      <h1> ない-Form Conjugations </h1>
      <p> 
      The pitch accent of ない-form verb conjugations are determined by the accent type of the ない-form verbs. 
      Since there are two patterns of accents in ない-form verbs, there are 2 patterns of accents for the conjugations as well.
      </p>

      <br/><br/>

      <h2> Up-Down Type </h2>
      <p>
        When conjugating an up-down type ない-form verb, it uses the same rule as its ない-form. 
        The accent-drop off occurs on the mora right before ～ない and continues to decrease. 
        The negative conjugations include forms such as なくて, ないで, and なければ.
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
        Conjugations for flat type ない-form verbs are different from their original rules. 
        Similar to ない-form pitch accent rule, the conjugation starts low and reaches its highest point at the second mora. 
        Instead of staying at the highest pitch until the end of the word, when conjugating ない-form verbs, the pitch drops on the な in ない. 
        So for conjugations such as なくて, ないで, and なければ, the pitch drops on the な. 
      </p>

      <p>
        There is an exception to this rule. If you&apos;re placing ない in front of a noun (in both dependent and independent nouns), 
        like ほう in the expression 〜ほうがいい、よう in ように、or another noun like はず , つもり, or もの then the pitch stays flat.
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