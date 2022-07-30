const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

const intervals = [
  { ge: YEAR, divisor: YEAR, unit: 'y' },
  { ge: MONTH, divisor: MONTH, unit: 'mo' },
  { ge: WEEK, divisor: WEEK, unit: 'w' },
  { ge: DAY, divisor: DAY, unit: 'd' },
  { ge: HOUR, divisor: HOUR, unit: 'h' },
  { ge: MINUTE, divisor: MINUTE, unit: 'mi' },
  { ge: 30 * SECOND, divisor: SECOND, unit: 's' },
  { ge: 0, divisor: 1, text: 'just now' },
];

const rtf = new Intl.RelativeTimeFormat('en', {
  localeMatcher: 'best fit', // other values: "lookup"
  numeric: 'always',
  style: 'narrow',
});

function getDateString(date) {
  const nowDate = new Date();

  const diff = nowDate.getTime() - date.getTime();
  const diffAbs = Math.abs(diff);

  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor);
      return `${x} ${interval.unit}`;
    }
  }
}

export default getDateString;
