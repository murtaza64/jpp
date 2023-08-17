import Head from 'next/head'
import PitchDisplay from '../components/pitchdisplay'
import { WordMap, WordMapEntry } from '../wordMap'
import parseWords from '../wordMap'
import styles from "../styles/Content.module.css"

export default function Home({wordmaplist}: {wordmaplist: Array<[string, WordMapEntry]>}) {
  const wordmap = new Map<string, WordMapEntry>(wordmaplist);
  console.log(wordmap)
  return (
    <>
      <h1> Names </h1>
      <p> 
      For Japanese family names as well as first names, there are only two accent patterns.
      </p>

      <h2> Type -3 </h2>
      <p>
      The accent drop-off occurs at the third-to-last mora (the 3rd mora from the end) and the pitch goes down from there. 
      </p>
      <PitchDisplay 
        words={[
          "佐藤さん", "高橋さん", "遠藤さん", "西村先生", "山口先生", "柴田先生"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 0 </h2>
      <p>
      The pitch starts low, hits the highest point at the second mora, and stays up until the end of the word, 
      including the first mora of the next word. (oftentimes the &quot;de&quot; of &quot;-desu,&quot; or a particle)
      </p>
      <PitchDisplay 
        words={[
          "山田さん", "中村さん", "阿部さん", "田中先生", "鈴木先生", "菅先生"
        ]}
        wordmap={wordmap}
      />
      <div className={styles.warning}>
      Japanese names can be pronounced the same but written in different kanji.
      </div>
      
      <br/><br/>

      <h2> Katakana Names??? </h2>
      <p>
        Katakana Names
      </p>
    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/name.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}