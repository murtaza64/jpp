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
      <h1> Chinese Originated Noun 1+2 </h1>
      <p> 
      Three-mora 1+2 Chinese-Originated nouns have four types of accent patterns. 
      </p>
      <h2> Type 1 </h2>
      <p>
      In a Type 1 word, the pitch starts high and keeps dropping until the end of the word.
      </p>

      <p>
      This accent type is used for 25% of all 1+2 nouns.
      </p>
      <PitchDisplay 
        words={[
          "美術", "午前", "ご飯", "授業", "世界",  "書道", "気分",
          "家賃", "二本"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 2 </h2>
      <p>
      In a Type 2 word, the pitch starts low, hits its highest point at the second mora and drops until the end of the word.
      </p>

      <p>
      This accent type is used for 1.4% of all 1+2 nouns.
      </p>

        <div className={styles.languageNote}>
        Whenever the second mora is a syllabic nasal 「ん」, long vowel, or diphthong, 
        the word&apos;s highest accent point generally shifts mora to left (especially when speaking quickly).
        </div>

      <PitchDisplay 
        words={[
          "日本", "自由", "試験", "胡椒", "砂糖"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 3 </h2>
      <p>
      In a Type 3 word, starts low and hits its highest point at the second mora, staying up until the end of the word, 
      dropping on the first mora of the next word.(e.g. drops on the 「で」in 「」)
      </p>

      <p>
      This accent type is used for 0.2% of all 1+2 nouns.
      </p>

      <div className={styles.languageNote}>
      Whenever the second mora is a syllabic nasal 「ん」, long vowel, or diphthong, the word&apos;s highest accent point generally shifts mora 
      to left (especially when speaking quickly).
      </div>
      <PitchDisplay 
        words={[
          "地獄"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 0/Flat (Most Common) </h2>
      <p>   
      In a Type 0 word, the pitch starts off low and hits its highest point at the second mora and stays up until the end of the word, 
      including the first syllable of the next word/particle 
      (e.g. stays up on  the 「は」,「を」or「で」in 「」).
      </p>

      <p>
      This accent type is used for 73% of all 1+2 nouns.
      </p>

      <div className={styles.languageNote}>
      Whenever the second mora is a syllabic nasal 「ん」, long vowel, or diphthong, the word&apos;s highest accent 
      point generally shifts mora to left (especially when speaking quickly).
      </div>
      <PitchDisplay 
        words={[
          "予習", "旅行", "野菜", "試合", "写真", "予定", "気温", "予報", 
          "地震", "都会", "値段", "旅館", "野球", "社長", "故障"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>
    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/1+2 noun.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}