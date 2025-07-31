import { Day, Scene } from './Enums';

export class Slot {
  id: string;
  day: Day;
  start: Date;
  end: Date;
  scene: Scene;
  band: string;
  isFavorite: boolean = false;

  constructor(
    id: string,
    day: Day,
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

  public static fromJSON(data: unknown): Slot {
    typeof data == 'object';
    const slot = data as Slot;

    return new Slot(
      slot.id,
      slot.day,
      new Date(slot.start),
      new Date(slot.end),
      slot.scene,
      slot.band,
      slot.isFavorite
    );
  }
}

export const slotsBaseList: Slot[] = [
  new Slot(
    'id1',
    Day.JEUDI,
    new Date('2025-10-05T10:00:00'),
    new Date('2023-10-05T11:00:00'),
    Scene.DM,
    'bandAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  ),
  new Slot(
    'id2',
    Day.VENDREDI,
    new Date('2025-10-05T11:00:00'),
    new Date('2023-10-05T12:00:00'),
    Scene.DM,
    'bandB'
  ),
  new Slot(
    'id3',
    Day.VENDREDI,
    new Date('2025-10-05T11:00:00'),
    new Date('2023-10-05T12:00:00'),
    Scene.BD,
    'bandC'
  ),
  new Slot(
    'id4',
    Day.SAMEDI,
    new Date('2025-11-05T11:00:00'),
    new Date('2023-11-05T12:00:00'),
    Scene.BD,
    'bandD'
  ),
  new Slot(
    'id2',
    Day.VENDREDI,
    new Date('2025-10-05T11:00:00'),
    new Date('2023-10-05T12:00:00'),
    Scene.DM,
    'bandB'
  ),
  new Slot(
    'id3',
    Day.VENDREDI,
    new Date('2025-10-05T11:00:00'),
    new Date('2023-10-05T12:00:00'),
    Scene.BD,
    'bandC'
  ),
  new Slot(
    'id4',
    Day.SAMEDI,
    new Date('2025-11-05T11:00:00'),
    new Date('2023-11-05T12:00:00'),
    Scene.SS,
    'bandD'
  ),
  new Slot(
    'id2',
    Day.VENDREDI,
    new Date('2025-10-05T11:00:00'),
    new Date('2023-10-05T12:00:00'),
    Scene.MF,
    'bandB'
  ),
  new Slot(
    'id3',
    Day.VENDREDI,
    new Date('2025-10-05T11:00:00'),
    new Date('2023-10-05T12:00:00'),
    Scene.BD,
    'bandC'
  ),
  new Slot(
    'lastBand',
    Day.SAMEDI,
    new Date('2025-11-05T11:00:00'),
    new Date('2023-11-05T12:00:00'),
    Scene.BD,
    'LAST BAND'
  ),
];
