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

type CurrentWordProps = {
  word: string
  wordmapsubset: WordMap
}

type RecorderProps = {
  word: string
}

function StudentAttempt(
  { 
    word
  }: RecorderProps
) {
  const mimeType = "audio/webm";
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState("");
  const [permissionRejected, setPermissionRejected] = useState(false);
  const feedbackBox = useRef<HTMLDivElement>(null);
  const [feedbackBoxContent, setFeedbackBoxContent] = useState<string>("Try it yourself!");

  const getMediaPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });
        setPermission(true);
        setPermissionRejected(false);
        setStream(streamData);

      }
      catch (e) {
        console.log("permission rejected")
        setPermissionRejected(true);
      }
    } else {
        alert("The MediaRecorder API is not supported in your browser.");
    }
  }

  const micButtonClick = async () => {
    if (!permission) {
      getMediaPermission();
    }
    else if (recordingStatus === "inactive") {
      startRecording();
    }
    else {
      stopRecording();
    }
  };

  const startRecording = async () => {
    //create new Media recorder instance using the stream
    if (stream === undefined) {
      return
    }
    setRecordingStatus("recording");
    console.log("recording")
    const media = new MediaRecorder(stream, { mimeType: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    //stops the recording instance
    if (mediaRecorder.current === null) {
      return
    }
    setRecordingStatus("inactive");
    console.log("stop recording")
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const reader = new FileReader();
      reader.addEventListener("loadend", async () => {
        // reader.result contains the contents of blob as a typed array
        console.log(reader.result);
        const response = await fetch("http://localhost:5000/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            "word": word,
            "audio": reader.result
          })
        });
        const result = await response.json();
        console.log(result);
        const roundedScore = Math.round(result["score"]);
        setFeedbackBoxContent("Score: " + roundedScore.toString());
      });
      reader.readAsDataURL(audioBlob);

      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      console.log(audioUrl);
    };
  };

  let buttonClassName = styles.recordButton;
  if (recordingStatus === "recording") {
    buttonClassName += " " + styles.recording
  }

  // getMediaPermission();

  return (
    <div className={styles.studentAttempt}>
      <button onClick={micButtonClick} className={buttonClassName}> <img src="/mic.svg" width="20px" height="20px"/> </button>
      { permissionRejected? (
        <div className={styles.feedbackBox}> To try it yourself, you need to provide mic access </div>
      ) : (
        <div className={styles.feedbackBox} ref={feedbackBox}> {feedbackBoxContent} </div>)
      }

      {/* {audio ? (
        <audio src={audio} controls></audio>
      ) : null} */}
    </div>
  )
}

function CurrentWord(
  {
    word,
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
    <div className={styles.currentWord}>
      {/* <div className={styles.japanese}>{word}</div> */}
      <canvas className={styles.maruPlot} ref={canvasRef}/>
      <div className={styles.english}>{wordmapsubset.get(word)?.english}</div>
      <StudentAttempt
        word={word}
      />
    </div>
  )
}

type Props = {
  words: Array<string>
  wordmap: WordMap
}

export default function PitchDisplay(
  {
    words,
    wordmap
  }: Props
) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const wordHandleClick = (i: number) => {
    setCurrentWordIndex(i)
    const entry = wordMapSubset.get(words[i]);
    if (entry !== undefined) {
      const audio = new Audio("/audio/" + entry.category + "/" + words[i] + ".wav");
      audio.play();
    }
  }

  const generateFurigana = (word: string) => (
    <ruby>
    {word.split("").map((ch, i) => {
      const reading = wordmap.get(word)?.furiganaMap.find((r) => r[0] == ch)?.[1];
      if (reading !== undefined) {
        return (
          <React.Fragment key={i}>
            {ch}<rt>{reading}</rt>
          </React.Fragment>
        )
      }
      else {
        return (
          <React.Fragment key={i}>
            {ch}
          </React.Fragment>
        )
      }
    })}
    </ruby>
  )

  const wordList = words.map((word, i) => {
    let className = styles.clickableWord;
    if (word === words[currentWordIndex]) {
      className += " " + styles.current
    }
    return (
    <div
      key={i}
      className={className}
      onClick={e => wordHandleClick(i)}
    >
      {generateFurigana(word)}
    </div>
    )
  })

  const wordMapSubset = words.reduce((acc, cur) => {
    const entry = wordmap.get(cur)
    if (entry !== undefined) {
      acc.set(cur, entry)
    }
    else {
      console.warn("No wordmap entry for " + cur)
    }
    return acc
  }, new Map<string, WordMapEntry>())


  return (
    <div className={styles.pitchDisplay}>
      <CurrentWord 
        word={words[currentWordIndex]}
        wordmapsubset={wordMapSubset}
      />
      <div className={styles.wordList}>
        {wordList}
      </div>
    </div>
  )
  
}
