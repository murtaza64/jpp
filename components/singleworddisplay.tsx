import React, { ReactNode, useEffect, useRef, useState } from "react"
import styles from "../styles/PitchDisplay.module.css"
import wordjson from "../public/words.json"
import { WordMap, WordMapEntry } from "../wordMap";
import { json } from "stream/consumers";
import { JsxElement, JsxText } from "typescript";

function getCssProperty(property: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(property);
}

type Props = {
    word: string
    wordmap: WordMap
  }
  function CurrentWord(
    {
      word,
      wordmap
    }: Props 
  ){
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current
      if (canvas === null) {
        return
      }
      const wordmapentry = wordmap.get(word)
      if (wordmapentry !== undefined) { 
        plotCard(wordmapentry, canvas)
      }
    }, [word])
  
    function plotCard(entry: WordMapEntry, cvs: HTMLCanvasElement) {
      const word = entry.moras;
      const pitches = entry.pitches;
      const peak = entry.peak;
      const ctx = cvs.getContext("2d");
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
      const blue = getCssProperty("--blue");
      const moraCount = word.length;
      // cvs.width = moraCount > 9 ? 1.5 * 1200 : 1200;
      // cvs.height = moraCount > 9 ? 1.5 * 800 : 800;
      const spacing = 120;
      const barwidth = 12;
      const radius = 55;
      const circleLineWidth = 10;
      const margin = (radius+circleLineWidth/2) - (barwidth/2);
      cvs.height = 600
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
        const height = - (pitches[i] * maxPitchHeight);
        const xpos = i*spacing + i*barwidth + margin;
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
        if (i == peak) {
          ctx.fillStyle = blue;
        }
        ctx.fill();
        ctx.lineWidth = circleLineWidth;
        ctx.strokeStyle = fg;
        ctx.stroke();
      }
      ctx.restore();
    }
    return (
      <div
        className={styles.singleCurrentWord}
      >
        {/* <div className={styles.japanese}>{word}</div> */}
        <canvas className={styles.maruPlot} ref={canvasRef}/>
        <div className={styles.english}>{wordmap.get(word)?.english}</div>
      </div>
    )
  }

export default function SingleWordDisplay(
    {
      word,
      wordmap
    }: Props
  ) {

    const wordHandleClick = () => {
      const entry = wordmap.get(word)
      if (entry !== undefined) {
        console.log("/audio/" + entry.category + "/" + word + ".wav");
        const audio = new Audio("/audio/" + entry.category + "/" + word + ".wav");
        audio.play();
      }
    }

    return (
      <div 
        className={styles.singleWordDisplay}
        onClick={e => wordHandleClick()}
      >
        <CurrentWord 
          word = {word}
          wordmap={wordmap}
        />
      </div>
    )
  
  }