import Head from 'next/head'
import PitchDisplay from '../components/pitchdisplay'
import { WordMap, WordMapEntry } from '../wordMap'
import parseWords from '../wordMap'
import styles from "../../styles/Content.module.css"

export default function Home({wordmaplist}: {wordmaplist: Array<[string, WordMapEntry]>}) {
  const wordmap = new Map<string, WordMapEntry>(wordmaplist);
  console.log(wordmap)
  return (
    <>
      <h1> Pitch Accent </h1>
      <h2> What is Japanese Word Accent? </h2>
      <p>
      In a language such as English, only one syllable of a word is stressed. Take for example the words 
      &quot;incite&quot; and &quot;insight,&quot; which have the same pronunciation, but have different syllables that are stressed.
      </p>

      <p>
      In Japanese, pronunciation is different. According to various sets of rules, pitches rise and fall throughout words and phrases. 
      Mastering these tonal patterns bridges the gap between being merely understood in Japanese and speaking with complete fluency.
      </p>
      <br/><br/>

      <h2> Classifying Pitch Types </h2>
      <p>
      For most native Japanese speakers, proper accent occurs unconsciously &mdash; aside from those who study linguistics, many have not even considered how Japanese word accents work. 
      This is not the case for those studying Japanese as a second language. The accent has to be learned.
      </p>

      <p>
      Fortunately, Many Japanese words and phrases can be grouped into various patterns of accent types.
      This makes it easier to study and practice a proper Japanese accent.
      </p>

      <p>
      The &quot;accent drop-off&quot; (linguistically referred to as the &quot;accent nucleus&quot;), is a key feature of Japanese accent.
      </p>

      <p>
      This is a point in a word or phrase when the accent shifts from a high pitch to a low pitch. 
      There are various rules for when this occurs in different nouns, verbs and adjectives. These rules are described in detail on this site.
      </p>

      <p>
      Additionally, there are rules for phrases or sentences as a whole. These are also explained in the site.
      </p>
      <br/><br/>

      <h2> Principles of Word Accent </h2>
      <p>
      In general, the the pitch will go from low to high from the first mora to the second. 
      It will then fall back to a low pitch at some point in the word. After this, the pitch will never rise again 
      (e.g. there is only one accent-drop-off). The classification of the word is dependent on which mora the accent-drop-off occurs.
      </p>

      <p>
      For classifying words, we can count from the first mora (Types 1, 2, 3, 4), or from the back (Type -4, -3, -2, -1). 
      As you can see, a Type 1 word is the same as a Type -4 word. The type used depends on what is easier/makes more sense for the given word.
      </p>

      <p>
        INSERT IMAGE???
      </p>
      <br/><br/>

      <h2> Principles of Sentence/Phrase Accent </h2>
      <p>   
      After studying the different accent patterns of individual words, it is useful to consider accent patterns in chunks of 
      sentences or phrases. Reading around fifteen mora at a time is manageable and effective. Most phrases have a hill-shaped
      pattern (e.g. the sentence/phrase begins low, goes high, and then drops back down). If you were to read each individual 
      word rising and falling, the sentence would sound very strange. In natural-sounding Japanese, sentences/phrases have the
      shape of a ski slope. This makes the sentence sound smoother.
      </p>
      <br/><br/>
    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = parseWords()
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}