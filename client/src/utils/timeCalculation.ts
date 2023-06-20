export enum RetentionUnits {
  Minutes = "minutes",
  Hours = "hours",
  Days = "days",
}

export const calcRetention = (time: number, unit: RetentionUnits) => {
  let retention = 0;
  switch (unit) {
    case RetentionUnits.Minutes:
      retention = time * 60 * 1000;
      break;
    case RetentionUnits.Hours:
      retention = time * 60 * 60 * 1000;
      break;
    case RetentionUnits.Days:
      retention = time * 24 * 60 * 60 * 1000;
      break;
    default:
      retention = 0;
  }
  return retention;
};
