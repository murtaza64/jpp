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
      <h1> Compound Nouns </h1>
      <h2> Noun 1 (Flat) + Noun 2 (drop-off on the first mora) </h2>
      <p>
      When two nouns are combined together to compose one compound noun (Noun 1 + Noun 2), if Noun 2 is End-High or Flat-Type,
      Noun 1 becomes a Flat-Type word, regardless of its original type.
      Then, Noun 2 has an accent drop-off on the first mora and goes down after it.
      In other words, when two nouns combine the resulting compound word has only one up-down pitch
      </p>

      <PitchDisplay 
        words={[
          "イェル大学", "冬休み"
        ]}
        wordmap={wordmap}
      />
      <h2> Noun 1 (Flat) + Noun 2 (original accent drop-off) </h2>
      <p>
      If Noun 2 is High-Low or Mid-High, Noun 1 turn into a Flat-Type word, regardless of the original type. Then, the
      original accent drop-off remains on Noun 2.
      </p>

      <PitchDisplay 
        words={[
          "インターネット", "ホームページ"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Noun 2 with 1 or 2 Mora </h2>
      <p>
      If Noun 2 is composed of 1 or 2 mora, Noun 1 becomes flat type and the pitch falls right before Noun 2.
      </p>

      <PitchDisplay 
        words={[
          "東京駅", "日本人"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Flat-Type Compound Nouns (Noun 2: 5+ Mora) </h2>
      <p>   
      If Noun 2 is Flat Type with 5 or more mora, the whole compound noun also becomes a Flat-Type word (regardless of the
      type of Noun 1). There are not many Flat-Type Words with 5+ mora, so there are few compounds following this pattern.
      </p>

      <PitchDisplay 
        words={[
          "科学研究所"
        ]}
        wordmap={wordmap}
      />
      <br/><br/>

      <h2> Flat-Type Compound Nouns (Noun 2 with 1 or 2 Mora) </h2>
      <p>   
      Regardless of the type of Noun 1, the whole compound noun becomes a Flat-Type word. 
      There are fewer words that become Flat-Type than those that become Up-Down type.
      </p>

      <PitchDisplay 
        words={[
          "日本語", "専門的", "右側"
        ]}
        wordmap={wordmap}
      />
    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords()
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}