export enum Scene {
  DM = 'Dave Mustage',
  MF = 'Massey Ferguscene',
  BD = 'Bruck Dickinscene',
  SS = 'Suppositor Stage',
}

export enum Day {
  JEUDI = 'Thursday',
  VENDREDI = 'Friday',
  SAMEDI = 'Saturday',
  DIMANCHE = 'Sunday',
}

export const slotsPerDay: Map<Day, number> = new Map([
    [Day.JEUDI, 5],
    [Day.VENDREDI, 8],
    [Day.SAMEDI, 8],
    [Day.DIMANCHE, 8],
])
