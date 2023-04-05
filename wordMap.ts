import { readFileSync } from "fs"

export type WordMapEntry = {
  moras: Array<string>
  pitches: Array<number>
  english: string
  peak: number
  category: string
  furiganaMap: Array<[string, string]>
}

export type WordMap = Map<string, WordMapEntry>

export default function parseWords(path="public/words.txt") : WordMap {
  let map: WordMap = new Map<string, WordMapEntry>()
  const data = readFileSync(path, {encoding: "utf-8"})
  data.split("ーーー")
    .map((s) => s.trim().split("\n"))
    .filter((s) => s.length > 1)
    .forEach((item) => {
      const word = item[0]
      const moras = item[1].split("・")
      const peak = item[2].split(/\s+/).findIndex((v) => v[v.length-1] == "^")
      const pitches = item[2].split(/\s+/).map((v) => {
        if (v[v.length-1] == "^")
          return parseFloat(v.slice(0, -1))
        else
          return parseFloat(v)
      })
      if (moras.length != pitches.length) {
        throw new Error("error parsing words: pitches length not equal to moras length for " + word)
      }
      const english = item[3]
      const category = item[4]
      const furiganaMap = item.slice(5).map((row) => {
        const split = row.split("・", 2)
        let t: [string, string]
        if (split.length == 2) {
           t = [split[0], split[1]]
        }
        else {
          throw new Error("error parsing words: furigana map format for " + word)
        }
        return t
      })
      map.set(word, {
        moras,
        pitches,
        english,
        peak,
        category,
        furiganaMap
      })
    })
  return map
}