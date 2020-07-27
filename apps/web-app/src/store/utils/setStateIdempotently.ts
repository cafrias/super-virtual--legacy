export default function setStateIdempotently<S>(
  state: S,
  property: keyof S,
  newValue: any,
): S {
  const currentValue = state[property];
  if (currentValue === newValue) {
    return state;
  }

  return {
    ...state,
    [property]: newValue,
  };
}
