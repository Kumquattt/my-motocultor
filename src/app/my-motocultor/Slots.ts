import { Scene } from './Enums';

export class Slot {
  id: string;
  day: string;
  start: Date;
  end: Date;
  scene: Scene;
  band: string;
  isFavorite: boolean = false;

  constructor(
    id: string,
    day: string,
    start: Date,
    end: Date,
    scene: Scene,
    band: string,
    isFavorite: boolean = false
  ) {
    this.id = id;
    this.day = day;
    this.start = start;
    this.end = end;
    this.scene = scene;
    this.band = band;
    this.isFavorite = isFavorite;
  }
}

const slots = [
  new Slot(
    'id1',
    'jeudi',
    new Date('2025-10-05T10:00:00'),
    new Date('2023-10-05T11:00:00'),
    Scene.DM,
    'bandA'
  ),
  new Slot(
    'id2',
    'vendredi',
    new Date('2025-10-05T11:00:00'),
    new Date('2023-10-05T12:00:00'),
    Scene.DM,
    'bandB'
  ),
  new Slot(
    'id3',
    'vendredi',
    new Date('2025-10-05T11:00:00'),
    new Date('2023-10-05T12:00:00'),
    Scene.BD,
    'bandC'
  ),
];

export default slots;
