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
      <h1> 外来語 </h1>
      <h2> General Rules </h2>
      <p>
      Just like Chinese-originated nouns, katakana words are classified by where the accent drop-off occurs. 
      Because katakana words have variable length, we classify them by counting from the last mora of the word. In general, 
      the accent drop-off occurs at the third-to-last mora (the 3rd mora from the end of the word) and the pitch goes down from there. 
      Thus, many foreign katakana words are classified into Type -3. Unlike 2+2-mora or 1+2-mora Chinese originated nouns which are 
      majority Type 0/Flat Type words, only 20% of foreign katakana words are classified as Type 0/Flat Type.
      </p>
      <h2> 2-mora Words </h2>
      
      <PitchDisplay 
        words={[
          "バス", "パン", "ペン", "メモ", "ビザ",  "キー", "ジャズ"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> 3-mora Words </h2>
      <h3> Type -3 </h3>
      <PitchDisplay 
        words={[
          "バナナ", "アニメ", "ホテル", "オバマ", "テニス"
        ]}
        wordmap={wordmap}
      />
      
      <br/>
      <h3> Type -2 </h3>
      <PitchDisplay 
        words={[
          "スキー", "ブルー", "ツイン"
        ]}
        wordmap={wordmap}
      />

      <br/>
      <h3> Type 0/Flat Type </h3>
      <PitchDisplay 
        words={[
          "メール", "ライン", "スタバ", "カレー"
        ]}
        wordmap={wordmap}
      />

      <br/><br/>

      <h2> 4-mora Words </h2>
      <h3> Type 1 </h3>
      <PitchDisplay 
        words={[
          "ビジネス", "ソビエト", "カロリー", "マフラー"
        ]}
        wordmap={wordmap}
      />
      
      <br/>
      <h3> Type -3 </h3>
      <PitchDisplay 
        words={[
          "トランプ", "ストレス", "スピーチ"
        ]}
        wordmap={wordmap}
      />

      <br/>
      <h3> Type 0/Flat Type </h3>
      <PitchDisplay 
        words={[
          "アメリカ", "メキシコ", "インスタ"
        ]}
        wordmap={wordmap}
      />

      <br/><br/>

      <h2> 5+-Mora Words </h2>
      <p>   
      Just like 3- and 4-mora words, foreign katakana words containing 5+ mora generally fall into Type -3.
      </p>
      <br/><br/>

      <h2> Special Rule </h2>
      <p>
      When the mora where the accent drop-off has a special dependent sound (the 3rd mora in this case) such as a long vowel「ー」, 
      double consonant「ッ」, diphthong「イ」, the syllabic nasal「ン」sound or an unvoiced vowel, the accent drop-off shifts back 
      to the mora right before it (i.e., the accent drop-off occurs at the 4th-to-last mora).
      </p>

      <p>
      For example, with the word 「ラーメン」the accent drop-off has shifted to the mora 「ラ」(the 4th-to-last-mora).
      </p>
      <br/><br/>


    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/gairaigo.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}