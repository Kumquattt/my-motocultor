export enum Scene {
  DM = 'Dave Mustage',
  SS = 'Suppositor Stage',
  MF = 'Massey Ferguscene',
  BD = 'Bruce Dickinscene',
}

export enum Day {
  JEUDI = 'Jeudi', //'Thursday',
  VENDREDI = 'Vendredi', //'Friday',
  SAMEDI = 'Samedi', //'Saturday',
  DIMANCHE = 'Dimanche', //'Sunday',
}

export const slotsPerDay: Map<Day, number> = new Map([
  [Day.JEUDI, 5],
  [Day.VENDREDI, 8],
  [Day.SAMEDI, 8],
  [Day.DIMANCHE, 8],
]);
