import type { AttackMove, KanjiType } from '../types';

export const attackMoves: AttackMove[] = [
  // Number type moves
  {
    id: 'count-strike',
    name: 'Count Strike',
    power: 40,
    type: 'Number',
    description: 'A precise numerical attack'
  },
  {
    id: 'infinity-barrage',
    name: 'Infinity Barrage',
    power: 60,
    type: 'Number',
    description: 'Endless numbers rain down'
  },
  
  // Family type moves
  {
    id: 'family-bond',
    name: 'Family Bond',
    power: 45,
    type: 'Family',
    description: 'The power of family connections'
  },
  {
    id: 'ancestral-wisdom',
    name: 'Ancestral Wisdom',
    power: 55,
    type: 'Family',
    description: 'Ancient family knowledge empowers the attack'
  },
  
  // Food type moves
  {
    id: 'rice-rocket',
    name: 'Rice Rocket',
    power: 50,
    type: 'Food',
    description: 'Launch grains at high speed'
  },
  {
    id: 'sushi-slash',
    name: 'Sushi Slash',
    power: 65,
    type: 'Food',
    description: 'A sharp culinary cut'
  },
  
  // Nature type moves
  {
    id: 'tree-tackle',
    name: 'Tree Tackle',
    power: 55,
    type: 'Nature',
    description: 'Charging with the force of nature'
  },
  {
    id: 'mountain-crush',
    name: 'Mountain Crush',
    power: 70,
    type: 'Nature',
    description: 'The weight of mountains'
  },
  {
    id: 'flower-petal-storm',
    name: 'Flower Petal Storm',
    power: 45,
    type: 'Nature',
    description: 'Beautiful but deadly petals'
  },
  
  // Emotion type moves
  {
    id: 'joy-burst',
    name: 'Joy Burst',
    power: 50,
    type: 'Emotion',
    description: 'Overwhelming happiness explodes'
  },
  {
    id: 'rage-impact',
    name: 'Rage Impact',
    power: 65,
    type: 'Emotion',
    description: 'Pure anger unleashed'
  },
  {
    id: 'love-beam',
    name: 'Love Beam',
    power: 40,
    type: 'Emotion',
    description: 'A warm ray of affection'
  },
  
  // Action type moves
  {
    id: 'swift-strike',
    name: 'Swift Strike',
    power: 45,
    type: 'Action',
    description: 'A quick decisive action'
  },
  {
    id: 'power-slam',
    name: 'Power Slam',
    power: 60,
    type: 'Action',
    description: 'Forceful impact'
  },
  
  // Elemental type moves
  {
    id: 'fire-blast',
    name: 'Fire Blast',
    power: 70,
    type: 'Elemental',
    description: 'Intense flames engulf the target'
  },
  {
    id: 'water-wave',
    name: 'Water Wave',
    power: 55,
    type: 'Elemental',
    description: 'Crashing waves attack'
  },
  {
    id: 'earth-quake',
    name: 'Earth Quake',
    power: 65,
    type: 'Elemental',
    description: 'The ground shakes violently'
  },
  {
    id: 'wind-gust',
    name: 'Wind Gust',
    power: 50,
    type: 'Elemental',
    description: 'Strong winds blow'
  },
  
  // Transport type moves
  {
    id: 'vehicle-rush',
    name: 'Vehicle Rush',
    power: 60,
    type: 'Transport',
    description: 'High-speed collision'
  },
  {
    id: 'train-slam',
    name: 'Train Slam',
    power: 75,
    type: 'Transport',
    description: 'Unstoppable like a train'
  },
  
  // Clothing type moves
  {
    id: 'fabric-whip',
    name: 'Fabric Whip',
    power: 45,
    type: 'Clothing',
    description: 'Lashing cloth attack'
  },
  {
    id: 'silk-bind',
    name: 'Silk Bind',
    power: 35,
    type: 'Clothing',
    description: 'Wraps and restricts the opponent'
  },
  
  // Weather type moves
  {
    id: 'thunder-strike',
    name: 'Thunder Strike',
    power: 75,
    type: 'Weather',
    description: 'Lightning crashes down'
  },
  {
    id: 'snow-storm',
    name: 'Snow Storm',
    power: 60,
    type: 'Weather',
    description: 'Blizzard of ice and snow'
  },
  {
    id: 'rain-shower',
    name: 'Rain Shower',
    power: 40,
    type: 'Weather',
    description: 'Heavy rain pounds down'
  },
  
  // Body type moves
  {
    id: 'body-slam',
    name: 'Body Slam',
    power: 65,
    type: 'Body',
    description: 'Full body collision'
  },
  {
    id: 'headbutt',
    name: 'Headbutt',
    power: 50,
    type: 'Body',
    description: 'A powerful head strike'
  },
  {
    id: 'kick-combo',
    name: 'Kick Combo',
    power: 55,
    type: 'Body',
    description: 'Multiple swift kicks'
  },
  
  // Color type moves
  {
    id: 'rainbow-burst',
    name: 'Rainbow Burst',
    power: 60,
    type: 'Color',
    description: 'All colors explode'
  },
  {
    id: 'shadow-strike',
    name: 'Shadow Strike',
    power: 70,
    type: 'Color',
    description: 'Dark energy attack'
  },
  {
    id: 'light-beam',
    name: 'Light Beam',
    power: 55,
    type: 'Color',
    description: 'Brilliant light ray'
  },
  
  // Time type moves
  {
    id: 'time-warp',
    name: 'Time Warp',
    power: 50,
    type: 'Time',
    description: 'Distorts time around the target'
  },
  {
    id: 'chronos-blast',
    name: 'Chronos Blast',
    power: 65,
    type: 'Time',
    description: 'The power of ages'
  },
  {
    id: 'moment-strike',
    name: 'Moment Strike',
    power: 45,
    type: 'Time',
    description: 'An instant precise attack'
  }
];

export function getAttackMoveById(id: string): AttackMove | undefined {
  return attackMoves.find(move => move.id === id);
}

export function getAttackMovesByType(type: KanjiType): AttackMove[] {
  return attackMoves.filter(move => move.type === type);
}
