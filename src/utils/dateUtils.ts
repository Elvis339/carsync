export const addFiveMinutesToDate = (): Date => {
  let date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  date = new Date(date);
  return date;
};

export const hasFiveMinutesPassed = (dateToCompare: Date): boolean => {
  const fiveMinutesInUnix = 5 * 60;
  const currentUnix = Math.floor(new Date().getTime() / 1000);

  return currentUnix - Math.floor(dateToCompare.getTime() / 1000) > fiveMinutesInUnix;
};
