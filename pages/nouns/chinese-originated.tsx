import Head from 'next/head'
import PitchDisplay from '../../components/pitchdisplay'
import { WordMap, WordMapEntry } from '../../wordMap'
import parseWords from '../../wordMap'
import styles from "../../styles/Content.module.css"
import SingleWordDisplay from '../../components/singleworddisplay'

export default function Home({wordmaplist}: {wordmaplist: Array<[string, WordMapEntry]>}) {
  const wordmap = new Map<string, WordMapEntry>(wordmaplist);
  console.log(wordmap)
  return (
    <>
      <h1> Chinese Originated Nouns </h1>
      <p> 
      Chinese-Originated nouns are nouns that are written fully in kanji and read with 音読み. 
      There are three types of chinese-originated nouns; 1+2, 2+1, and 2+2 nouns, with each number representing the number 
      of mora in each kanji character. For example, the noun 勉強 is a 2+2 noun because 勉(べん)has 2 mora and 強(きょう) also has 2 mora. 
      Therefore by counting the number of mora in each individual kanji character, it is easy to classify whether it is a 1+2, 2+1, or 2+2 noun. 
      </p>

      <br/><br/>
      
      <h2> Chinese 1+2 Nouns </h2>
      <p>
      3 mora Chinese 1+2 Nouns have four types of accent patterns. See the picture below for an overview or click 
      learn more for a in depth explanation. 
      </p>
      <PitchDisplay 
        words={[
          "音楽", "韓国", "中国", "親切", "今晩",  "両親", "毎朝",
          "文学", "将来", "兄弟"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Chinese 2+1 Nouns </h2>
      <p>
      3 mora Chinese 2+1 Nouns have four types of accent patterns. See the picture below for an overview or click 
      learn more for a in depth explanation. 
      </p>

      <p>
      This accent type is used for 1% of all 2+2 nouns.
      </p>
      <PitchDisplay 
        words={[
          "職業", "一番"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <div className={styles.overviewPitches}>
        <SingleWordDisplay
          word = {"一番"}
          wordmap={wordmap}
        />
        <SingleWordDisplay
          word = {"職業"}
          wordmap={wordmap}
        />
      </div>
      

      <h2> Chinese 2+2 Nouns </h2>
      <p>
      4 mora Chinese 2+2 Nouns have five types of accent patterns. See the picture below for an overview or click 
      learn more for a in depth explanation. 
      </p>
    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/2+2 noun.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}