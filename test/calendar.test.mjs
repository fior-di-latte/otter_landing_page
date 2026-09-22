import test from "node:test";
import assert from "node:assert/strict";
import { calendarCodes, isLeapYear } from "../site/assets/calendar.js";
test("every date in the six-level range agrees with UTC Gregorian weekdays", () => {
  let checked = 0;
  for (
    let date = new Date("1700-01-01T12:00:00Z");
    date.getUTCFullYear() < 2100;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    assert.equal(
      calendarCodes(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
      ).weekday,
      date.getUTCDay(),
      date.toISOString(),
    );
    checked++;
  }
  assert.equal(checked, 146097);
});
test("guide examples and leap-century boundaries", () => {
  assert.deepEqual(calendarCodes(2026, 9, 22), {
    day: 1,
    month: 4,
    year: 4,
    century: 0,
    weekday: 2,
  });
  assert.equal(calendarCodes(1776, 7, 4).weekday, 4);
  assert.equal(calendarCodes(2024, 2, 29).weekday, 4);
  assert.equal(isLeapYear(1900), false);
  assert.equal(isLeapYear(2000), true);
  assert.equal(isLeapYear(2100), false);
  assert.throws(() => calendarCodes(1900, 2, 29), RangeError);
  assert.throws(() => calendarCodes(2026, 4, 31), RangeError);
  assert.throws(() => calendarCodes(NaN, 1, 1), RangeError);
});
