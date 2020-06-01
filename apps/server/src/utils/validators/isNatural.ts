import validator from 'validator';

/**
 * Checks that the given value is Natural number
 * @param number The value to be checked
 */
export default function isNatural(
  number: string | number,
  allowZero = false
): boolean {
  const value = `${number}`;

  const isInt = validator.isInt(value);
  if (!isInt) {
    return false;
  }

  const parsed: number = parseInt(value, 10);
  if (allowZero ? parsed < 0 : parsed <= 0) {
    return false;
  }

  return true;
}
