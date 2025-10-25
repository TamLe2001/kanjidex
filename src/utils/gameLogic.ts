import type { KanjiCharacter, AttackMove } from '../types';

export function calculateDamage(
  attacker: KanjiCharacter,
  defender: KanjiCharacter,
  move: AttackMove
): number {
  // Basic damage calculation with significantly reduced power for longer battles
  const attackPower = attacker.attack;
  const defense = defender.defense;
  const movePower = move.power;
  
  // Type effectiveness (simplified - same type bonus)
  const typeBonus = attacker.type === move.type ? 1.2 : 1.0;
  
  // Random factor (0.85 to 1.0)
  const randomFactor = 0.85 + Math.random() * 0.15;
  
  // Significantly reduced damage formula - battles should take 3-5 hits
  const baseDamage = ((attackPower * movePower) / (defense * 4)) * 0.3;
  const finalDamage = Math.floor(baseDamage * typeBonus * randomFactor);
  
  return Math.max(1, finalDamage);
}

export function gainExp(kanji: KanjiCharacter, expGained: number): KanjiCharacter {
  const updatedKanji = { ...kanji };
  updatedKanji.currentExp += expGained;
  
  // Level up if enough exp
  while (updatedKanji.currentExp >= updatedKanji.expToNextLevel) {
    updatedKanji.currentExp -= updatedKanji.expToNextLevel;
    updatedKanji.level += 1;
    
    // Stat increases on level up
    const hpIncrease = Math.floor(Math.random() * 5) + 3;
    const attackIncrease = Math.floor(Math.random() * 3) + 2;
    const defenseIncrease = Math.floor(Math.random() * 3) + 2;
    const speedIncrease = Math.floor(Math.random() * 3) + 2;
    
    updatedKanji.maxHp += hpIncrease;
    updatedKanji.currentHp = updatedKanji.maxHp;
    updatedKanji.attack += attackIncrease;
    updatedKanji.defense += defenseIncrease;
    updatedKanji.speed += speedIncrease;
    
    // Increase exp needed for next level
    updatedKanji.expToNextLevel = Math.floor(updatedKanji.expToNextLevel * 1.2);
  }
  
  return updatedKanji;
}

export function healKanji(kanji: KanjiCharacter, amount: number): KanjiCharacter {
  return {
    ...kanji,
    currentHp: Math.min(kanji.maxHp, kanji.currentHp + amount)
  };
}

export function fullHealKanji(kanji: KanjiCharacter): KanjiCharacter {
  return {
    ...kanji,
    currentHp: kanji.maxHp
  };
}

export function isFainted(kanji: KanjiCharacter): boolean {
  return kanji.currentHp <= 0;
}

export function calculateCaptureRate(wildKanji: KanjiCharacter): number {
  // Capture rate based on HP remaining
  const hpPercent = wildKanji.currentHp / wildKanji.maxHp;
  
  // Lower HP = higher capture rate
  // At full HP: ~20% capture rate
  // At 50% HP: ~40% capture rate
  // At 10% HP: ~80% capture rate
  const baseRate = 1 - (hpPercent * 0.8);
  
  return Math.min(0.95, Math.max(0.15, baseRate));
}

export function attemptCapture(wildKanji: KanjiCharacter): boolean {
  const captureRate = calculateCaptureRate(wildKanji);
  return Math.random() < captureRate;
}

export function getRandomWildKanji(
  kanjiPool: KanjiCharacter[],
  learnerLevel: number
): KanjiCharacter {
  // Select a random Kanji from the pool
  const randomIndex = Math.floor(Math.random() * kanjiPool.length);
  const baseKanji = kanjiPool[randomIndex];
  
  // Adjust level based on learner level
  const wildLevel = Math.max(1, learnerLevel - 2 + Math.floor(Math.random() * 5));
  
  // Create a copy with adjusted stats
  const wildKanji = { ...baseKanji };
  wildKanji.level = wildLevel;
  
  // Scale stats based on level
  const levelDiff = wildLevel - 5; // Base level is 5
  if (levelDiff !== 0) {
    wildKanji.maxHp += levelDiff * 3;
    wildKanji.currentHp = wildKanji.maxHp;
    wildKanji.attack += levelDiff * 2;
    wildKanji.defense += levelDiff * 2;
    wildKanji.speed += levelDiff * 2;
  }
  
  return wildKanji;
}
