import { ReactNode, useEffect, useRef, useState } from "react"
import styles from "../styles/PitchDisplay.module.css"
import wordjson from "../public/words.json"
import { WordMap, WordMapEntry } from "../types";

type CurrentWordProps = {
  word: string
  translation: string
  wordmapsubset: WordMap
}

function CurrentWord(
  {
    word,
    translation,
    wordmapsubset
  }: CurrentWordProps 
){
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) {
      return
    }
    const wordmapentry = wordmapsubset.get(word)
    if (wordmapentry !== undefined) { 
      plotCard(wordmapentry.moras, wordmapentry.pitches, canvas)
    }
  }, [word])

  function plotCard(word: Array<string>, pitches: Array<number>, cvs: HTMLCanvasElement) {
    var ctx = cvs.getContext("2d");
    if (ctx === null) {
      return
    }
    let mql = window.matchMedia('(prefers-color-scheme: dark)');
    let fg: string;
    let bg: string;
    if (mql.matches) {
      fg = "#ccc"
      bg = "#171717"
    }
    else {
      fg = "#171717"
      bg = "#ccc"
    }
    const moraCount = word.length;
    // cvs.width = moraCount > 9 ? 1.5 * 1200 : 1200;
    // cvs.height = moraCount > 9 ? 1.5 * 800 : 800;
    const spacing = 120;
    const barwidth = 12;
    const radius = 55;
    const circleLineWidth = 10;
    const margin = (radius+circleLineWidth/2) - (barwidth/2);
    cvs.height = 800
    cvs.width = (moraCount-1)*spacing + moraCount*barwidth + 2*margin;
    const maxPitchHeight = 
    ( cvs.height 
      - (radius + circleLineWidth) 
      - 25 //base bar
      - 100 //font
      - 40 //font padding
    );
    // const totalWidth = (1 - moraCount) * spacing;
    ctx.save();
    ctx.translate(0, maxPitchHeight + radius + circleLineWidth);
    ctx.fillStyle = fg;
    ctx.fillRect(margin, 0, (moraCount - 1) * (spacing + barwidth) + barwidth, 25);
    for (var i = 0; i < moraCount; i++) {
      let height = - (pitches[i] * maxPitchHeight);
      let xpos = i*spacing + i*barwidth + margin;
      ctx.fillStyle = fg;
      if (word[i].length === 2) {
        ctx.font = "80px Helvetica";
        ctx.fillText(word[i], xpos + barwidth/2 - 50, 150, radius * 2.3);
      }
      else {
        ctx.font = "80px Helvetica";
        ctx.fillText(word[i], xpos + barwidth/2 - 40, 150, radius * 2.3);
      }
      ctx.fillRect(xpos, 0, barwidth, height);
      ctx.beginPath();
      ctx.arc(xpos + barwidth / 2, height, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.lineWidth = circleLineWidth;
      ctx.strokeStyle = fg;
      ctx.stroke();
    }
    ctx.restore();
  }
  return (
    <div className={styles.currentWord}>
      {/* <div className={styles.japanese}>{word}</div> */}
      <canvas className={styles.maruPlot} ref={canvasRef}/>
      <div className={styles.english}>{translation}</div>
    </div>
  )
}

type Props = {
  words: Array<string>
  translations: Array<string>
  wordmap: WordMap
}

export default function PitchDisplay(
  {
    words,
    translations,
    wordmap
  }: Props
) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const wordHandleClick = (i: number) => {
    setCurrentWordIndex(i)
  }

  const wordList = words.map((word, i) => {
    let className = styles.clickableWord;
    if (word === words[currentWordIndex]) {
      className += " " + styles.current
    }
    return (
    <div 
      className={className}
      onClick={e => wordHandleClick(i)}
    >
      {word}
    </div>
    )
  })

  const wordMapSubset = words.reduce((acc, cur) => {
    const entry = wordmap.get(cur)
    if (entry !== undefined) {
      acc.set(cur, entry)
    }
    return acc
  }, new Map<string, WordMapEntry>())


  return (
    <div className={styles.pitchDisplay}>
      <CurrentWord 
        word={words[currentWordIndex]}
        translation={translations[currentWordIndex]}
        wordmapsubset={wordMapSubset}
      />
      <div className={styles.wordList}>
        {wordList}
      </div>
    </div>
  )
  
}
