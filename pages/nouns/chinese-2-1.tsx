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
      <h1> Chinese Originated Noun 2+1 </h1>
      <p> 
      Three-mora 2+1 Chinese-Originated nouns have four types of accent patterns.
      </p>
      <h2> Type 1 (Most Common) </h2>
      <p>
      In a Type 1 word, the pitch starts high and keeps dropping until the end of the word.
      </p>

      <p>
      This accent type is used for 51% of all 2+1 nouns.
      </p>
      <PitchDisplay 
        words={[
          "彼女", "天気", "文化", "全部", "今度",  "興味", "便利"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 2 </h2>
      <p>
      In a Type 2 word, the pitch starts low, hits its highest point at the second mora and drops until the end of the word.
      </p>

      <p>
      This accent type is used for 0.3% of all 2+1 nouns.
      </p>

      <div className={styles.languageNote}>
      Whenever the second mora is a syllabic nasal 「ん」, long vowel, or diphthong, the word&apos;s highest accent point 
      generally shifts mora to left (especially when speaking quickly).
      </div>

      <PitchDisplay 
        words={[
          "時計"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 3 </h2>
      <p>
      In a Type 3 word, the pitch starts low and drops at the last mora.
      </p>

      <p>
      This accent type is used for 1.4% of all 2+1 nouns.
      </p>

      <PitchDisplay 
        words={[
          "上手", "大事"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 0/Flat (Most Common) </h2>
      <p>   
      In a Type 0 word, the pitch starts off low and hits its highest point at the second mora and stays up until the end of the word, 
      including the first syllable of the next word/particle (e.g. stays up on  the 「は」,「を」or「で」in 「」).
      </p>

      <p>
      This accent type is used for 41% of all 2+1 nouns.
      </p>

      <div className={styles.languageNote}>
      Whenever the second mora is a syllabic nasal 「ん」, long vowel, or diphthong, the word&apos;s highest accent 
      point generally shifts mora to left (especially when speaking quickly).
      </div>
      <PitchDisplay 
        words={[
          "英語", "漢字", "病気", "作家", "電話", "単語", "政治", "電車", 
          "会話", "歴史"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>
    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/2+1 noun.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}