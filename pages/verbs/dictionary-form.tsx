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
      <h1> Dictionary form </h1>
      <h2> Up-Down Type </h2>
      <p> 
        The Up-Down Type, also known as Type -2, has an accent drop-off on the second-to-last mora of the plain form. 
      </p>

      <p>
      When there is a long vowel or diphthong on the second-to-last mora, the accent drop-off shifts back to the mora right before it. 
      For example, BLANK has BLANK on the BLANK mora, which is a BLANK, so the accent drop-off shifts back to the mora right before it. 
      Thus, Type -3 verbs are considered a part of Type -2. To avoid confusion, we refer to them all as Up-Down Type.
      </p>
      <PitchDisplay 
        words={[
          "会う", "食べる", "手伝う", "帰る", "考える", "かかる", "作る",
          "思う", "調べる", "見る", "話す", "泳ぐ", "受ける"
        ]}
        wordmap={wordmap}
      />

      <div className={styles.languageNote}>
        All verbs that end with 「つ」 are Up-Down Type. (待つ、立つ、勝つ、育つ)
      </div>
      <br/><br/>
      <h2> Flat Type </h2>
      <p>
      The flat type is the simpliest pitch rule to remember. The pitch starts off low, hits its highest point at the second mora and stay ups with the same 
      high pitch until the end of the verb, oftentimes including the first mora of the proceeding noun.
      </p>
      <PitchDisplay 
        words={[
          "買う", "使う", "聞こえる", "いる", "くれる",  "する", "上げる",
          "来る", "止まる", "歌う", "誘う", "踊る", "送る"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/dictionary.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}