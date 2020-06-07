import isNatural from './isNatural';

describe('isNatural', () => {
  it('when value is natural, returns true', () => {
    const result = isNatural('10');
    expect(result).toBe(true);
  });

  it('when value is decimal, returns false', () => {
    const result = isNatural('5.55');
    expect(result).toBe(false);
  });

  it('when value is negative, returns false', () => {
    const result = isNatural('-5');
    expect(result).toBe(false);
  });

  it('when value is 0, returns false', () => {
    const result = isNatural('0');
    expect(result).toBe(false);
  });

  it('when value is NaN, returns false', () => {
    const result = isNatural('Domo Arigato, Mr. Roboto');
    expect(result).toBe(false);
  });
});
