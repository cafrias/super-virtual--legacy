/* eslint-disable import/prefer-default-export */
import { State } from '../state';
import { LayoutState } from '.';

export function layoutGetState(state: State): LayoutState {
  return state.layout;
}
