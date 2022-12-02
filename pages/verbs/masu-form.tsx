import Head from 'next/head'
import PitchDisplay from '../../components/pitchdisplay'
import { WordMap, WordMapEntry } from '../../types'
import wordlist from "../../public/words.json"
import styles from "../../styles/Content.module.css"

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
        words={[
          "起きます", "行きます", "飲みます", "勉強します", "寝ます", "帰ります", "読みます",
          "食べます", "買います", "来ます", "見ます", "聞きます", "します"
        ]}
        wordmap={wordmap}
      />
      <div className={styles.warning}>
        Some people extend the ま sound when trying to pronounce the 
        pitch drop, but this isn't correct. All syllables (also called Mora) should 
        stay the same length.
      </div>

      <div className={styles.languageNote}>
        The location where the pitch drops from high to low — we call
        it “an accent drop,” “downstep,” or linguistically “accent nucleus” — is
        extremely important to know to sound like a native speaker. Knowing where to
        drop the pitch will make you easier to understand, and sound more natural!
      </div>
      <br/><br/>
      <h2> Negative </h2>
      <p>
        Negative, or 〜ません ending form is pronounced similar to the Affirmative
        〜ます form above, however the drop is after せ. This pattern is the same for 
        all verbs in 〜ません form.
      </p>
      <PitchDisplay 
        words={["行きません"]}
        wordmap={wordmap}
      />
      <div className={styles.languageNote}>
        The 〜ません form expresses either "someone won't do", or "doesn't do". This
        depends on the context of the sentence. To form a command, e.g. "don't do",
        please refer to 〜ないで.
      </div>

      <h2> Question </h2>
      <p>
        Questions follow the same rule as the Affrimative (dropping sharply after ま),
        except the pitch at the end of the sentence rises again at か. All other parts
        sound the same as the regular ます ending explained above.
      </p>
      <PitchDisplay 
        words={["行きますか"]}
        wordmap={wordmap}
      />
      <div className={styles.warning}>
        The か sound is a gradual rise, not a sharp rise. This can be seen in the graph
        below shown by the curve going from low to high. All questions follow this pattern!
        This is also different from an English question where the pitch climbs across the
        whole word, in Japanese only the pitch of か rises.
      </div>

      <h2> Past </h2>
      <p>
        Hopefully you're starting to pick up on the pattern that ます stem patterns follow. For
        past tense 〜ました the pattern continues, the drop also occurs after ま. Keep repeating
        the samples below until you get the hang of it!
      </p>
      <PitchDisplay 
        words={["浴びました"]}
        wordmap={wordmap}
      />
      <div className={styles.languageNote}>
        Past tense questions are formed the exact same way as with regular questions, just by
        adding on a か with a gradual pitch rise like explained above!
      </div>
      <div className={styles.languageNote}>
        Some of the examples, like デートします are actually a compound of a noun (デート) and the
        verb する (します). The pitch of noun part of the compound verb depends on the noun.
        You can read more about this on the Chinese Noun 2+2 page. For now, just practice the verbs above. 
      </div>

      <h2> Negative Past </h2>
      <p>
        The last ます stem form is the conjugation for negative past tense 〜ませんでした. The drop
        occurs in the same spot as the negative form, right after せ.
      </p>
      <p>
        Congrats! Practice the above rules and you'll be a <i>Japanese Pronounciation Pro</i> before
        you know it!
      </p>
      <PitchDisplay
        words={["浴びませんでした"]}
        wordmap={wordmap}
      />
    </> 
  )
}

export function getServerSideProps() {
  const fullWordMap = new Map<string, WordMapEntry>()
  for (const entry of wordlist) {
    fullWordMap.set(entry.word, {
      "pitches": entry.pitches,
      "moras": entry.moras,
      "english": entry.english,
      "peak": entry.peak,
      "audio": entry.audio
    })
  }
  // const reducedWordMap = new Map<string, WordMapEntry>()
  // for (const word of allWords) {
  //   reducedWordMap.set(word, fullWordMap.get(word));
  // }
  return {"props": {wordmaplist: Array.from(fullWordMap)}}
}