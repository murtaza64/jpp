import Head from 'next/head'
import PitchDisplay from '../../components/pitchdisplay'
import { WordMap, WordMapEntry } from '../../types'
import wordlist from "../../public/words.json"

export default function Home({wordmaplist}: {wordmaplist: Array<[string, WordMapEntry]>}) {
  const wordmap = new Map<string, WordMapEntry>(wordmaplist);
  return (
    <>
      <h1> Masu form </h1>
      <h2> Affirmative </h2>
      <p> 
        Affirmative form, or masu form, is the simplest pitch rule to remember. 
        The pitch rises after the first Mora, followed by a flat high pitch until 
        you get to ま at which point the pitch drops sharply.
      </p>

      <p>
        Try clicking the examples below, and notice how the pitch of す sounds 
        compared to ま. You can see the pitch drops in the graph to the
        left. Try and repeat after the audio until you get the hang of it!
      </p>
      <PitchDisplay 
        words={["行きます", "帰ります"]}
        translations={["to go", "to return (home)"]}
        wordmap={wordmap}/>
      <p>
        Warning: Some people extend the ま sound when trying to pronounce the 
        pitch drop, but this isn't correct. All syllables (also called Mora) should 
        stay the same length.
      </p>

      <p>
        Language Note: The location where the pitch drops from high to low — we call
        it “an accent drop,” “downstep,” or linguistically “accent nucleus” — is
        extremely important to know to sound like a native speaker. Knowing where to
        drop the pitch will make you easier to understand, and sound more natural!
      </p>
      
    </> 

  )
}

export function getServerSideProps() {
  const fullWordMap = new Map<string, WordMapEntry>()
  for (const entry of wordlist) {
    fullWordMap.set(entry.word, {"pitches": entry.pitches, "moras": entry.moras})
  }
  // const reducedWordMap = new Map<string, WordMapEntry>()
  // for (const word of allWords) {
  //   reducedWordMap.set(word, fullWordMap.get(word));
  // }
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}