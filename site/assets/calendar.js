/** Gregorian calendar codes, matching Otter Day's Date entity. Sunday = 0. */
export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthCodes = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
export const isLeapYear = (year) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
export function calendarCodes(year, month, day) {
  if (
    ![year, month, day].every(Number.isInteger) ||
    year < 1 ||
    year > 9999 ||
    month < 1 ||
    month > 12
  )
    throw new RangeError("Invalid date");
  const days = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if (day < 1 || day > days[month - 1]) throw new RangeError("Invalid date");
  const century = [0, 5, 3, 1][Math.floor(year / 100) % 4];
  const yy = year % 100;
  const yearCode = (yy + Math.floor(yy / 4) + century) % 7;
  const monthCode =
    monthCodes[month - 1] - (isLeapYear(year) && month <= 2 ? 1 : 0);
  const dayCode = day % 7;
  return {
    day: dayCode,
    month: monthCode,
    year: yearCode,
    century,
    weekday: (dayCode + monthCode + yearCode) % 7,
  };
}
