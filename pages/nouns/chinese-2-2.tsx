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
      <h1> Chinese Originated Noun 2+2 </h1>
      <p> 
      MAYBE HAVE EXPLANATION OF WHAT CHINESE ORIGINATED NOUNS ARE.
      Chinese-Originated nouns (i.e. four mora-words that are read using 音読み) have
      five types of accent patterns.
      </p>
      <h2> Type 1 </h2>
      <p>
      In a Type 1 word, the pitch begins high and continues dropping until the end of the
      word.This accent type is used for 10% of all 2+2 nouns.
      </p>
      <PitchDisplay 
        words={[
          "音楽", "韓国", "中国", "親切", "今晩",  "両親", "毎朝",
          "文学", "将来", "兄弟"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 2 </h2>
      <p>
      In a Type 2 word, the pitch starts off low buts hits its highest point at the second
      mora. It then gradually drops until the end of the word.
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

      <h2> Type 3 </h2>
      <p>
      In a Type 3 word, the pitch starts off low and hits its highest point at the second
      and third mora. It then drops from there.
      </p>

      <p>
      This accent type is used for 5% of all 2+2 nouns.
      </p>

      <div className={styles.languageNote}>
      Whenever the second mora is a syllabic nasal 「ん」, long vowel,
      or diphthong, the word&apos;s highest accent point generally shifts mora to left (especially when speaking
      quickly).
      </div>
      <PitchDisplay 
        words={[
          "先生", "半分", "台風", "大勢", "番号", "残念"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 4 </h2>
      <p>
      In a Type 4 word, the pitch starts off low and hits its highest point at the second
      mora and stays up until the end of the word. It then drops from there. (e.g. drops on the 「で」in 「」)
      </p>

      <p>
      This accent type is used for 0.1% of all 2+2 nouns.
      </p>

      <div className={styles.languageNote}>
      Whenever the second mora is a syllabic nasal 「ん」, long vowel,
      or diphthong, the word&apos;s highest accent point generally shifts mora to left (especially when speaking
      quickly).
      </div>
      <PitchDisplay 
        words={[
          "正月"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Type 0/Flat (Most Common) </h2>
      <p>  
      In a Type 0 word, the pitch starts off low and hits its highest point at the second
      mora and stays up until the end of the word, including the first syllable of the next word/particle
      (e.g. stays up on  the 「は」,「を」or「で」in 「」).
      </p>

      <p>
      This accent type is used for 83% of all 2+2 nouns.
      </p>

      <div className={styles.languageNote}>
      Whenever the second mora is a syllabic nasal 「ん」, long vowel,
      or diphthong, the word&apos;s highest accent point generally shifts mora to left (especially when speaking
      quickly).
      </div>
      <PitchDisplay 
        words={[
          "鉛筆", "教室", "公園", "復習", "質問", "練習", "週末", "作文", 
          "専攻", "宿題", "勉強", "学生", "学校", "来週", "黒板", "本当"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>
    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords("public/words/2+2 noun.txt")
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}