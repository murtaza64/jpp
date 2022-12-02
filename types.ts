export type WordMapEntry = {
  moras: Array<string>
  pitches: Array<number>
  english: string
  peak: number
  audio: string
}

export type WordMap = Map<string, WordMapEntry>