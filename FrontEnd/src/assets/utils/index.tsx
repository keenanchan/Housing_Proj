import {
  intervalOptions,
  MonthAbrv,
  monthsUnabrvToAbrv,
  yearMonths,
  Month,
  RoomType,
} from '../constants';

/**
 * Use to define validation checks for an object T.
 */
export type ObjectValidationChecks<T> = {
  [key in keyof T]: (value: T[key]) => boolean;
};

/**
 * Use as a type for "one of the variables from P".
 */
export type OneFrom<P> = { [K in keyof P]: Pick<P, K> };

/**
 * Function used to validate move in select form
 * @param earlyMonth - the early month selected
 * @param earlyInterval - the early interval selected
 * @param lateMonth - the late month selected
 * @param lateInterval - the late interval selected
 */
const moveInSelect = (
  earlyMonth: string,
  earlyInterval: string,
  lateMonth: string,
  lateInterval: string,
): boolean => {
  if (yearMonths.indexOf(earlyMonth) > yearMonths.indexOf(lateMonth)) {
    // neither has anytime as the option
    if (![earlyMonth, lateMonth].includes(Month.Anytime)) {
      return false;
    }
  }
  if (
    yearMonths.indexOf(earlyMonth) === yearMonths.indexOf(lateMonth) &&
    ![earlyMonth, lateMonth].includes(Month.Anytime)
  ) {
    // neither has anytime as the option
    if (
      ![earlyInterval, lateInterval].includes(Month.Anytime) &&
      intervalOptions.indexOf(earlyInterval) >
        intervalOptions.indexOf(lateInterval)
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Use to abbreviate a month
 * @param month - the month to abbreviate (must be in the enum 'months')
 */
const abbreviateMonth = (month: Month): MonthAbrv => monthsUnabrvToAbrv[month];

/**
 * Use to format roomType string, as returned from BE
 * @param roomType - roomType to format
 */
const formatRoomType = (roomType: string): RoomType =>
  RoomType[roomType as keyof typeof RoomType];

/**
 * Use to abbreviate address to only everything before the first comma
 */
const abbreviateAddress = (address: string): string => address.split(',')[0];

/**
 * Use to remove parentheses and everything inside the parentheses
 */
const removeParentheses = (str: string): string =>
  str.replace(/ *\([^)]*\) */g, '');

/**
 * Use to abbreviate moveIn string
 */
const abbreviateMoveIn = (
  earlyInt: string,
  earlyMonth: Month,
  lateInt: string,
  lateMonth: Month,
): string => {
  // 1st pass: anytime from
  if (earlyInt === 'Anytime') {
    earlyInt = 'Early';
  }
  // 2nd pass: anytime to
  if (lateInt === 'Anytime') {
    lateInt = 'Late';
  }
  if (earlyMonth === lateMonth) {
    // 3rd pass: duplicates, or early - late
    if (earlyInt === lateInt) {
      return `${earlyInt} ${abbreviateMonth(earlyMonth)}`;
    }
    if (earlyInt === 'Early' && lateInt === 'Late') {
      return `${abbreviateMonth(earlyMonth)}`;
    }
  }
  return `${earlyInt} ${abbreviateMonth(
    earlyMonth,
  )} - ${lateInt} ${abbreviateMonth(lateMonth)}`;
};

export {
  moveInSelect,
  abbreviateMonth,
  abbreviateAddress,
  removeParentheses,
  abbreviateMoveIn,
  formatRoomType,
};
