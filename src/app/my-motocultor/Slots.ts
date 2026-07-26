import { Day, Scene } from './Enums';
export class SlotJSON2025 {
  id: string;
  day: Day;
  start: Date;
  end: Date;
  scene: Scene;
  band: string;
  isPurple: boolean = false;

  constructor(
    id: string,
    day: Day,
    start: Date,
    end: Date,
    scene: Scene,
    band: string,
  ) {
    this.id = id;
    this.day = day;
    this.start = start;
    this.end = end;
    this.scene = scene;
    this.band = band;
  }
}

export class SlotJSON {
  id: string;
  day: Day;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  scene: Scene;
  band: string;
  isOdd: boolean = false;

  constructor(
    id: string,
    day: Day,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
    scene: Scene,
    band: string,
  ) {
    this.id = id;
    this.day = day;
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.endHour = endHour;
    this.endMinute = endMinute;
    this.scene = scene;
    this.band = band;
  }
}

export class Slot extends SlotJSON {
  isEven: boolean = true;
  isFavorite: boolean = false;

  public static initializeFromJson(jsonSlot: SlotJSON): Slot {
    return { ...jsonSlot, isEven: true, isFavorite: false };
  }
}

export class SlotTime {
  hour: number = 0;
  minute: number = 0;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }
}
