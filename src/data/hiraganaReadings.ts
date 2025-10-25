// Hiragana readings for kanji characters (for the quiz after capture)
export const hiraganaReadings: Record<string, { correct: string; distractors: string[] }> = {
  // Starters
  'kanji-fire': { correct: 'ひ', distractors: ['み', 'き', 'り'] },
  'kanji-water': { correct: 'みず', distractors: ['ひ', 'き', 'かぜ'] },
  'kanji-tree': { correct: 'き', distractors: ['ひ', 'みず', 'つき'] },
  
  // Numbers
  'kanji-one': { correct: 'いち', distractors: ['に', 'さん', 'し'] },
  'kanji-two': { correct: 'に', distractors: ['いち', 'さん', 'し'] },
  'kanji-three': { correct: 'さん', distractors: ['に', 'よん', 'ご'] },
  'kanji-ten': { correct: 'じゅう', distractors: ['きゅう', 'はち', 'なな'] },
  
  // Family
  'kanji-person': { correct: 'ひと', distractors: ['はは', 'ちち', 'こ'] },
  'kanji-mother': { correct: 'はは', distractors: ['ちち', 'こ', 'ひと'] },
  'kanji-father': { correct: 'ちち', distractors: ['はは', 'こ', 'あに'] },
  'kanji-child': { correct: 'こ', distractors: ['はは', 'ちち', 'あね'] },
  
  // Food
  'kanji-rice': { correct: 'こめ', distractors: ['にく', 'さかな', 'みず'] },
  'kanji-meat': { correct: 'にく', distractors: ['こめ', 'さかな', 'たべる'] },
  'kanji-fish': { correct: 'さかな', distractors: ['にく', 'こめ', 'みず'] },
  
  // Nature
  'kanji-mountain': { correct: 'やま', distractors: ['かわ', 'うみ', 'もり'] },
  'kanji-river': { correct: 'かわ', distractors: ['やま', 'うみ', 'はな'] },
  'kanji-flower': { correct: 'はな', distractors: ['き', 'やま', 'かわ'] },
  'kanji-forest': { correct: 'もり', distractors: ['やま', 'き', 'はな'] },
  
  // Emotions
  'kanji-love': { correct: 'あい', distractors: ['いかり', 'たのしい', 'かなしい'] },
  'kanji-anger': { correct: 'いかり', distractors: ['あい', 'たのしい', 'よろこび'] },
  'kanji-joy': { correct: 'たのしい', distractors: ['あい', 'いかり', 'かなしい'] },
  
  // Actions
  'kanji-see': { correct: 'みる', distractors: ['あるく', 'はしる', 'たべる'] },
  'kanji-walk': { correct: 'あるく', distractors: ['みる', 'はしる', 'のむ'] },
  'kanji-run': { correct: 'はしる', distractors: ['あるく', 'みる', 'とぶ'] },
  
  // Transport
  'kanji-car': { correct: 'くるま', distractors: ['でんしゃ', 'ふね', 'ひこうき'] },
  'kanji-vehicle': { correct: 'のる', distractors: ['くるま', 'でんしゃ', 'あるく'] },
  
  // Weather
  'kanji-rain': { correct: 'あめ', distractors: ['ゆき', 'そら', 'かぜ'] },
  'kanji-snow': { correct: 'ゆき', distractors: ['あめ', 'そら', 'こおり'] },
  'kanji-sky': { correct: 'そら', distractors: ['あめ', 'ゆき', 'くも'] },
  
  // Body
  'kanji-hand': { correct: 'て', distractors: ['め', 'くち', 'あし'] },
  'kanji-eye': { correct: 'め', distractors: ['て', 'くち', 'あたま'] },
  'kanji-mouth': { correct: 'くち', distractors: ['て', 'め', 'はな'] },
  
  // Colors
  'kanji-red': { correct: 'あか', distractors: ['あお', 'しろ', 'くろ'] },
  'kanji-blue': { correct: 'あお', distractors: ['あか', 'しろ', 'くろ'] },
  'kanji-white': { correct: 'しろ', distractors: ['くろ', 'あか', 'あお'] },
  'kanji-black': { correct: 'くろ', distractors: ['しろ', 'あか', 'あお'] },
  
  // Time
  'kanji-day': { correct: 'ひ', distractors: ['つき', 'とし', 'いま'] },
  'kanji-month': { correct: 'つき', distractors: ['ひ', 'とし', 'いま'] },
  'kanji-year': { correct: 'とし', distractors: ['ひ', 'つき', 'いま'] },
  'kanji-now': { correct: 'いま', distractors: ['ひ', 'つき', 'とし'] }
};

export function getQuizOptions(kanjiId: string): string[] {
  const reading = hiraganaReadings[kanjiId];
  if (!reading) return [];
  
  const options = [reading.correct, ...reading.distractors];
  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
}

export function getCorrectReading(kanjiId: string): string {
  return hiraganaReadings[kanjiId]?.correct || '';
}
